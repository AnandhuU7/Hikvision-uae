'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface Category {
    _id: string;
    name: string;
    slug: string;
    navbarCategory: string;
}

interface SubCategory {
    _id: string;
    name: string;
    category: string;
    description?: string;
    isActive: boolean;
    image?: string;
    navbarCategory?: string;
    seoKeywords?: string; // Added seoKeywords field
}

interface SubCategoryFormProps {
    onSubCategoryAdded: () => void;
    isEditing?: boolean;
    editData?: SubCategory;
    onCancelEdit?: () => void;
}

export default function SubCategoryForm({
    onSubCategoryAdded,
    isEditing = false,
    editData,
    onCancelEdit
}: SubCategoryFormProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [navbarCategories, setNavbarCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        isActive: true,
        image: null as File | null,
        navbarCategory: '',
        seoKeywords: '', // Added seoKeywords field
    });

    const [previewUrl, setPreviewUrl] = useState<string>('');

    useEffect(() => {
        const fetchNavbarCategories = async () => {
            try {
                const response = await fetch('/api/navbar-categories');
                const data = await response.json();
                setNavbarCategories(data);
            } catch (error) {
                console.error('Error fetching navbar categories:', error);
                toast.error('Error fetching navbar categories');
            }
        };
        fetchNavbarCategories();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            if (formData.navbarCategory) {
                try {
                    const response = await fetch(`/api/categories?navbarCategory=${formData.navbarCategory}`);
                    const data = await response.json();
                    setCategories(data);
                } catch (error) {
                    toast.error('Error fetching categories');
                    setCategories([]);
                }
            } else {
                setCategories([]);
            }
        };
        fetchCategories();
    }, [formData.navbarCategory]);

    useEffect(() => {
        if (isEditing && editData) {
            setFormData({
                name: editData.name,
                category: editData.category,
                description: editData.description || '',
                isActive: editData.isActive,
                image: null,
                navbarCategory: editData.navbarCategory || '',
                seoKeywords: editData.seoKeywords || '', // Added seoKeywords field
            });
            if (editData.image) {
                setPreviewUrl(editData.image);
            }
        }
    }, [isEditing, editData]);

    useEffect(() => {
        if (!isEditing) {
            setFormData(prev => ({
                ...prev,
                category: ''
            }));
        }
    }, [formData.navbarCategory, isEditing]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
            // Create a preview URL for the image
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing ? `/api/subcategories/${editData?._id}` : '/api/subcategories';
            
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('isActive', String(formData.isActive));
            formDataToSend.append('navbarCategory', formData.navbarCategory);
            formDataToSend.append('seoKeywords', formData.seoKeywords); // Added seoKeywords field
            
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success(isEditing ? 'Category updated' : 'Category created');
                setFormData({ 
                    name: '',
                    seoKeywords: '',
                    category: '', 
                    description: '', 
                    isActive: true, 
                    image: null,
                    navbarCategory: '',
                });
                setPreviewUrl('');
                onSubCategoryAdded();
                if (isEditing && onCancelEdit) {
                    onCancelEdit();
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to save category');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error saving category');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">
                {isEditing ? 'Edit SubCategory' : 'Add New SubCategory'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Navbar Category</label>
                    <select
                        value={formData.navbarCategory}
                        onChange={(e) => setFormData({ ...formData, navbarCategory: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">Select Navbar Category</option>
                        {navbarCategories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        rows={3}
                    />
                </div>

                {/* Add SEO Keywords field */}
                <div>
                    <label className="block text-sm font-medium mb-1">SEO Keywords</label>
                    <textarea
                        value={formData.seoKeywords}
                        onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        rows={2}
                        placeholder="Enter keywords separated by commas (e.g., security, camera, hikvision)"
                    />
                    <p className="text-xs text-gray-500 mt-1">These keywords will help improve search engine visibility.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                    />
                    {previewUrl && (
                        <div className="mt-2 relative w-32 h-32">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="mr-2"
                    />
                    <label className="text-sm font-medium">Active</label>
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        {isEditing ? 'Update' : 'Add'} SubCategory
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={onCancelEdit}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}