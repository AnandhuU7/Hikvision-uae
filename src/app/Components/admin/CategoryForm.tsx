import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

interface CategoryFormProps {
  onCategoryAdded: () => void;
  isEditing?: boolean;
  editData?: {
    _id: string;
    name: string;
    navbarCategory: string;
    description?: string;
    seoKeywords?: string;
    image?: string;
  };
  onCancelEdit?: () => void;
}

interface NavbarCategoryType {
  _id: string;
  name: string;
  slug: string;
}

export default function CategoryForm({ onCategoryAdded, isEditing, editData, onCancelEdit }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    navbarCategory: '',
    description: '',
    seoKeywords: '',
    image: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategoryType[]>([]);

  useEffect(() => {
    if (isEditing && editData) {
      setFormData({
        name: editData.name,
        navbarCategory: editData.navbarCategory,
        description: editData.description || '',
        seoKeywords: editData.seoKeywords || '',
        image: null
      });
      if (editData.image) {
        setPreviewUrl(editData.image);
      }
    }
  }, [isEditing, editData]);

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const response = await fetch('/api/navbar-categories');
        const data = await response.json();
        setNavbarCategories(data);
      } catch {
        toast.error('Error fetching navbar categories');
      }
    };

    fetchNavbarCategories();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
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
      const url = isEditing ? `/api/categories/${editData?._id}` : '/api/categories';
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('navbarCategory', formData.navbarCategory);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('seoKeywords', formData.seoKeywords);
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success(isEditing ? 'Category updated' : 'Category created');
        setFormData({ name: '', navbarCategory: '', description: '', seoKeywords: '', image: null });
        setPreviewUrl('');
        onCategoryAdded();
        if (isEditing && onCancelEdit) {
          onCancelEdit();
        }
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to save category');
      }
    } catch {
      toast.error('Error saving category');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Category' : 'Add New Category'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">NavBar Category</label>
          <select
            value={formData.navbarCategory}
            onChange={(e) => setFormData({ ...formData, navbarCategory: e.target.value })}
            className="w-full p-2 border rounded"
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
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SEO Keywords</label>
          <textarea
            value={formData.seoKeywords}
            onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
            className="w-full p-2 border rounded"
            rows={2}
            placeholder="Enter keywords separated by commas (e.g., security, camera, hikvision)"
          />
          <p className="text-xs text-gray-500 mt-1">These keywords will help improve search engine visibility.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border rounded"
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

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {isEditing ? 'Update Category' : 'Add Category'}
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