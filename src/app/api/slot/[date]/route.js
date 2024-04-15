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
        // If no slot entry exists for the provided date, create a new one
        if (!slotEntry) {
            slotEntry = new Slot({ date, slots: [] });
        }
        // Return success response
        return NextResponse.json({ slot: slotEntry }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        // Return error response
        return NextResponse.json({ message: "An error occurred" }, { status: 500 });
    }
}
