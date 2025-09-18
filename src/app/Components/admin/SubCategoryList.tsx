'use client'
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
}

interface SubCategoryListProps {
    subcategories: SubCategory[];
    loading: boolean;
    onEdit: (subcategory: SubCategory) => void;
    onDelete: (id: string) => void;
}

export default function SubCategoryList({
    subcategories,
    loading,
    onEdit,
    onDelete
}: SubCategoryListProps) {
    const [categories, setCategories] = useState<{ [key: string]: string }>({});
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                const categoryMap = data.reduce((acc: { [key: string]: string }, category: Category) => {
                    acc[category._id] = category.name;
                    return acc;
                }, {});
                setCategories(categoryMap);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const filteredSubcategories = subcategories.filter(subcategory => {
        const searchLower = searchTerm.toLowerCase();
        return (
            subcategory.name.toLowerCase().includes(searchLower) ||
            subcategory.slug.toLowerCase().includes(searchLower) ||
            categories[subcategory.category]?.toLowerCase().includes(searchLower)
        );
    });

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="max-w-md">
                <input
                    type="text"
                    placeholder="Search subcategories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSubcategories.map((subcategory) => (
                            <tr key={subcategory._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{subcategory.name}</div>
                                    <div className="text-sm text-gray-500">{subcategory.slug}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {categories[subcategory.category] || 'Loading...'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subcategory.isActive
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {subcategory.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(subcategory)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                                    >
                                        <FiEdit className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(subcategory._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <FiTrash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}