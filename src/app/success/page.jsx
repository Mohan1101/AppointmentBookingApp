'use client'
import { useEffect, useState } from 'react';
import SuccessClient from '@/components/successclient';

export default function Success() {
  const [sessionDetails, setSessionDetails] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const session_id = searchParams.get('session_id');
    const date = searchParams.get('date');
    const slotId = searchParams.get('slotId');

    const sessionDetails = {
      session_id: session_id,
      date: date,
      slotId: slotId
    };

    if (session_id) {
      setSessionDetails(sessionDetails);
    }
  }, []); 

  return (
    <div>
      {sessionDetails ? (
        <SuccessClient sessionDetails={sessionDetails} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
