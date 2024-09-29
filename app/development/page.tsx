"use client"; 

import React, { useState } from 'react';

const ZoomMeetingPage = () => {
  const [startUrl, setStartUrl] = useState('');
  const [joinUrl, setJoinUrl] = useState('');
  const [error, setError] = useState('');

  const createZoomMeeting = async () => {
    try {
      // Fetch access token first
      const tokenResponse = await fetch('/api/accessToken', {
        method: 'POST',
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token');
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Use the access token to create the Zoom meeting
      const zoomResponse = await fetch('/api/zoomLink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}), // The body can be empty because meeting details are handled on the server side
      });

      if (!zoomResponse.ok) {
        throw new Error('Failed to create Zoom meeting');
      }

      const zoomData = await zoomResponse.json();
      setStartUrl(zoomData.start_url);
      setJoinUrl(zoomData.join_url);
    } catch (err) {
      console.error(err);
      setError('Error creating Zoom meeting');
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Create Zoom Meeting</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={createZoomMeeting}
      >
        Create Meeting
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {startUrl && (
        <div className="mt-4">
          <strong>Start URL:</strong> <a href={startUrl}>{startUrl}</a>
        </div>
      )}

      {joinUrl && (
        <div className="mt-4">
          <strong>Join URL:</strong> <a href={joinUrl}>{joinUrl}</a>
        </div>
      )}
    </div>
  );
};

export default ZoomMeetingPage;
