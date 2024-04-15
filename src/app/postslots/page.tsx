'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function PostSlots() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // 
    const [selectedSlot, setSelectedSlot] = useState<string>(''); // State for selected slot
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);



    // Function to handle slot selection
    const handleSlotChange = () => {
        if (selectedSlot && !availableSlots.includes(selectedSlot)) {
            setAvailableSlots([...availableSlots, selectedSlot]);
            setSelectedSlot('');
        }
    };

    // Function to remove slot from available slots
    const removeSlot = (slotToRemove: string) => {
        const updatedSlots = availableSlots.filter(slot => slot !== slotToRemove);
        setAvailableSlots(updatedSlots);
    };

    // Function to handle posting data to the backend

    const postData = async () => {
        try {
            const dateToCheck = selectedDate.toDate(); // Convert selectedDate to a Date object
            if (dateToCheck instanceof Date && !isNaN(dateToCheck.getTime())) {
                const selectedDateUTC = new Date(dateToCheck.getTime() - dateToCheck.getTimezoneOffset() * 60000);
                const data = {
                    date: selectedDateUTC.toISOString().split('T')[0],
                    slots: availableSlots.map(slot => ({ time: slot, booked: false }))
                };
                await axios.post('/api/slot', data);
                // Reset selected date and available slots after successful posting
                setSelectedDate(null);
                setAvailableSlots([]);
                alert('Slots posted successfully!');
            } else {
                alert('Please select a valid date before posting slots.');
            }
        } catch (error) {
            console.error('Error posting slots:', error);
            alert('Error posting slots. Please try again.');
        }
    };
    


    return (
        <div className="mt-28 mx-auto max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Enter Date and Available Slots</h1>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Date:</label>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Basic date picker" 
                         value={selectedDate}
                         onChange={date => setSelectedDate(date)}/>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
          
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">Select Available Slot:</label>
                <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="">Select Slot</option>
                    <option value="9am to 10am">9am to 10am</option>
                    <option value="10am to 11am">10am to 11am</option>
                    <option value="11am to 12pm">11am to 12pm</option>
                    <option value="12pm to 1pm">12pm to 1pm</option>
                    <option value="1pm to 2pm">1pm to 2pm</option>
                    <option value="2pm to 3pm">2pm to 3pm</option>
                    <option value="3pm to 4pm">3pm to 4pm</option>
                    <option value="4pm to 5pm">4pm to 5pm</option>
                    <option value="5pm to 6pm">5pm to 6pm</option>
                </select>
                <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSlotChange}>Add Slot</button>
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Available Slots:</label>
                <div className="flex flex-wrap gap-2">
                    {availableSlots.map((slot, index) => (
                        <div key={index} className="flex items-center bg-gray-200 px-2 py-1 rounded-md">
                            <span>{slot}</span>
                            <button className="ml-2 text-red-600" onClick={() => removeSlot(slot)}>x</button>
                        </div>
                    ))}
                </div>
            </div>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md" onClick={postData}>Post Slots</button>
        </div>
    );
}
