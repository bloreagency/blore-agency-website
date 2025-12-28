import { NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/newsletter-storage';

export async function GET() {
    try {
        const subscribers = await getSubscribers();
        return NextResponse.json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }
}
