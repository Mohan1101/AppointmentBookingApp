import connectMongoDB from "@/libbackend/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  
  try {
    // Find all slots
    const slots = await Slot.find({});

    // Check if any slots were found
    if (!slots.length) {
      return NextResponse.json({ message: "No slots found" }, { status: 404 });
    }

    // Extract appointment details from each slot
    const appointments = slots.flatMap(slot => {
      return slot.slots.map(s => ({
        date: slot.date,
        slotTime: s.time,
        booked: s.booked,
        userDetails: s.userDetails,
        paymentStatus: s.paymentStatus
      }));
    });

    // Filter appointments where booked is true
    const bookedAppointments = appointments.filter(appointment => appointment.booked);

    return NextResponse.json({ appointments: bookedAppointments }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}


  
export async function POST(request) {
    const  {email} = await request.json();
    await connectMongoDB();
    
    try {
      // Find all slots where user email matches
      const slots = await Slot.find({ 'slots.userDetails.email': email });
  
      // Check if any slots were found
      if (!slots.length) {
        return NextResponse.json({ message: "No slots found for this email" }, { status: 404 });
      }
  
      // Extract appointment details from each slot
      const appointments = slots.flatMap(slot => {
        return slot.slots
          .filter(s => s.userDetails.email === email)
          .map(s => ({
            date: slot.date,
            slotTime: s.time,
            paymentStatus: s.paymentStatus
          }));
      });
  
      return NextResponse.json({ appointments }, { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
  }
  
