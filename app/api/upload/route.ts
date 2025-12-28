import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'projects';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                error: `نوع الملف غير مدعوم. الأنواع المدعومة: ${allowedTypes.join(', ')}`
            }, { status: 400 });
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json({
                error: 'حجم الملف كبير جداً. الحد الأقصى: 10MB'
            }, { status: 400 });
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
        const filename = `${timestamp}-${originalName}`;

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), 'public', 'images', folder);
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            console.error('Error creating directory:', error);
            // Directory might already exist, continue
        }

        // Save file
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Return public URL
        const publicUrl = `/images/${folder}/${filename}`;

        return NextResponse.json({
            success: true,
            url: publicUrl,
            filename
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
        return NextResponse.json({
            error: errorMessage,
            details: process.env.NODE_ENV === 'development' ? String(error) : undefined
        }, { status: 500 });
    }
}
