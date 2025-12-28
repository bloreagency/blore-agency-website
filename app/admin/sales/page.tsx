'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Users,
    TrendingUp,
    DollarSign,
    Mail,
    Phone,
    Building,
    Calendar,
    Trash2,
    Edit,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
    BarChart3,
} from 'lucide-react';

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

export default function SalesDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadLeads();
    }, []);

    const loadLeads = async () => {
        try {
            const response = await fetch('/api/leads');
            const data = await response.json();
            setLeads(data);
        } catch (error) {
            console.error('Error loading leads:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateLeadStatus = async (id: string, status: Lead['status']) => {
        try {
            const lead = leads.find((l) => l.id === id);
            if (!lead) return;

            await fetch('/api/leads', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...lead, status }),
            });

            loadLeads();
        } catch (error) {
            console.error('Error updating lead:', error);
        }
    };

    const deleteLead = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا العميل المحتمل؟')) return;

        try {
            await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
            loadLeads();
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    const filteredLeads = leads.filter((lead) => {
        const matchesFilter = filter === 'all' || lead.status === filter;
        const matchesSearch =
            lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: leads.length,
        new: leads.filter((l) => l.status === 'new').length,
        qualified: leads.filter((l) => l.status === 'qualified').length,
        won: leads.filter((l) => l.status === 'won').length,
    };

    const getStatusColor = (status: Lead['status']) => {
        const colors = {
            new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
            contacted: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
            qualified: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
            'proposal-sent': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
            won: 'bg-green-500/20 text-green-300 border-green-500/30',
            lost: 'bg-red-500/20 text-red-300 border-red-500/30',
        };
        return colors[status];
    };

    const getStatusLabel = (status: Lead['status']) => {
        const labels = {
            new: 'جديد',
            contacted: 'تم التواصل',
            qualified: 'مؤهل',
            'proposal-sent': 'تم إرسال عرض',
            won: 'تم الإقفال',
            lost: 'خسارة',
        };
        return labels[status];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">📊 Sales Dashboard</h1>
                    <p className="text-gray-400">إدارة العملاء المحتملين والمبيعات</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">إجمالي العملاء</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
                            </div>
                            <Users className="w-12 h-12 text-purple-500" />
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">عملاء جدد</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.new}</p>
                            </div>
                            <Clock className="w-12 h-12 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">عملاء مؤهلين</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.qualified}</p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-yellow-500" />
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">صفقات مقفلة</p>
                                <p className="text-3xl font-bold text-white mt-2">{stats.won}</p>
                            </div>
                            <CheckCircle className="w-12 h-12 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Input
                            placeholder="🔍 بحث بالاسم، الإيميل، أو الشركة..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white flex-1"
                        />
                        <div className="flex gap-2 flex-wrap">
                            {['all', 'new', 'contacted', 'qualified', 'proposal-sent', 'won', 'lost'].map((status) => (
                                <Button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    variant={filter === status ? 'default' : 'outline'}
                                    className={filter === status ? 'bg-purple-600' : 'bg-gray-800 border-gray-700'}
                                >
                                    {status === 'all' ? 'الكل' : getStatusLabel(status as Lead['status'])}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Leads List */}
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        العملاء المحتملين ({filteredLeads.length})
                    </h2>

                    {isLoading ? (
                        <p className="text-gray-400 text-center py-8">جاري التحميل...</p>
                    ) : filteredLeads.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">لا توجد نتائج</p>
                    ) : (
                        <div className="space-y-4">
                            {filteredLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-2">{lead.name}</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <Mail className="w-4 h-4" />
                                                            <a href={`mailto:${lead.email}`} className="hover:text-purple-400">
                                                                {lead.email}
                                                            </a>
                                                        </div>
                                                        {lead.phone && (
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <Phone className="w-4 h-4" />
                                                                <a href={`tel:${lead.phone}`} className="hover:text-purple-400">
                                                                    {lead.phone}
                                                                </a>
                                                            </div>
                                                        )}
                                                        {lead.company && (
                                                            <div className="flex items-center gap-2 text-gray-400">
                                                                <Building className="w-4 h-4" />
                                                                {lead.company}
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <Calendar className="w-4 h-4" />
                                                            {new Date(lead.createdAt).toLocaleDateString('ar-EG')}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(lead.status)}`}>
                                                    {getStatusLabel(lead.status)}
                                                </span>
                                            </div>

                                            {lead.service && (
                                                <p className="text-sm text-gray-400 mb-2">
                                                    <strong>الخدمة:</strong> {lead.service}
                                                </p>
                                            )}
                                            {lead.budget && (
                                                <p className="text-sm text-gray-400 mb-2">
                                                    <strong>الميزانية:</strong> {lead.budget}
                                                </p>
                                            )}
                                            {lead.timeline && (
                                                <p className="text-sm text-gray-400 mb-2">
                                                    <strong>الموعد:</strong> {lead.timeline}
                                                </p>
                                            )}
                                            {lead.message && (
                                                <p className="text-sm text-gray-300 mt-3 p-3 bg-gray-900/50 rounded-lg">
                                                    {lead.message}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                                                className="bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 text-sm"
                                            >
                                                <option value="new">جديد</option>
                                                <option value="contacted">تم التواصل</option>
                                                <option value="qualified">مؤهل</option>
                                                <option value="proposal-sent">تم إرسال عرض</option>
                                                <option value="won">تم الإقفال</option>
                                                <option value="lost">خسارة</option>
                                            </select>
                                            <Button
                                                onClick={() => deleteLead(lead.id)}
                                                variant="destructive"
                                                size="sm"
                                                className="bg-red-600 hover:bg-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
