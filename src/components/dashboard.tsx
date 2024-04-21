'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server'

interface Appointment {
  date: Date;
  slotTime: string;
  paymentStatus: string;
}

export default function Dashboard({
    isAuthenticated,
    user
}: {
    isAuthenticated: boolean
    user: KindeUser
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
        // Fetch appointments for the user by passing the email as a body parameter
        const response = await axios.post('/api/appointments', {
            email: user?.email
        });

        
        
      setAppointments(response.data.appointments);
      setLoading(false);
      console.log(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  //format the date to dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <section className='py-24'>
      <div className='container'>
        <div className='rounded-lg bg-white text-black p-2 md:p-8'>
          <h1 className='text-3xl font-bold mb-8'>Your Appointments</h1>
          {loading ? (
            <div className="text-center">
              <div className="animate-spin h-10 w-10 mx-auto border-t-2 border-b-2 border-purple-500 rounded-full"></div>
              <p className="text-gray-600 mt-4">Loading...</p>
            </div>
          ) : (
            <table className="w-full border-collapse border-2 border-white">
              <thead>
                <tr className='bg-dark-900 text-white text-center'>
                  <th className="border-2 border-white p-2">S.No</th>
                  <th className="border-2 border-white p-2">Date</th>
                  <th className="border-2 border-white p-2">Slot Time</th>
                  <th className="border-2 border-white p-2">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="border border-white p-2 text-center">No slots available</td>
                  </tr>
                ) : (
                  appointments.map((appointment, index) => (
                    <tr className='bg-white text-center' key={index}>
                      <td className="border-2 border-dark-900 p-2">{index + 1}</td>
                      <td className="border-2 border-dark-900 p-2">{formatDate(appointment.date)}</td>
                      <td className="border-2 border-dark-900 p-2">{appointment.slotTime}</td>
                      <td className="border-2 border-dark-900 p-2">{appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
