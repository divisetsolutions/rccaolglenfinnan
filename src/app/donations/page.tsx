'use client';

import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function DonationsPage() {
  const handleStripeCheckout = async () => {
    const stripe = await stripePromise;

    // TODO: Create a checkout session on the server
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Amount in cents
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      alert(result.error.message);
    }
  };

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Make a Donation
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Your support is greatly appreciated.
        </p>
        <div className="flex gap-4">
          <button onClick={handleStripeCheckout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Donate with Stripe
          </button>
          <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: '10.00',
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order!.capture().then((details) => {
                  alert('Transaction completed by ' + details.payer.name?.given_name);
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </section>
  );
}
