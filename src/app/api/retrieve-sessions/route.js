import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { session_id } = await request.json();
  console.log(session_id);

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error retrieving session:', error);
    return NextResponse.json({ error: 'Session retrieval failed' }, { status: 500 });
  }
}
