import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { writeFile, readFile, mkdir } from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Lead {
    id: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    message?: string;
    budget?: string;
    timeline?: string;
    source: 'chatbot' | 'contact-form' | 'manual';
    status: 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'won' | 'lost';
    createdAt: string;
    updatedAt: string;
}

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function ensureLeadsFile() {
    try {
        await mkdir(path.dirname(LEADS_FILE), { recursive: true });
        try {
            await readFile(LEADS_FILE, 'utf8');
        } catch {
            await writeFile(LEADS_FILE, JSON.stringify([], null, 2));
        }
    } catch (error) {
        console.error('Error ensuring leads file:', error);
    }
}

async function getLeads(): Promise<Lead[]> {
    await ensureLeadsFile();
    const data = await readFile(LEADS_FILE, 'utf8');
    return JSON.parse(data);
}

async function saveLeads(leads: Lead[]) {
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// GET - Retrieve all leads
export async function GET() {
    try {
        const leads = await getLeads();
        return NextResponse.json(leads);
    } catch (error) {
        console.error('Error getting leads:', error);
        return NextResponse.json({ error: 'Failed to get leads' }, { status: 500 });
    }
}

// POST - Create new lead
export async function POST(request: NextRequest) {
    try {
        const leadData = await request.json();
        const leads = await getLeads();

        const newLead: Lead = {
            id: Date.now().toString(),
            ...leadData,
            status: leadData.status || 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        leads.push(newLead);
        await saveLeads(leads);

        // Send email notification
        try {
            await resend.emails.send({
                from: 'Blore Agency <onboarding@resend.dev>',
                to: process.env.ADMIN_EMAIL || 'info@bloreagency.com',
                subject: `🎯 New Lead: ${newLead.name}`,
                html: `
          <h2>New Lead Received!</h2>
          <p><strong>Name:</strong> ${newLead.name}</p>
          <p><strong>Email:</strong> ${newLead.email}</p>
          ${newLead.phone ? `<p><strong>Phone:</strong> ${newLead.phone}</p>` : ''}
          ${newLead.company ? `<p><strong>Company:</strong> ${newLead.company}</p>` : ''}
          ${newLead.service ? `<p><strong>Service:</strong> ${newLead.service}</p>` : ''}
          ${newLead.budget ? `<p><strong>Budget:</strong> ${newLead.budget}</p>` : ''}
          ${newLead.timeline ? `<p><strong>Timeline:</strong> ${newLead.timeline}</p>` : ''}
          ${newLead.message ? `<p><strong>Message:</strong> ${newLead.message}</p>` : ''}
          <p><strong>Source:</strong> ${newLead.source}</p>
          <p><strong>Time:</strong> ${new Date(newLead.createdAt).toLocaleString()}</p>
        `,
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
    }
}

// PUT - Update lead
export async function PUT(request: NextRequest) {
    try {
        const updatedLead = await request.json();
        const leads = await getLeads();

        const index = leads.findIndex((l) => l.id === updatedLead.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        leads[index] = {
            ...leads[index],
            ...updatedLead,
            updatedAt: new Date().toISOString(),
        };

        await saveLeads(leads);

        return NextResponse.json({ success: true, lead: leads[index] });
    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
    }
}

// DELETE - Delete lead
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Lead ID required' }, { status: 400 });
        }

        const leads = await getLeads();
        const filteredLeads = leads.filter((l) => l.id !== id);

        if (filteredLeads.length === leads.length) {
            return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
        }

        await saveLeads(filteredLeads);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting lead:', error);
        return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
    }
}
