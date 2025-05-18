import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { priceId } = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/chat?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            metadata: {
                userId,
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error:', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
} 