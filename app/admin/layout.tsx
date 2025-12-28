'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Mail,
    BarChart3,
    Settings,
    LogOut,
    Newspaper,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        // Check if already authenticated
        const auth = sessionStorage.getItem('admin_auth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        // Password: 1211
        if (password === '1211') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_auth', 'true');
            setNotification({ type: 'success', message: 'تم تسجيل الدخول بنجاح!' });
        } else {
            setNotification({ type: 'error', message: 'كلمة المرور غير صحيحة!' });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_auth');
        setPassword('');
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">🔒 Admin Panel</h1>
                        <p className="text-gray-400">Blore Agency Management System</p>
                    </div>

                    <div className="space-y-4">
                        <Input
                            type="password"
                            placeholder="كلمة المرور"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                        <Button onClick={handleLogin} className="w-full bg-gradient-to-r from-purple-600 to-cyan-500">
                            تسجيل الدخول
                        </Button>
                    </div>

                    {notification && (
                        <div className={`mt-4 p-3 rounded-lg ${notification.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                            {notification.message}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Admin Dashboard
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 p-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Blore Admin</h1>
                    <p className="text-gray-400 text-sm">Management System</p>
                </div>

                <nav className="space-y-2">
                    <a
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </a>

                    <a
                        href="/admin/projects"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                    >
                        <FolderKanban className="w-5 h-5" />
                        <span>المشاريع</span>
                    </a>

                    <a
                        href="/admin/sales"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                    >
                        <Users className="w-5 h-5" />
                        <span>العملاء</span>
                    </a>

                    <a
                        href="/admin/outreach"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        <span>الحملات</span>
                    </a>

                    <a
                        href="/admin/newsletter"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                    >
                        <Newspaper className="w-5 h-5" />
                        <span>Newsletter</span>
                    </a>
                </nav>

                <div className="absolute bottom-6 left-6 right-6">
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        تسجيل الخروج
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                {children}
            </div>
        </div>
    );
}
