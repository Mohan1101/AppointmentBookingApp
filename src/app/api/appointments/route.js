import connectMongoDB from "@/libbackend/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();

  try {
    const slots = await Slot.find({});
    if (!slots.length) {
      return NextResponse.json({ message: "No slots found" }, { status: 404 });
    }

    const appointments = slots.flatMap(slot => {
      return slot.slots.map(s => ({
        date: slot.date,
        slotTime: s.time,
        booked: s.booked,
        userDetails: s.userDetails,
        paymentStatus: s.paymentStatus,
        completed: s.completed,
        _id: s._id, // Assuming each slot has a unique ID
      }));
    });

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


  export async function PATCH(request) {
    const { id, completed } = await request.json();
    await connectMongoDB();
  
    try {
      const slot = await Slot.findOne({ 'slots._id': id });
  
      if (!slot) {
        return NextResponse.json({ message: "Slot not found" }, { status: 404 });
      }
  
      const slotToUpdate = slot.slots.id(id);
      slotToUpdate.completed = completed;
  
      await slot.save();
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error("Error:", error);
      return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
  }
  

  
  export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log(id);

    if (!id) {
        return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    await connectMongoDB();

    try {
        const slot = await Slot.findOne({ 'slots._id': id });

        if (!slot) {
            return NextResponse.json({ message: "Slot not found" }, { status: 404 });
        }

        const slotIndex = slot.slots.findIndex(s => s._id.toString() === id);
        if (slotIndex === -1) {
            return NextResponse.json({ message: "Slot with the provided ID not found" }, { status: 404 });
        }

        slot.slots.splice(slotIndex, 1);
        await slot.save();

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}

  
  
  
