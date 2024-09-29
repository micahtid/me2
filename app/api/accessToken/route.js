export async function POST(request) {
  try {
    const url = 'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=Hl1BR9EFRUCVzVJk3FkJIw';
    const credentials = Buffer.from('m1RJcDBLSbqlIjmOR6Nxw:gVcA9ew1NFAvrIkOk0P6VgLjUpVXMhCj').toString('base64');

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error(`Zoom API error: ${response.statusText}`);
    }

    const result = await response.json();
    const accessToken = result.access_token;

    return new Response(JSON.stringify({ access_token: accessToken }), { status: 200 });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return new Response(JSON.stringify({ message: 'Unable to fetch access token' }), { status: 500 });
  }
}
