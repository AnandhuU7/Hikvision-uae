import { useState, useEffect } from 'react';
import { FiBox, FiGrid, FiList, FiMessageSquare } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatsData {
    products: number;
    categories: number;
    subcategories: number;
    navbarCategories: number;
    subscriptions: {
        total: number;
        active: number;
        inactive: number;
    };
    contacts: {
        total: number;
        unread: number;
        pending: number;
        resolved: number;
    };
}

const initialStats: StatsData = {
    products: 0,
    categories: 0,
    subcategories: 0,
    navbarCategories: 0,
    subscriptions: {
        total: 0,
        active: 0,
        inactive: 0
    },
    contacts: {
        total: 0,
        unread: 0,
        pending: 0,
        resolved: 0
    }
};

const DashboardStats = () => {
    const [stats, setStats] = useState<StatsData>(initialStats);
    const [loading, setLoading] = useState(true);
    const [mainStatsFilter, setMainStatsFilter] = useState('all');
    const [contactStatsFilter, setContactStatsFilter] = useState('all');

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/admin/dashboard-stats');
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            title: 'Total Products',
            value: stats.products,
            icon: FiBox,
            color: 'bg-blue-500'
        },
        {
            title: 'Categories',
            value: stats.categories,
            icon: FiGrid,
            color: 'bg-green-500'
        },
        {
            title: 'Subcategories',
            value: stats.subcategories,
            icon: FiBox,
            color: 'bg-purple-500'
        },
        {
            title: 'Navbar Categories',
            value: stats.navbarCategories,
            icon: FiList,
            color: 'bg-yellow-500'
        }
    ];

    const getFilteredMainStatsChartData = () => {
        const data = [
            { name: 'Products', value: stats.products, color: '#3B82F6' },
            { name: 'Categories', value: stats.categories, color: '#10B981' },
            { name: 'Subcategories', value: stats.subcategories, color: '#8B5CF6' },
            { name: 'Navbar Categories', value: stats.navbarCategories, color: '#F59E0B' },
        ];

        if (mainStatsFilter === 'all') return data;
        return data.filter(item => item.name.toLowerCase() === mainStatsFilter);
    };

    const getFilteredContactChartData = () => {
        const data = [
            { name: 'Total', value: stats.contacts.total, color: '#6B7280' },
            { name: 'Unread', value: stats.contacts.unread, color: '#EF4444' },
            { name: 'Pending', value: stats.contacts.pending, color: '#F59E0B' },
            { name: 'Resolved', value: stats.contacts.resolved, color: '#10B981' },
        ];

        if (contactStatsFilter === 'all') return data;
        return data.filter(item => item.name.toLowerCase() === contactStatsFilter);
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold">{stat.value}</span>
                        </div>
                        <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                    </div>
                ))}
            </div>

            {/* Main Stats Graph */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Overall Statistics</h3>
                    <select 
                        value={mainStatsFilter}
                        onChange={(e) => setMainStatsFilter(e.target.value)}
                        className="border rounded-md px-3 py-1"
                    >
                        <option value="all">All</option>
                        <option value="products">Products</option>
                        <option value="categories">Categories</option>
                        <option value="subcategories">Subcategories</option>
                        <option value="navbar categories">Navbar Categories</option>
                    </select>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getFilteredMainStatsChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8">
                                {getFilteredMainStatsChartData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Contact Messages Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FiMessageSquare className="mr-2" />
                    Contact Messages Overview
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold mb-1">{stats.contacts.total}</div>
                        <div className="text-gray-600">Total Messages</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                            {stats.contacts.unread}
                        </div>
                        <div className="text-gray-600">Unread</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600 mb-1">
                            {stats.contacts.pending}
                        </div>
                        <div className="text-gray-600">Pending</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                            {stats.contacts.resolved}
                        </div>
                        <div className="text-gray-600">Resolved</div>
                    </div>
                </div>

                {/* Contact Messages Graph */}
                <div className="mt-6 h-[300px]">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-semibold">Messages Statistics</h4>
                        <select 
                            value={contactStatsFilter}
                            onChange={(e) => setContactStatsFilter(e.target.value)}
                            className="border rounded-md px-3 py-1"
                        >
                            <option value="all">All</option>
                            <option value="total">Total</option>
                            <option value="unread">Unread</option>
                            <option value="pending">Pending</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={getFilteredContactChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8">
                                {getFilteredContactChartData().map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Subscription Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                    <FiBox className="mr-2" />
                    Newsletter Subscriptions Overview
                </h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold mb-1">{stats.subscriptions.total}</div>
                        <div className="text-gray-600">Total Subscriptions</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-1">
                            {stats.subscriptions.active}
                        </div>
                        <div className="text-gray-600">Active</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600 mb-1">
                            {stats.subscriptions.inactive}
                        </div>
                        <div className="text-gray-600">Inactive</div>
                    </div>
                </div>

                {/* Subscription Graph */}
                <div className="mt-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                            { name: 'Total', value: stats.subscriptions.total, color: '#4B5563' },
                            { name: 'Active', value: stats.subscriptions.active, color: '#059669' },
                            { name: 'Inactive', value: stats.subscriptions.inactive, color: '#DC2626' }
                        ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value">
                                {[
                                    { name: 'Total', color: '#4B5563' },
                                    { name: 'Active', color: '#059669' },
                                    { name: 'Inactive', color: '#DC2626' }
                                ].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;