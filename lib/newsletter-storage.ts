import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export interface NewsletterSubscriber {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'active' | 'unsubscribed';
    source: string;
}

const filePath = path.join(process.cwd(), 'data', 'newsletter-subscribers.json');

export async function getSubscribers(): Promise<NewsletterSubscriber[]> {
    try {
        const fileContents = await readFile(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        // If file doesn't exist, return empty array
        return [];
    }
}

export async function addSubscriber(email: string, source: string = 'website'): Promise<{ success: boolean; message: string; subscriber?: NewsletterSubscriber }> {
    try {
        const subscribers = await getSubscribers();

        // Check if email already exists
        const existingSubscriber = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());
        if (existingSubscriber) {
            if (existingSubscriber.status === 'active') {
                return { success: false, message: 'Email already subscribed' };
            } else {
                // Reactivate unsubscribed email
                existingSubscriber.status = 'active';
                existingSubscriber.subscribedAt = new Date().toISOString();
                await writeFile(filePath, JSON.stringify(subscribers, null, 4), 'utf8');
                return { success: true, message: 'Subscription reactivated', subscriber: existingSubscriber };
            }
        }

        // Add new subscriber
        const newSubscriber: NewsletterSubscriber = {
            id: Date.now().toString(),
            email: email.toLowerCase(),
            subscribedAt: new Date().toISOString(),
            status: 'active',
            source,
        };

        subscribers.push(newSubscriber);
        await writeFile(filePath, JSON.stringify(subscribers, null, 4), 'utf8');

        return { success: true, message: 'Successfully subscribed', subscriber: newSubscriber };
    } catch (error) {
        console.error('Error adding subscriber:', error);
        return { success: false, message: 'Failed to add subscriber' };
    }
}

export async function unsubscribeEmail(email: string): Promise<{ success: boolean; message: string }> {
    try {
        const subscribers = await getSubscribers();
        const subscriber = subscribers.find(s => s.email.toLowerCase() === email.toLowerCase());

        if (!subscriber) {
            return { success: false, message: 'Email not found' };
        }

        subscriber.status = 'unsubscribed';
        await writeFile(filePath, JSON.stringify(subscribers, null, 4), 'utf8');

        return { success: true, message: 'Successfully unsubscribed' };
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return { success: false, message: 'Failed to unsubscribe' };
    }
}

export function exportToCSV(subscribers: NewsletterSubscriber[]): string {
    const headers = ['Email', 'Subscribed At', 'Status', 'Source'];
    const rows = subscribers.map(s => [
        s.email,
        new Date(s.subscribedAt).toLocaleDateString(),
        s.status,
        s.source
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    return csvContent;
}
