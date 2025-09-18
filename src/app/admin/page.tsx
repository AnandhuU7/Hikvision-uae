'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from '@/app/Components/admin/DashboardStats';
import { toast } from 'react-hot-toast';

export default function AdminDashboard() {
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication status
        const checkAuth = async () => {
            try {
                const response = await fetch('/api/admin/check-auth');
                if (!response.ok) {
                    router.push('/auth/login');
                    return;
                }
                // Only set last login if authenticated
                setLastUpdated(new Date());
            } catch (error) {
                router.push('/auth/login');
            }
        };

        checkAuth();
    }, [router]);

    // Set up real-time updates every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </p>
                        </div>
                        <button
                            onClick={() => setLastUpdated(new Date())}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                                transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                                />
                            </svg>
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Dashboard */}
                <DashboardStats key={lastUpdated.getTime()} />
            </div>
        </div>
    );
} 