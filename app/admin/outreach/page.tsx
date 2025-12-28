'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send, Users, TrendingUp, Loader2, Upload, Download } from 'lucide-react';
import { sampleLeads } from '@/lib/lead-scraper';

interface Lead {
    name: string;
    email: string;
    company: string;
    website?: string;
    industry?: string;
    location?: string;
}

export default function OutreachPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState('introduction');
    const [isSending, setIsSending] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [customLeads, setCustomLeads] = useState('');

    const loadSampleLeads = () => {
        setLeads(sampleLeads);
    };

    const parseCustomLeads = () => {
        try {
            const parsed = JSON.parse(customLeads);
            setLeads(parsed);
        } catch (error) {
            alert('خطأ في صيغة JSON! تأكد من الصيغة الصحيحة.');
        }
    };

    const sendCampaign = async () => {
        if (leads.length === 0) {
            alert('يرجى إضافة عملاء أولاً!');
            return;
        }

        if (!confirm(`هل أنت متأكد من إرسال ${leads.length} إيميل؟`)) {
            return;
        }

        setIsSending(true);
        setResults([]);

        try {
            const response = await fetch('/api/email-outreach', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    leads,
                    template: selectedTemplate,
                    delay: 5000, // 5 seconds between emails
                }),
            });

            const data = await response.json();
            setResults(data.results || []);
            alert(`تم إرسال ${data.results.filter((r: any) => r.success).length} إيميل بنجاح!`);
        } catch (error) {
            alert('حدث خطأ أثناء الإرسال!');
        } finally {
            setIsSending(false);
        }
    };

    const exportLeads = () => {
        const dataStr = JSON.stringify(leads, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'leads.json';
        link.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">📧 Email Outreach</h1>
                    <p className="text-gray-400">إرسال حملات بريد إلكتروني للعملاء المحتملين</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">إجمالي العملاء</p>
                                <p className="text-3xl font-bold text-white mt-2">{leads.length}</p>
                            </div>
                            <Users className="w-12 h-12 text-purple-500" />
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">تم الإرسال</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {results.filter((r) => r.success).length}
                                </p>
                            </div>
                            <Send className="w-12 h-12 text-green-500" />
                        </div>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">فشل</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {results.filter((r) => !r.success).length}
                                </p>
                            </div>
                            <Mail className="w-12 h-12 text-red-500" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Lead Management */}
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">📋 إدارة العملاء</h2>

                        <div className="space-y-4">
                            {/* Load Sample Leads */}
                            <Button
                                onClick={loadSampleLeads}
                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                تحميل عملاء تجريبيين
                            </Button>

                            {/* Custom Leads */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    أو أضف عملاء يدوياً (JSON):
                                </label>
                                <Textarea
                                    value={customLeads}
                                    onChange={(e) => setCustomLeads(e.target.value)}
                                    placeholder={`[
  {
    "name": "Ahmed",
    "email": "ahmed@example.com",
    "company": "Tech Co"
  }
]`}
                                    className="bg-gray-800 border-gray-700 text-white font-mono text-sm"
                                    rows={8}
                                />
                                <Button onClick={parseCustomLeads} className="mt-2 bg-cyan-600">
                                    <Upload className="w-4 h-4 mr-2" />
                                    تحميل
                                </Button>
                            </div>

                            {/* Export */}
                            {leads.length > 0 && (
                                <Button onClick={exportLeads} variant="outline" className="w-full">
                                    <Download className="w-4 h-4 mr-2" />
                                    تصدير العملاء (JSON)
                                </Button>
                            )}

                            {/* Leads List */}
                            {leads.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold text-white mb-3">
                                        العملاء ({leads.length})
                                    </h3>
                                    <div className="max-h-96 overflow-y-auto space-y-2">
                                        {leads.map((lead, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-800/50 border border-gray-700 rounded-lg p-3"
                                            >
                                                <p className="text-white font-semibold">{lead.name}</p>
                                                <p className="text-gray-400 text-sm">{lead.email}</p>
                                                <p className="text-gray-500 text-xs">{lead.company}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Campaign Settings */}
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">⚙️ إعدادات الحملة</h2>

                        <div className="space-y-6">
                            {/* Template Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    اختر القالب:
                                </label>
                                <select
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3"
                                >
                                    <option value="introduction">رسالة تعريفية (أول مرة)</option>
                                    <option value="followUp1">متابعة 1 (بعد 3 أيام)</option>
                                    <option value="followUp2">متابعة 2 (آخر رسالة)</option>
                                </select>
                            </div>

                            {/* Template Preview */}
                            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                                <h3 className="text-white font-semibold mb-2">معاينة القالب:</h3>
                                <div className="text-gray-400 text-sm space-y-2">
                                    {selectedTemplate === 'introduction' && (
                                        <>
                                            <p><strong>الموضوع:</strong> فرصة تعاون مع [الشركة]</p>
                                            <p><strong>المحتوى:</strong> رسالة تعريفية بخدماتنا + دعوة لاستشارة مجانية</p>
                                        </>
                                    )}
                                    {selectedTemplate === 'followUp1' && (
                                        <>
                                            <p><strong>الموضوع:</strong> Re: فرصة تعاون مع [الشركة]</p>
                                            <p><strong>المحتوى:</strong> مشاركة أعمال سابقة + سؤال عن الاهتمام</p>
                                        </>
                                    )}
                                    {selectedTemplate === 'followUp2' && (
                                        <>
                                            <p><strong>الموضوع:</strong> آخر رسالة - استشارة مجانية</p>
                                            <p><strong>المحتوى:</strong> عرض استشارة مجانية + وداع لطيف</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Send Button */}
                            <Button
                                onClick={sendCampaign}
                                disabled={isSending || leads.length === 0}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 py-6 text-lg"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        جاري الإرسال...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        إرسال الحملة ({leads.length} إيميل)
                                    </>
                                )}
                            </Button>

                            {/* Results */}
                            {results.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-bold text-white mb-3">النتائج:</h3>
                                    <div className="max-h-64 overflow-y-auto space-y-2">
                                        {results.map((result, index) => (
                                            <div
                                                key={index}
                                                className={`p-3 rounded-lg ${result.success
                                                        ? 'bg-green-500/20 border border-green-500/30'
                                                        : 'bg-red-500/20 border border-red-500/30'
                                                    }`}
                                            >
                                                <p className={result.success ? 'text-green-300' : 'text-red-300'}>
                                                    {result.email}: {result.success ? '✅ تم الإرسال' : '❌ فشل'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-blue-300 font-bold mb-3">💡 كيفية الاستخدام:</h3>
                    <ol className="text-blue-200 text-sm space-y-2 list-decimal list-inside">
                        <li>حمّل عملاء تجريبيين أو أضف عملاءك الخاصين</li>
                        <li>اختر القالب المناسب (تعريفية، متابعة 1، متابعة 2)</li>
                        <li>اضغط "إرسال الحملة"</li>
                        <li>انتظر 3-5 أيام ثم أرسل المتابعة التالية</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}
