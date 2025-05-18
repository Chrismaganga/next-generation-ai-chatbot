import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        // Handle successful subscription
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        // Here you would typically:
        // 1. Update your database to mark the user as subscribed
        // 2. Update their usage limits
        // 3. Send a welcome email
        // 4. etc.
    }

    if (event.type === 'customer.subscription.deleted') {
        // Handle subscription cancellation
        const subscription = event.data.object as Stripe.Subscription;
        
        // Here you would typically:
        // 1. Update your database to mark the user as unsubscribed
        // 2. Update their usage limits
        // 3. Send a cancellation email
        // 4. etc.
    }

    return new NextResponse(null, { status: 200 });
} 