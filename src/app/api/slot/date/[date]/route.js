// app/api/slot/[date]/route.js

import connectMongoDB from "@/lib/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

 // if date is present in solt collection then return the slot else return empty slot with no slots available message

 export async function GET(request, { params }) {
    const { date } = params;
    // Ensure that `date` is defined before proceeding
    if (!date) {
        return { message: "Date parameter is missing" };
    }
    await connectMongoDB();
    try {
        // Find if there's already a slot entry for the provided date
        let slotEntry = await Slot.findOne({ date });
         // Filter out slots where booked is false
        if (slotEntry) {
            slotEntry.slots = slotEntry.slots.filter((slot) => !slot.booked);
        }
        // Return success response with the filtered slot entry
        return NextResponse.json({ slot: slotEntry || { date, slots: [], message: "No slots available" } });
    } catch (error) {
        console.error("Error:", error);
        // Return error response
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}


// hello message to test the api is up and running

// export async function GET(request, { params }) {
//     return { message: "Hello from the API" };
// }
