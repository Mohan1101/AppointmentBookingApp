import axios from 'axios';
import { useEffect, useState } from 'react';
import  Confetti  from 'react-confetti';

export default function SuccessClient({ sessionDetails }) {
  const [amountPaid, setAmountPaid] = useState(null);
  const session_id = sessionDetails.session_id;
  const date = sessionDetails.date;
  const slotId = sessionDetails.slotId;
 

  //format date to be displayed in the email as DD/MM/YYYY
  const formattedDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  }


  useEffect(() => {
    const fetchSessionDetails = async () => {
      console.log("Fetching session details for session_id:", session_id);
      try {
        if (session_id) {
          const response = await axios.post('/api/retrieve-sessions', { session_id });
          if (response.data) {
            const session = response.data.session;
            console.log('Session:', session);
            const amountPaid = session?.amount_total || 0;
            setAmountPaid(amountPaid / 100);
  
            if (session?.payment_status === 'paid') {
              console.log("Processing paid session...");
              const bookingResponse = await axios.post('/api/slot/book', {
                date: date,
                slotId: slotId,
                userDetails: {
                  name: session?.customer_details?.name,
                  email: session?.customer_details?.email,
                },
                paymentStatus: session?.payment_status,
              });
  
              console.log("Appointment Booked Successfully");
  
              if (bookingResponse.data && bookingResponse.status === 200) {
                const appointmentTime = bookingResponse.data.appointmentTime;
                console.log("Appointment Time:", appointmentTime);
  
                const emailResponse = await axios.post("/api/email", {
                  userDetails: {
                    name: session?.customer_details?.name,
                    email: session?.customer_details?.email,
                  },
                  appointmentDate: formattedDate(date),
                  appointmentTime: appointmentTime,
                  paymentStatus: session?.payment_status,
                });
  
                if (emailResponse.data.success) {
                  console.log("Email sent successfully");
                }
              } else {
                console.log('Error booking slot');
              }
            } else {
              console.log('Payment status not paid');
            }
          } else {
            console.log("No session data received");
          }
        } else {
          console.log("No session_id provided");
        }
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };
  
    fetchSessionDetails();
  }, [session_id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900">
      {amountPaid !== null && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={['#f44336', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800', '#795548']}
          numberOfPieces={300}
        />
      )}
      <div className="z-10 bg-white rounded-lg shadow-md p-8 max-w-lg w-full relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          {/* Poppers and falling ribbons animation */}
          <div className="absolute top-0 left-1/2 w-72 h-72 bg-gradient-to-b from-pink-500 to-purple-600 rounded-full mix-blend-overlay filter blur-xl scale-0 animate-confetti" />
        <div className="absolute top-0 left-1/2 w-72 h-72 bg-gradient-to-b from-yellow-500 to-red-500 rounded-full mix-blend-overlay filter blur-xl scale-0 animate-confetti" />
      </div>
      {amountPaid !== null ? (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Payment Successful!</h1>
          <p className="text-gray-600 mb-4 text-center">Amount Paid:</p>
          <p className="text-4xl font-semibold text-purple-600 text-center">&#8377;{amountPaid.toFixed(2)}</p>
          <p className="text-gray-600 mt-4 text-center">Thank you for booking an appointment with us.</p>
        </>
      ) : (
        <div className="text-center">
          <div className="animate-spin h-10 w-10 mx-auto border-t-2 border-b-2 border-purple-500 rounded-full"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      )}
      </div>
    </div>
  );
}
