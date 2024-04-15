import connectMongoDB from "@/lib/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

// POST /api/slot for creating a new slot
export async function POST(request) {
    const { date, slots } = await request.json(); // Modify to match the structure of your request body
    await connectMongoDB();
    
    try {
        // Find if there's already a slot entry for the provided date
        let slotEntry = await Slot.findOne({ date });

        // If no slot entry exists for the provided date, create a new one
        if (!slotEntry) {
            slotEntry = new Slot({ date, slots });
        } else {
            // If a slot entry already exists, update the slots array
            slotEntry.slots = slots;
        }

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




