'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch } from '@nextui-org/react';

import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/server'

interface Appointment {
    date: Date;
    slotTime: string;
    paymentStatus: string;
    userDetails: {
        name: string;
        email: string;
    };
    completed: boolean;
    _id: string;
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
            const response = await axios.get('/api/appointments');
            const sortedAppointments = response.data.appointments.sort((a: Appointment, b: Appointment) => {
                // Convert dates to timestamps and subtract to get the order
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setAppointments(sortedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const toggleCompletion = async (id: string, completed: boolean) => {
        try {
            await axios.patch(`/api/appointments`, { id, completed });
            fetchAppointments(); // Refresh the list
        } catch (error) {
            console.error('Error toggling completion:', error);
        }
    };

    const deleteAppointment = async (id: string) => {
        console.log(id);
        try {
            await axios.delete(`/api/appointments?id=${id}`);
            fetchAppointments(); // Refresh the list
        } catch (error) {
            console.error('Error deleting appointment:', error);
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
                                <th className="border-2 border-white p-2">Completed</th>
                                <th className="border-2 border-white p-2">Actions</th>
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
                                    <td className="border-2 border-dark-900 p-2">
                                        <Switch checked={appointment.completed} onChange={(e) => toggleCompletion(appointment._id, e.target.checked)} />
                                    </td>
                                    <td className="border-2 border-dark-900 p-2">
                                        <button onClick={() => deleteAppointment(appointment._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

    );
}


