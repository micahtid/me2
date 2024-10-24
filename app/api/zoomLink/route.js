export async function POST(request) {
    try {
      const body = await request.json();
      const zoomToken = request.headers.get('Authorization').replace('Bearer ', '');
  
      const url = 'https://api.zoom.us/v2/users/micahtid@gmail.com/meetings';
      const meetingDetails = {
        topic: "Meeting Topic",
        type: 2,
        start_time: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        duration: 60,
        timezone: "Asia/Jakarta",
        password: "123me2",
        agenda: "Meeting Agenda",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 2,
          audio: "both",
          auto_recording: "none",
          waiting_room: false,
          meeting_authentication: false
        }
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${zoomToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingDetails),
      });
  
      if (!response.ok) {
        throw new Error(`Zoom API error: ${response.statusText}`);
      }
  
      const result = await response.json();
      const startUrl = result.start_url;
      const joinUrl = result.join_url;
  
      return new Response(JSON.stringify({ start_url: startUrl, join_url: joinUrl }), { status: 200 });
    } catch (error) {
      console.error('Error handling POST request:', error);
      return new Response(JSON.stringify({ message: 'Failed to create Zoom meeting' }), { status: 500 });
    }
  }
  