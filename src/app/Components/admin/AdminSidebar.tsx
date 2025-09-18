'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiBox, FiHome, FiLogOut, FiMenu, FiX, FiList, FiGrid, FiMessageSquare } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-hot-toast';


const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { icon: FiHome, label: 'Dashboard', href: '/admin' },
        { icon: FiList, label: 'Navbar Category', href: '/admin/navbar' },
        { icon: FiGrid, label: 'Categories', href: '/admin/category' },
        { icon: FiBox, label: 'Products', href: '/admin/products' },
        { icon: FiMessageSquare, label: 'Contact', href: '/admin/contact' },
    ];

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message || 'Logged out successfully');
                router.push('/auth/login');
            } else {
                toast.error(data.message || 'Logout failed');
                console.error('Logout failed');
            }
        } catch (error) {
            toast.error('An error occurred during logout');
            console.error('Logout error:', error);
        }
    };

    return (
        <div className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} min-h-screen fixed left-0 top-0`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!isCollapsed && <h1 className="text-xl font-bold text-red-500">Hikvision Admin</h1>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-gray-700"

                >
                    {isCollapsed ? <FiMenu size={20} /> : <FiX size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${pathname === item.href
                                    ? 'bg-red-600 text-white'
                                    : 'hover:bg-gray-700'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <FiLogOut className="w-5 h-5" />
                    {!isCollapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar; 