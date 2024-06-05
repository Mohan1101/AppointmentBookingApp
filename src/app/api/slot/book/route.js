// import connectMongoDB from "@/libbackend/db";
// import Slot from "@/models/slot";
// import { NextResponse } from "next/server";


// export async function POST(request) {
//     const { date, slotId } = await request.json();
//     await connectMongoDB();
//     try {
//         // Find the slot entry for the provided date
//         let slotEntry = await Slot.findOne({ date });

   
//         // Find the slot with the provided slotId
//         let slot = slotEntry.slots.find((slot) => slot._id == slotId);

//         // Set the booked status to true
//         slot.booked = true;
//         // Save the updated slot entry
//         await slotEntry.save();
//         // Return success response
//         return NextResponse.json({ slot: slotEntry }, { status: 200 });
//     }
//     catch (error) {
//         console.error("Error:", error);
//         // Return error response
//         return NextResponse.json({ message: "An error occurred" }, { status: 500 });
//     }


// }

import connectMongoDB from "@/libbackend/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { date, slotId, userDetails, paymentStatus } = await request.json();
  await connectMongoDB();
  try {
    // Find the slot entry for the provided date
    let slotEntry = await Slot.findOne({ date });

    // Find the slot with the provided slotId
    let slot = slotEntry.slots.find((slot) => slot._id == slotId);

    // Set the booked status to true
    slot.booked = true;

    // Add userDetails and paymentStatus to the slot
    slot.userDetails = userDetails;
    slot.paymentStatus = paymentStatus;

    const appointmentTime = slot.time;
    console.log('appointmentTime', appointmentTime);
    // Save the updated slot entry
    await slotEntry.save();

    // Return success response with appointmentTime
    return NextResponse.json({ slot: slotEntry, appointmentTime: appointmentTime }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    // Return error response
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}



