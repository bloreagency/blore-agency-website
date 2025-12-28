import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'projects.json');
        const fileContents = await readFile(filePath, 'utf8');
        const projects = JSON.parse(fileContents);

        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const newProject = await request.json();

        // Read existing projects
        const filePath = path.join(process.cwd(), 'data', 'projects.json');
        const fileContents = await readFile(filePath, 'utf8');
        const projects = JSON.parse(fileContents);

        // Generate new ID
        const maxId = projects.reduce((max: number, p: any) => {
            const id = parseInt(p.id);
            return id > max ? id : max;
        }, 0);

        newProject.id = String(maxId + 1);

        // Add new project
        projects.push(newProject);

        // Save back to file
        await writeFile(filePath, JSON.stringify(projects, null, 4), 'utf8');

        return NextResponse.json({ success: true, project: newProject });
    } catch (error) {
        console.error('Error saving project:', error);
        return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const updatedProject = await request.json();

        // Read existing projects
        const filePath = path.join(process.cwd(), 'data', 'projects.json');
        const fileContents = await readFile(filePath, 'utf8');
        const projects = JSON.parse(fileContents);

        // Find and update project
        const index = projects.findIndex((p: any) => p.id === updatedProject.id);
        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        projects[index] = updatedProject;

        // Save back to file
        await writeFile(filePath, JSON.stringify(projects, null, 4), 'utf8');

        return NextResponse.json({ success: true, project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID required' }, { status: 400 });
        }

        // Read existing projects
        const filePath = path.join(process.cwd(), 'data', 'projects.json');
        const fileContents = await readFile(filePath, 'utf8');
        const projects = JSON.parse(fileContents);

        // Filter out the project
        const filteredProjects = projects.filter((p: any) => p.id !== id);

        if (filteredProjects.length === projects.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        // Save back to file
        await writeFile(filePath, JSON.stringify(filteredProjects, null, 4), 'utf8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
