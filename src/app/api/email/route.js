

import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";



export async function POST(request) {
  if (request.method === "POST") {
    const { userDetails, appointmentDate, paymentStatus, appointmentTime } = await request.json();
    console.log(userDetails, appointmentDate, paymentStatus, appointmentTime);
    if (!userDetails || !appointmentDate || !paymentStatus || !appointmentTime) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    try {
      await transporter.sendMail({
        ...mailOptions,
        html: `
          <div style="max-width: 32rem; margin: 0 auto; background-color: #fff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; border-radius: 0.5rem; overflow: hidden;">
            <div style="background-color: #333; color: #fff; padding: 1rem;">
              <h1 style="font-size: 1.5rem; font-weight: bold;">New Appointment Scheduled</h1>
            </div>
            <div style="padding: 1rem; border-bottom: 1px solid #ddd;">
              <h2 style="font-size: 1.25rem; font-weight: bold;">User Details:</h2>
              <p><span style="font-weight: bold;">Name:</span> ${userDetails.name}</p>
              <p><span style="font-weight: bold;">Email:</span> ${userDetails.email}</p>
            </div>
            <div style="padding: 1rem; border-bottom: 1px solid #ddd;">
              <p><span style="font-weight: bold;">Appointment Date:</span> ${appointmentDate}</p>
              <p><span style="font-weight: bold;">Appointment Time:</span> ${appointmentTime}</p>
              <p><span style="font-weight: bold;">Payment Status:</span> ${paymentStatus}</p>
            </div>
          </div>
        `,
        subject: "New Appointment Scheduled",
      });

      return NextResponse.json({ success: true });
    } catch (err) {
      console.log(err);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ message: "Bad request" }, { status: 400 });
};

