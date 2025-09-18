import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface Category {
    _id: string;
    name: string;
    navbarCategory: string;
}

interface SubCategory {
    _id: string;
    name: string;
    category: string;
}

interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    keyFeatures?: string;
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    navbarCategory: string | { _id: string; name: string; };
    category: string | { _id: string; name: string; };
    subcategory?: string | { _id: string; name: string; };
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    faqSchema?: any[];
}

interface ProductFormProps {
    onProductAdded: () => void;
    isEditing?: boolean;
    editData?: Product | null;
    onCancelEdit: () => void;
}

export default function ProductForm({ 
    onProductAdded, 
    isEditing = false, 
    editData = null,
    onCancelEdit 
}: ProductFormProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        keyFeatures: '',
        navbarCategory: '',
        category: '',
        subcategory: '',
        image1: null as File | null,
        image2: null as File | null,
        image3: null as File | null,
        image4: null as File | null,
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        faqSchema: [] as any[]
    });
    const [previewUrls, setPreviewUrls] = useState({
        image1: '',
        image2: '',
        image3: '',
        image4: ''
    });
    const [navbarCategories, setNavbarCategories] = useState<Category[]>([]);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            if (formData.navbarCategory) {
                try {
                    const response = await fetch(`/api/categories?navbarCategory=${formData.navbarCategory}`);
                    const data = await response.json();
                    setCategories(data);
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    toast.error('Error fetching categories');
                    setCategories([]);
                }

            } else {
                setCategories([]);
            }
        };
        fetchCategories();
    }, [formData.navbarCategory]);

    // Fetch subcategories when category changes
    useEffect(() => {
        const fetchSubcategories = async () => {
            if (formData.category) {
                try {
                    const response = await fetch(`/api/subcategories?category=${formData.category}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
                    }
                    const data = await response.json();
                    setSubcategories(data);
                } catch (error) {
                    console.error('Error fetching subcategories:', error);
                    toast.error('Error fetching subcategories');
                    setSubcategories([]);
                }
            } else {
                setSubcategories([]);
            }
        };
        fetchSubcategories();
    }, [formData.category]);

    // Add useEffect to populate form when editing
    useEffect(() => {
        if (isEditing && editData) {
            setFormData({
                name: editData.name,
                slug: editData.slug,
                description: editData.description,
                keyFeatures: Array.isArray(editData.keyFeatures)
                    ? editData.keyFeatures.join('\n')
                    : editData.keyFeatures || '',
                navbarCategory: typeof editData.navbarCategory === 'string' ? editData.navbarCategory : editData.navbarCategory._id,
                category: typeof editData.category === 'string' ? editData.category : editData.category._id,
                subcategory: editData.subcategory ? (typeof editData.subcategory === 'string' ? editData.subcategory : editData.subcategory._id) : '',
                image1: null,
                image2: null,
                image3: null,
                image4: null,
                seoTitle: editData.seoTitle || '',
                seoDescription: editData.seoDescription || '',
                seoKeywords: editData.seoKeywords || '',
                faqSchema: editData.faqSchema || []
            });
            
            setPreviewUrls({
                image1: editData.image1 || '',
                image2: editData.image2 || '',
                image3: editData.image3 || '',
                image4: editData.image4 || ''
            });
        }
    }, [isEditing, editData]);

    // Add new useEffect to fetch navbar categories
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

    // Modify the effect that resets categories
    useEffect(() => {
        // Skip resetting if we're in editing mode
        if (!isEditing) {
            setFormData(prev => ({
                ...prev,
                category: '',
                subcategory: ''
            }));
        }
    }, [formData.navbarCategory, isEditing]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        setFormData({ ...formData, name, slug });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, imageField: 'image1' | 'image2' | 'image3' | 'image4') => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, [imageField]: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrls(prev => ({
                    ...prev,
                    [imageField]: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const stringToBulletPoints = (str: string): string[] => {
        if (!str) return [];
        return str.split('\n').filter(line => line.trim() !== '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('slug', formData.slug);
            formDataToSend.append('description', formData.description);
            
            const keyFeatures = stringToBulletPoints(formData.keyFeatures)
                .map(feature => feature.trim().replace(/^[•-]\s*/, '')); // Remove existing bullets

            formDataToSend.append('keyFeatures', JSON.stringify(keyFeatures));
            
            formDataToSend.append('navbarCategory', formData.navbarCategory);
            formDataToSend.append('category', formData.category);
            if (formData.subcategory) {
                formDataToSend.append('subcategory', formData.subcategory);
            }

            if (formData.image1) {
                formDataToSend.append('image1', formData.image1);
            }
            if (formData.image2) {
                formDataToSend.append('image2', formData.image2);
            }
            if (formData.image3) {
                formDataToSend.append('image3', formData.image3);
            }
            if (formData.image4) {
                formDataToSend.append('image4', formData.image4);
            }

            const url = isEditing ? `/api/products/${editData?._id}` : '/api/products';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formDataToSend,
            });

            if (response.ok) {
                toast.success(isEditing ? 'Product updated successfully' : 'Product created successfully');
                setFormData({
                    name: '',
                    slug: '',
                    description: '',
                    keyFeatures: '',
                    navbarCategory: '',
                    category: '',
                    subcategory: '',
                    image1: null,
                    image2: null,
                    image3: null,
                    image4: null,
                    seoTitle: '',
                    seoDescription: '',
                    seoKeywords: '',
                    faqSchema: []
                });
                setPreviewUrls({
                    image1: '',
                    image2: '',
                    image3: '',
                    image4: ''
                });
                onProductAdded();
                if (isEditing && onCancelEdit) {
                    onCancelEdit();
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || `Failed to ${isEditing ? 'update' : 'create'} product`);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while saving the product');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={handleNameChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Slug</label>
                    <input
                        type="text"
                        value={formData.slug}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        rows={4}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Key Features</label>
                    <p className="text-sm text-gray-500 mb-2">Enter each feature on a new line</p>
                    <textarea
                        value={formData.keyFeatures}
                        onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                        placeholder="• AI-Powered Motion Detection
• Smart IR Technology
• Built-in Microphone"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        rows={6}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">NavBar Category</label>
                    <select
                        value={formData.navbarCategory}
                        onChange={(e) => setFormData({ ...formData, navbarCategory: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">Select NavBar Category</option>
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
                    <label className="block text-sm font-medium mb-1">SubCategory</label>
                    <select
                        value={formData.subcategory}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
                    >
                        <option value="">Select SubCategory</option>
                        {subcategories.map((subcategory) => (
                            <option key={subcategory._id} value={subcategory._id}>
                                {subcategory.name}
                            </option>
                        ))}
                    </select>
                    <small className="text-gray-500">
                        Selected category: {formData.category || 'none'} | 
                        Subcategories count: {subcategories.length}
                    </small>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image 1 (Required)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'image1')}
                        accept="image/*"
                        className="w-full p-2 border rounded"
                        required={!isEditing}
                    />
                    {previewUrls.image1 && (
                        <div className="mt-2 relative w-32 h-32">
                            <Image
                                src={previewUrls.image1}
                                alt="Preview 1"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image 2 (Optional)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'image2')}
                        accept="image/*"
                        className="w-full p-2 border rounded"
                    />
                    {previewUrls.image2 && (
                        <div className="mt-2 relative w-32 h-32">
                            <Image
                                src={previewUrls.image2}
                                alt="Preview 2"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image 3 (Optional)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'image3')}
                        accept="image/*"
                        className="w-full p-2 border rounded"
                    />
                    {previewUrls.image3 && (
                        <div className="mt-2 relative w-32 h-32">
                            <Image
                                src={previewUrls.image3}
                                alt="Preview 3"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image 4 (Optional)</label>
                    <input
                        type="file"
                        onChange={(e) => handleImageChange(e, 'image4')}
                        accept="image/*"
                        className="w-full p-2 border rounded"
                    />
                    {previewUrls.image4 && (
                        <div className="mt-2 relative w-32 h-32">
                            <Image
                                src={previewUrls.image4}
                                alt="Preview 4"
                                fill
                                className="object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        {isEditing ? 'Update Product' : 'Add Product'}
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
