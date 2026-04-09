export interface Env {
  DB: D1Database;
  NOTIFY_EMAIL: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const formData = await request.formData();
      const url = formData.get('url') as string;
      const email = formData.get('email') as string;
      const name = formData.get('name') as string || '';
      const message = formData.get('message') as string || '';

      if (!url || !email) {
        return new Response(JSON.stringify({ error: 'URL and email are required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Save to D1
      await env.DB.prepare(
        'INSERT INTO submissions (url, email, name, message, created_at) VALUES (?, ?, ?, ?, ?)'
      ).bind(url, email, name, message, new Date().toISOString()).run();

      // Notify via Telegram
      if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
        const text = `🔔 *New GEO Audit Request*\n\n` +
          `*URL:* ${url}\n` +
          `*Email:* ${email}\n` +
          `*Name:* ${name || 'N/A'}\n` +
          `*Message:* ${message || 'N/A'}\n` +
          `*Time:* ${new Date().toISOString()}`;

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text,
            parse_mode: 'Markdown',
          }),
        }).catch(() => {}); // Don't fail submission if notification fails
      }

      // Redirect to thank you
      const referer = request.headers.get('Referer') || 'https://recomby.ai/geo-audit';
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': `${referer}?submitted=true`,
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Submission failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};
