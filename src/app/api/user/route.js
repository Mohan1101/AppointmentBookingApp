import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { allowedusers } = await request.json();
  await connectMongoDB();

  try {
    // Check if the provided email is in the allowedusers array of any user in the database
    const userWithAllowedEmail = await User.findOne({ allowedusers: allowedusers });

    if (userWithAllowedEmail) {
      return NextResponse.json({ allowed: true }); // Return 'allowed: true' if the email is allowed
    } else {
      return NextResponse.json({ allowed: false }); // Return 'allowed: false' if the email is not allowed
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}


export async function GET() {
  await connectMongoDB();
  const users = await User.find();
  return NextResponse.json({ users }, { status: 200 });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}