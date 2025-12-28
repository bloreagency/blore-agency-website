'use client';

import { useState, useEffect } from 'react';
import {
    Users,
    FolderKanban,
    Mail,
    TrendingUp,
    DollarSign,
    Clock,
    CheckCircle,
    Send,
    BarChart3,
    Newspaper,
} from 'lucide-react';
import Link from 'next/link';

interface Stats {
    totalProjects: number;
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    wonDeals: number;
    emailsSent: number;
    newsletterSubscribers: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        totalLeads: 0,
        newLeads: 0,
        qualifiedLeads: 0,
        wonDeals: 0,
        emailsSent: 0,
        newsletterSubscribers: 0,
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            // Load projects
            const projectsRes = await fetch('/api/projects');
            const projects = await projectsRes.json();

            // Load leads
            const leadsRes = await fetch('/api/leads');
            const leads = await leadsRes.json();

            // Load newsletter subscribers
            const newsletterRes = await fetch('/api/newsletter/subscribers');
            const subscribers = await newsletterRes.json();

            setStats({
                totalProjects: projects.length,
                totalLeads: leads.length,
                newLeads: leads.filter((l: any) => l.status === 'new').length,
                qualifiedLeads: leads.filter((l: any) => l.status === 'qualified').length,
                wonDeals: leads.filter((l: any) => l.status === 'won').length,
                emailsSent: 0, // Will be tracked later
                newsletterSubscribers: subscribers.filter((s: any) => s.status === 'active').length,
            });

            // Get recent 5 leads
            setRecentLeads(leads.slice(0, 5));
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">📊 Dashboard</h1>
                <p className="text-gray-400">نظرة عامة على كل شيء</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Total Projects */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">إجمالي المشاريع</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.totalProjects}</p>
                        </div>
                        <FolderKanban className="w-12 h-12 text-purple-500" />
                    </div>
                    <Link href="/admin/projects">
                        <span className="text-purple-400 text-sm hover:underline">إدارة المشاريع →</span>
                    </Link>
                </div>

                {/* Total Leads */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-cyan-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">إجمالي العملاء</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.totalLeads}</p>
                        </div>
                        <Users className="w-12 h-12 text-cyan-500" />
                    </div>
                    <Link href="/admin/sales">
                        <span className="text-cyan-400 text-sm hover:underline">إدارة العملاء →</span>
                    </Link>
                </div>

                {/* New Leads */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">عملاء جدد</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.newLeads}</p>
                        </div>
                        <Clock className="w-12 h-12 text-blue-500" />
                    </div>
                    <Link href="/admin/sales">
                        <span className="text-blue-400 text-sm hover:underline">عرض الجدد →</span>
                    </Link>
                </div>

                {/* Qualified Leads */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-yellow-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">عملاء مؤهلين</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.qualifiedLeads}</p>
                        </div>
                        <TrendingUp className="w-12 h-12 text-yellow-500" />
                    </div>
                    <Link href="/admin/sales">
                        <span className="text-yellow-400 text-sm hover:underline">عرض المؤهلين →</span>
                    </Link>
                </div>

                {/* Won Deals */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-green-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">صفقات مقفلة</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.wonDeals}</p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <Link href="/admin/sales">
                        <span className="text-green-400 text-sm hover:underline">عرض المقفلة →</span>
                    </Link>
                </div>

                {/* Email Campaigns */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-orange-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">حملات البريد</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.emailsSent}</p>
                        </div>
                        <Mail className="w-12 h-12 text-orange-500" />
                    </div>
                    <Link href="/admin/outreach">
                        <span className="text-orange-400 text-sm hover:underline">إدارة الحملات →</span>
                    </Link>
                </div>

                {/* Newsletter Subscribers */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-pink-500 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-400 text-sm">مشتركي Newsletter</p>
                            <p className="text-3xl font-bold text-white mt-2">{stats.newsletterSubscribers}</p>
                        </div>
                        <Newspaper className="w-12 h-12 text-pink-500" />
                    </div>
                    <Link href="/admin/newsletter">
                        <span className="text-pink-400 text-sm hover:underline">إدارة المشتركين →</span>
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Recent Leads */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">🆕 أحدث العملاء</h2>

                    {recentLeads.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">لا توجد عملاء حالياً</p>
                    ) : (
                        <div className="space-y-3">
                            {recentLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-white font-semibold">{lead.name}</p>
                                            <p className="text-gray-400 text-sm">{lead.email}</p>
                                            {lead.company && (
                                                <p className="text-gray-500 text-xs mt-1">{lead.company}</p>
                                            )}
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Link href="/admin/sales">
                        <button className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                            عرض الكل →
                        </button>
                    </Link>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">⚡ إجراءات سريعة</h2>

                    <div className="space-y-3">
                        <Link href="/admin/projects">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                                <FolderKanban className="w-5 h-5 text-purple-400" />
                                <span>إضافة مشروع جديد</span>
                            </button>
                        </Link>

                        <Link href="/admin/sales">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                                <Users className="w-5 h-5 text-cyan-400" />
                                <span>عرض العملاء المحتملين</span>
                            </button>
                        </Link>

                        <Link href="/admin/outreach">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                                <Send className="w-5 h-5 text-orange-400" />
                                <span>إطلاق حملة بريد إلكتروني</span>
                            </button>
                        </Link>

                        <a href="/" target="_blank">
                            <button className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors">
                                <BarChart3 className="w-5 h-5 text-green-400" />
                                <span>عرض الموقع</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-6">
                <h3 className="text-white font-bold mb-2">💡 مرحباً بك في لوحة التحكم!</h3>
                <p className="text-gray-300 text-sm">
                    هنا يمكنك إدارة كل شيء: المشاريع، العملاء، والحملات التسويقية. استخدم القائمة الجانبية للتنقل بين الأقسام.
                </p>
            </div>
        </div>
    );
}
