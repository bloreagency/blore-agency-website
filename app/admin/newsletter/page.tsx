'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Download, Users, TrendingUp, Calendar, Search } from 'lucide-react';

interface Subscriber {
    id: string;
    email: string;
    subscribedAt: string;
    status: 'active' | 'unsubscribed';
    source: string;
}

export default function NewsletterPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSubscribers();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = subscribers.filter(sub =>
                sub.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSubscribers(filtered);
        } else {
            setFilteredSubscribers(subscribers);
        }
    }, [searchQuery, subscribers]);

    const loadSubscribers = async () => {
        try {
            const response = await fetch('/api/newsletter/subscribers');
            const data = await response.json();
            setSubscribers(data);
            setFilteredSubscribers(data);
        } catch (error) {
            console.error('Error loading subscribers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleExport = () => {
        const csvContent = [
            ['Email', 'Subscribed At', 'Status', 'Source'].join(','),
            ...filteredSubscribers.map(sub => [
                sub.email,
                new Date(sub.subscribedAt).toLocaleDateString(),
                sub.status,
                sub.source
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const activeSubscribers = subscribers.filter(s => s.status === 'active').length;
    const thisMonthSubscribers = subscribers.filter(s => {
        const subDate = new Date(s.subscribedAt);
        const now = new Date();
        return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
    }).length;

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">📧 Newsletter Subscribers</h1>
                <p className="text-gray-400">إدارة مشتركي النشرة البريدية</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Subscribers */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">إجمالي المشتركين</p>
                            <p className="text-3xl font-bold text-white mt-2">{subscribers.length}</p>
                        </div>
                        <Users className="w-12 h-12 text-purple-500" />
                    </div>
                </div>

                {/* Active Subscribers */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-green-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">مشتركين نشطين</p>
                            <p className="text-3xl font-bold text-white mt-2">{activeSubscribers}</p>
                        </div>
                        <Mail className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                {/* This Month */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">هذا الشهر</p>
                            <p className="text-3xl font-bold text-white mt-2">{thisMonthSubscribers}</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-cyan-500" />
                    </div>
                </div>
            </div>

            {/* Search and Export */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type="text"
                            placeholder="ابحث عن بريد إلكتروني..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white pl-10"
                        />
                    </div>
                    <Button
                        onClick={handleExport}
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 w-full md:w-auto"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        تصدير CSV
                    </Button>
                </div>
            </div>

            {/* Subscribers List */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">📋 قائمة المشتركين</h2>

                {isLoading ? (
                    <p className="text-gray-400 text-center py-8">جاري التحميل...</p>
                ) : filteredSubscribers.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                        {searchQuery ? 'لا توجد نتائج للبحث' : 'لا توجد اشتراكات حالياً'}
                    </p>
                ) : (
                    <div className="space-y-3">
                        {filteredSubscribers.map((subscriber) => (
                            <div
                                key={subscriber.id}
                                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-purple-500/20 p-3 rounded-full">
                                            <Mail className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{subscriber.email}</p>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(subscriber.subscribedAt).toLocaleDateString('ar-EG', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span className="text-gray-500 text-xs">•</span>
                                                <span className="text-gray-400 text-sm">{subscriber.source}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full ${subscriber.status === 'active'
                                            ? 'bg-green-500/20 text-green-300'
                                            : 'bg-red-500/20 text-red-300'
                                            }`}
                                    >
                                        {subscriber.status === 'active' ? '✓ نشط' : '✗ ملغي'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination info */}
                {filteredSubscribers.length > 0 && (
                    <div className="mt-6 text-center text-gray-400 text-sm">
                        عرض {filteredSubscribers.length} من {subscribers.length} مشترك
                    </div>
                )}
            </div>
        </div>
    );
}
