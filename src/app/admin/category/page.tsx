'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../Components/admin/CategoryForm';
import CategoryList from '../../Components/admin/CategoryList';

interface Category {
    _id: string;
    name: string;
    slug: string;
    navbarCategory: string;
    description?: string;
    seoKeywords?: string;
    isActive: boolean;
    createdAt: string;
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<Category | null>(null);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch {
            toast.error('Error fetching categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                const response = await fetch(`/api/categories/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchCategories();
                    toast.success('Category deleted successfully');
                }
            } catch {
                toast.error('Error deleting category');
            }
        }
    };

    const handleEdit = (category: Category) => {
        setIsEditing(true);
        setEditData(category);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditData(null);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Category Management</h1>
            
            <CategoryForm
                onCategoryAdded={fetchCategories}
                isEditing={isEditing}
                editData={editData || undefined}
                onCancelEdit={handleCancelEdit}
            />

            <CategoryList
                categories={categories}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}