'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface NavbarCategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    seoKeywords?: string; // Added seoKeywords field
}

const NavbarPage = () => {
    const [categories, setCategories] = useState<NavbarCategory[]>([]);
    const [, setLoading] = useState(true);
    const [newCategory, setNewCategory] = useState({ name: '', description: '', seoKeywords: '' });
    const [editingCategory, setEditingCategory] = useState<NavbarCategory | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/navbar-categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting category:', newCategory);
        try {
            const response = await fetch('/api/navbar-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newCategory.name,
                    description: newCategory.description,
                    seoKeywords: newCategory.seoKeywords,
                    isActive: true
                }),
            });

            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                toast.success('Category added successfully');
                setNewCategory({ name: '', description: '', seoKeywords: '' });
                fetchCategories();
            } else {
                toast.error(data.error || 'Failed to add category');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Error adding category');
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingCategory) return;

        try {
            const response = await fetch(`/api/navbar-categories/${editingCategory._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editingCategory.name,
                    description: editingCategory.description,
                    seoKeywords: editingCategory.seoKeywords,
                    isActive: editingCategory.isActive,
                    order: editingCategory.order
                }),
            });

            if (response.ok) {
                toast.success('Category updated successfully');
                setEditingCategory(null);
                fetchCategories();
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to update category');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Error updating category');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`/api/navbar-categories/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Category deleted successfully');
                    fetchCategories();
                } else {
                    toast.error('Failed to delete category');
                }
            } catch (error) {
                toast.error('Error deleting category');
            }
        }
    };

    const handleStartEditing = (category: NavbarCategory) => {
        setEditingCategory({
            _id: category._id,
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            isActive: category.isActive,
            order: category.order,
            createdAt: category.createdAt
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section - Left Aligned */}
                <div className="mb-8 text-left">
                    <h1 className="text-2xl font-bold text-gray-900">Navbar Categories Management</h1>
                    <p className="mt-2 text-sm text-gray-600">Manage your websites navigation categories</p>
                </div>

                {/* Action Button - Left Aligned */}
                <div className="mb-6">
                    {/* Add Form Section */}
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <div className="flex flex-col gap-4">
                            <input
                                type="text"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                placeholder="Enter category name"
                                className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                            <textarea
                                value={newCategory.description}
                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                placeholder="Enter category description"
                                className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={3}
                            />
                            <textarea
                                value={newCategory.seoKeywords}
                                onChange={(e) => setNewCategory({ ...newCategory, seoKeywords: e.target.value })}
                                placeholder="Enter SEO keywords (comma-separated)"
                                className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={2}
                            />
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SEO Keywords
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-left">
                                        {editingCategory?._id === category._id ? (
                                            <input
                                                type="text"
                                                value={editingCategory.name || ''}
                                                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            />
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                                        {editingCategory?._id === category._id ? (
                                            <input
                                                type="text"
                                                value={editingCategory.slug || ''}
                                                onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                                                className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            />
                                        ) : (
                                            category.slug
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-left">
                                        {editingCategory?._id === category._id ? (
                                            <textarea
                                                value={editingCategory.description || ''}
                                                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                                className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                rows={3}
                                            />
                                        ) : (
                                            category.description
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-left">
                                        {editingCategory?._id === category._id ? (
                                            <textarea
                                                value={editingCategory.seoKeywords || ''}
                                                onChange={(e) => setEditingCategory({ ...editingCategory, seoKeywords: e.target.value })}
                                                className="rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                rows={2}
                                                placeholder="Enter SEO keywords (comma-separated)"
                                            />
                                        ) : (
                                            category.seoKeywords
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-3 text-left">
                                        {editingCategory?._id === category._id ? (
                                            <>
                                                <button
                                                    className="text-green-600 hover:text-green-900"
                                                    onClick={handleEdit}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="text-gray-600 hover:text-gray-900"
                                                    onClick={() => setEditingCategory(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    onClick={() => handleStartEditing(category)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDelete(category._id)}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NavbarPage;