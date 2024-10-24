"use client"; 

import React, { useState } from 'react';

const createZoomLink = async () => {
  try {
    const tokenResponse = await fetch('/api/accessToken', {
      method: 'POST',
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const zoomResponse = await fetch('/api/zoomLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({}), 
    });

    if (!zoomResponse.ok) {
      throw new Error('Failed to create Zoom meeting');
    }

    return await zoomResponse.json();
  } catch (err) {
    console.error(err);
    throw new Error('Error creating Zoom meeting');
  }
};

const ZoomMeetingPage = () => {
  const [startUrl, setStartUrl] = useState('');
  const [joinUrl, setJoinUrl] = useState('');

  const handleCreateMeeting = async () => {
    try {
      const zoomData = await createZoomLink();
      setStartUrl(zoomData.start_url);
      setJoinUrl(zoomData.join_url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Create Zoom Meeting</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleCreateMeeting}
      >
        Create Meeting
      </button>

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
