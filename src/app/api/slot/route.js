import connectMongoDB from "@/libbackend/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { date, slots } = await request.json();
  await connectMongoDB();
  
  try {
    let slotEntry = await Slot.findOne({ date });

    if (!slotEntry) {
      // If no slot entry exists for the provided date, create a new one
      slotEntry = new Slot({ date, slots });
    } else {
      // If a slot entry already exists, update the slots array
      slotEntry.slots = slots;
    }

    // Add userDetails and paymentStatus to each slot
    slotEntry.slots.forEach(slot => {
      slot.userDetails = { name: '', email: '' };
      slot.paymentStatus = '';
    });

    // Save the slot entry to the database
    await slotEntry.save();
    
    // Return success response
    return NextResponse.json({ slot: slotEntry }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    // Return error response
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
