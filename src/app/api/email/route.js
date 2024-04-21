// import { mailOptions, transporter } from "../../config/nodemailer";

// const CONTACT_MESSAGE_FIELDS = {
//   name: "Name",
//   email: "Email",
//   subject: "Subject",
//   message: "Message",
// };

// const generateEmailContent = (data) => {
//   const stringData = Object.entries(data).reduce(
//     (str, [key, val]) =>
//       (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
//     ""
//   );
//   const htmlData = Object.entries(data).reduce((str, [key, val]) => {
//     return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
//   }, "");

//   return {
//     text: stringData,
//     html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
//   };
// };

// const handler = async (req, res) => {
//   if (req.method === "POST") {
//     const data = req.body;
//     if (!data || !data.name || !data.email || !data.subject || !data.message) {
//       return res.status(400).send({ message: "Bad request" });
//     }

//     try {
//       await transporter.sendMail({
//         ...mailOptions,
//         ...generateEmailContent(data),
//         subject: data.subject,
//       });

//       return res.status(200).json({ success: true });
//     } catch (err) {
//       console.log(err);
//       return res.status(400).json({ message: err.message });
//     }
//   }
//   return res.status(400).json({ message: "Bad request" });
// };
// export default handler;

import { mailOptions, transporter } from "@/config/nodemailer";
import { NextResponse } from "next/server";

// const generateEmailContent = (userDetails, appointmentDate, paymentStatus) => {
//   const htmlData = `
//   <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
//     <div class="px-4 py-2 bg-gray-800 text-white">
//       <h1 class="text-3xl font-bold">New Appointment Scheduled</h1>
//     </div>
//     <div class="bg-gray-100 px-4 py-2 border-b border-gray-300">
//       <h2 class="text-xl font-bold text-gray-700">User Details:</h2>
//       <p class="text-gray-600"><span class="font-bold">Name:</span> ${userDetails.name}</p>
//       <p class="text-gray-600"><span class="font-bold">Email:</span> ${userDetails.email}</p>
//     </div>
//     <div class="px-4 py-2 border-b border-gray-300">
//       <p class="text-gray-600"><span class="font-bold">Appointment Date:</span> ${appointmentDate}</p>
//       <p class="text-gray-600"><span class="font-bold">Payment Status:</span> ${paymentStatus}</p>
//     </div>
//   </div>
// `;


//   return {
//     html: htmlData,
//   };
// };

export async function POST(request) {
  if (request.method === "POST") {
    const { userDetails, appointmentDate, paymentStatus } = await request.json();
    if (!userDetails || !appointmentDate || !paymentStatus) {
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

