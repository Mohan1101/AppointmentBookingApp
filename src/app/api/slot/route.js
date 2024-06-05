// import connectMongoDB from "@/libbackend/db";
// import Slot from "@/models/slot";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { date, slots } = await request.json();
//   await connectMongoDB();
  
//   try {
//     let slotEntry = await Slot.findOne({ date });

//     if (!slotEntry) {
//       // If no slot entry exists for the provided date, create a new one
//       slotEntry = new Slot({ date, slots });
//     } else {
//       // If a slot entry already exists, update the slots array
//       slotEntry.slots = slots;
//     }

//     // Add userDetails and paymentStatus to each slot
//     slotEntry.slots.forEach(slot => {
//       slot.userDetails = { name: '', email: '' };
//       slot.paymentStatus = '';
//     });

//     // Save the slot entry to the database
//     await slotEntry.save();
    
//     // Return success response
//     return NextResponse.json({ slot: slotEntry }, { status: 201 });
//   } catch (error) {
//     console.error("Error:", error);
//     // Return error response
//     return NextResponse.json({ message: "An error occurred" }, { status: 500 });
//   }
// }
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
      slotEntry = new Slot({ date, slots: slots.map(slot => ({ ...slot, completed: false })) });
    } else {
      // If a slot entry already exists, update the slots array
      const updatedSlots = slots.map(slot => {
        const existingSlot = slotEntry.slots.find(s => s.time === slot.time);
        if (existingSlot) {
          // Merge existing slot with new slot data
          return {
            ...existingSlot.toObject(), // Convert Mongoose document to plain object
            ...slot,
            completed: slot.completed !== undefined ? slot.completed : existingSlot.completed
          };
        } else {
          // Add new slot with default 'completed' status
          return {
            ...slot,
            completed: slot.completed !== undefined ? slot.completed : false
          };
        }
      });

      slotEntry.slots = updatedSlots;
    }

    await slotEntry.save();
    return NextResponse.json({ slot: slotEntry }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
