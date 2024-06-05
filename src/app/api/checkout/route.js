import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export async function POST(request) {
  if (request.method === 'POST') {
    try {
      const { lineItems, customerInfo, date, slotId } = await request.json();

      console.log(slotId);

      // Create a Checkout session with the provided line items and customer info
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        currency: 'inr',
        line_items: lineItems.map(item => ({
          price: item.priceId, // Assuming you're using Price IDs
          quantity: item.quantity,
        })),
        mode: 'payment',
        // success_url: `https://appointment-booking-app.vercel.app/success?session_id={CHECKOUT_SESSION_ID}&date=${date}&slotId=${slotId}`,
        // cancel_url: `https://appointment-booking-app.vercel.app/cancel`,
        success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}&date=${date}&slotId=${slotId}`,
        cancel_url: `http://localhost:3000/cancel`,
        customer_email: customerInfo.email,
        metadata: {
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
        },
      });

      // Return the session ID as JSON response
      return NextResponse.json({ sessionId: session.id }, { status: 200 });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // Return error message and status 500 (Internal Server Error)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
  } else {
    // Return method not allowed for non-POST requests
    return NextResponse.json({ message: `Method ${req.method} Not Allowed` }, { status: 405 });
  }
}
