// pages/api/slot/[id]/route.js
import connectMongoDB from "@/lib/db";
import Slot from "@/models/slot";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { slotId } = params;
    const { booked } = request.body;

    await connectMongoDB();

    try {
        // Find the slot by its ID
        const slot = await Slot.findById(slotId);

        if (!slot) {
            // If slot not found, return 404 Not Found
            return NextResponse.error({ status: 404, message: "Slot not found" });
        }

        // Update the booked status of the slot
        slot.slots.forEach(slotItem => {
            if (slotItem.id.toString() === slotId) {
                slotItem.booked = booked;
            }
        });

        // Save the updated slot
        await slot.save();

        // Return success response
        return NextResponse.ok({ message: "Slot updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        // Return error response
        return NextResponse.error({ status: 500, message: "An error occurred" });
    }
}