export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key, anthropic-version'
        }
        });
    }
    const url = new URL(request.url);
    if (url.pathname === '/v1/messages' && request.method === 'POST') {
      const apiKey = request.headers.get('x-api-key');
      const body = await request.text();
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
          },
        body: body
        });
      const data = await response.text();
      return new Response(data, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
        });
    }
    return new Response('Lattice Agent Proxy', { status: 200 });
  }
  };
