'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Plus, X, Save, Loader2, Trash2, List } from 'lucide-react';

interface ProjectForm {
    slug: string;
    title: string;
    category: string;
    shortDescription: string;
    description: string;
    client: string;
    year: string;
    location: string;
    services: string[];
    image: string;
    images: string[];
    tags: string[];
    featured: boolean;
    results?: Record<string, string>;
}

interface Project extends ProjectForm {
    id: string;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [showProjectsList, setShowProjectsList] = useState(false);

    const [formData, setFormData] = useState<ProjectForm>({
        slug: '',
        title: '',
        category: '',
        shortDescription: '',
        description: '',
        client: '',
        year: new Date().getFullYear().toString(),
        location: '',
        services: [],
        image: '',
        images: [],
        tags: [],
        featured: false,
    });

    const [newService, setNewService] = useState('');
    const [newTag, setNewTag] = useState('');

    // Load projects
    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const handleImageUpload = async (file: File, isMainImage: boolean = false) => {
        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', 'projects');

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Upload failed:', errorData);
                setNotification({ type: 'error', message: `فشل رفع الصورة: ${errorData.error || 'خطأ غير معروف'}` });
                return;
            }

            const data = await response.json();

            if (data.success && data.url) {
                if (isMainImage) {
                    setFormData(prev => ({ ...prev, image: data.url }));
                } else {
                    setFormData(prev => ({ ...prev, images: [...prev.images, data.url] }));
                }
                setNotification({ type: 'success', message: '✅ تم رفع الصورة بنجاح!' });
            } else {
                console.error('Invalid response:', data);
                setNotification({ type: 'error', message: 'فشل رفع الصورة: استجابة غير صالحة' });
            }
        } catch (error) {
            console.error('Upload error:', error);
            setNotification({ type: 'error', message: `حدث خطأ أثناء رفع الصورة: ${error instanceof Error ? error.message : 'خطأ غير معروف'}` });
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setNotification({ type: 'success', message: '✅ تم حفظ المشروع بنجاح!' });
                // Reset form
                setFormData({
                    slug: '',
                    title: '',
                    category: '',
                    shortDescription: '',
                    description: '',
                    client: '',
                    year: new Date().getFullYear().toString(),
                    location: '',
                    services: [],
                    image: '',
                    images: [],
                    tags: [],
                    featured: false,
                });
                // Reload projects
                loadProjects();
            } else {
                setNotification({ type: 'error', message: '❌ فشل حفظ المشروع!' });
            }
        } catch (error) {
            setNotification({ type: 'error', message: '❌ حدث خطأ أثناء الحفظ!' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`هل أنت متأكد من حذف المشروع "${title}"؟`)) {
            return;
        }

        try {
            const response = await fetch(`/api/projects?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setNotification({ type: 'success', message: '✅ تم حذف المشروع بنجاح!' });
                loadProjects();
            } else {
                setNotification({ type: 'error', message: '❌ فشل حذف المشروع!' });
            }
        } catch (error) {
            setNotification({ type: 'error', message: '❌ حدث خطأ أثناء الحذف!' });
        }
    };

    // Projects Management Page
    return (
        <div className="p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">🎨 إدارة المشاريع</h1>
                            <p className="text-gray-400">أضف أو احذف المشاريع بسهولة!</p>
                        </div>
                        <Button
                            onClick={() => setShowProjectsList(!showProjectsList)}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600"
                        >
                            <List className="w-5 h-5 mr-2" />
                            {showProjectsList ? 'إخفاء القائمة' : `عرض المشاريع (${projects.length})`}
                        </Button>
                    </div>
                </div>

                {/* Notification */}
                {notification && (
                    <div className={`mb-6 p-4 rounded-xl ${notification.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-300' : 'bg-red-500/20 border border-red-500/30 text-red-300'}`}>
                        {notification.message}
                    </div>
                )}

                {/* Projects List */}
                {showProjectsList && (
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 mb-6">
                        <h2 className="text-2xl font-bold text-white mb-4">📋 المشاريع الحالية ({projects.length})</h2>
                        <div className="space-y-3">
                            {projects.map((project) => (
                                <div key={project.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex items-center justify-between hover:border-purple-500 transition-colors">
                                    <div className="flex items-center gap-4">
                                        {project.image && (
                                            <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded-lg" />
                                        )}
                                        <div>
                                            <h3 className="text-white font-semibold">{project.title}</h3>
                                            <p className="text-gray-400 text-sm">{project.category} • {project.client} • {project.year}</p>
                                            {project.featured && (
                                                <span className="inline-block mt-1 bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">⭐ مميز</span>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={() => handleDelete(project.id, project.title)}
                                        variant="destructive"
                                        size="sm"
                                        className="bg-red-600 hover:bg-red-700"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        حذف
                                    </Button>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <p className="text-gray-400 text-center py-8">لا توجد مشاريع حالياً</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-white">➕ إضافة مشروع جديد</h2>

                    {/* Basic Info */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">📝 عنوان المشروع *</label>
                            <Input
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="مثال: Livora Scents - Luxury Rebranding"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">🔗 Slug (URL) *</label>
                            <Input
                                required
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="مثال: livora-scents-rebranding"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">📂 التصنيف *</label>
                            <Input
                                required
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="مثال: Branding & Identity"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">👤 العميل *</label>
                            <Input
                                required
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="مثال: Livora Scents"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">📅 السنة *</label>
                            <Input
                                required
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="2024"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">📍 الموقع *</label>
                            <Input
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="مثال: Egypt"
                            />
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">📄 وصف قصير *</label>
                        <Textarea
                            required
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="وصف قصير في سطر واحد"
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">📋 وصف تفصيلي *</label>
                        <Textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="وصف تفصيلي للمشروع..."
                            rows={4}
                        />
                    </div>

                    {/* Services */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">🏷️ الخدمات</label>
                        <div className="flex gap-2 mb-2">
                            <Input
                                value={newService}
                                onChange={(e) => setNewService(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="أضف خدمة..."
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (newService.trim()) {
                                            setFormData({ ...formData, services: [...formData.services, newService.trim()] });
                                            setNewService('');
                                        }
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    if (newService.trim()) {
                                        setFormData({ ...formData, services: [...formData.services, newService.trim()] });
                                        setNewService('');
                                    }
                                }}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.services.map((service, index) => (
                                <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {service}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, services: formData.services.filter((_, i) => i !== index) })}
                                        className="hover:text-red-400"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">#️⃣ Tags</label>
                        <div className="flex gap-2 mb-2">
                            <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white"
                                placeholder="أضف tag..."
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        if (newTag.trim()) {
                                            setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
                                            setNewTag('');
                                        }
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    if (newTag.trim()) {
                                        setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] });
                                        setNewTag('');
                                    }
                                }}
                                className="bg-cyan-600 hover:bg-cyan-700"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span key={index} className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) })}
                                        className="hover:text-red-400"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">🖼️ الصورة الرئيسية *</label>
                        <div className="flex gap-4 items-center">
                            <label className="cursor-pointer">
                                <div className="bg-gray-800 border-2 border-dashed border-gray-700 hover:border-purple-500 rounded-xl p-4 text-center transition-colors">
                                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                    <span className="text-sm text-gray-400">رفع صورة رئيسية</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
                                    />
                                </div>
                            </label>
                            {formData.image && (
                                <img src={formData.image} alt="Main" className="w-24 h-24 object-cover rounded-lg" />
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">🖼️ صور إضافية</label>
                        <label className="cursor-pointer block">
                            <div className="bg-gray-800 border-2 border-dashed border-gray-700 hover:border-cyan-500 rounded-xl p-4 text-center transition-colors">
                                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <span className="text-sm text-gray-400">رفع صور إضافية</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            Array.from(e.target.files).forEach(file => handleImageUpload(file, false));
                                        }
                                    }}
                                />
                            </div>
                        </label>
                        {formData.images.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 mt-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img src={img} alt={`Image ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })}
                                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Featured */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                            className="w-4 h-4"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-300">⭐ مشروع مميز</label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading || uploadingImage}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-6 text-lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    جاري الحفظ...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-2" />
                                    💾 حفظ المشروع
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
