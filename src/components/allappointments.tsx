'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server'

interface Appointment {
    date: Date;
    slotTime: string;
    paymentStatus: string;
    userDetails: {
        name: string;
        email: string;
    }
}




export default function AllAppointments({
    isAuthenticated,
    user
}: {
    isAuthenticated: boolean
    user: KindeUser
}) {

    const [appointments, setAppointments] = useState<Appointment[]>([]);


    useEffect(() => {
        fetchAppointments();
    }, []);






    const fetchAppointments = async () => {
        try {
            // Fetch appointments for the user by passing the email as a body parameter
            const response = await axios.get('/api/appointments');



            setAppointments(response.data.appointments);
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
            <div className='rounded-lg md:p-8 text-black overflow-x-auto'>
                <h1 className='text-3xl font-bold mb-8'>Your Appointments</h1>
                <table className="w-full border-collapse border border-gray-800">
                    <thead>
                        <tr className='bg-dark-900 text-white text-center'>
                            <th className="border-2 border-white p-2">S.No</th>
                            <th className="border-2 border-white p-2">Name</th>
                            <th className="border-2 border-white p-2">Email</th>
                            <th className="border-2 border-white p-2">Date</th>
                            <th className="border-2 border-white p-2">Slot Time</th>
                            <th className="border-2 border-white p-2">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr className='text-center' key={index}>
                                <td className="border-2 border-dark-900 p-2">{index + 1}</td>
                                <td className="border-2 border-dark-900 p-2">{appointment.userDetails.name}</td>
                                <td className="border-2 border-dark-900 p-2">{appointment.userDetails.email}</td>
                                <td className="border-2 border-dark-900 p-2">{formatDate(appointment.date)}</td>
                                <td className="border-2 border-dark-900 p-2">{appointment.slotTime}</td>
                                <td className="border-2 border-dark-900 p-2">{appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    
    );
}


