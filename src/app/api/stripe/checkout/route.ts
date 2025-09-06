import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: '2024-06-20',
  }
);

export async function POST(req: NextRequest) {
  const { amount } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Donation',
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.get('origin')}/donations/success`,
    cancel_url: `${req.headers.get('origin')}/donations/cancel`,
  });

  return NextResponse.json({ id: session.id });
}
