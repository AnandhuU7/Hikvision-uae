'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import SubCategoryForm from '../../Components/admin/SubCategoryForm';
import SubCategoryList from '../../Components/admin/SubCategoryList';

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  image?: string;
  seoKeywords?: string; // Added seoKeywords field
}

export default function SubCategoryPage() {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<SubCategory | undefined>(undefined);

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('/api/subcategories');
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      toast.error('Error fetching subcategories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleEdit = (subcategory: SubCategory) => {
    setIsEditing(true);
    setEditData(subcategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      try {
        const response = await fetch(`/api/subcategories/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          toast.success('SubCategory deleted successfully');
          fetchSubcategories();
        } else {
          toast.error('Failed to delete subcategory');
        }
      } catch (error) {
        toast.error('Error deleting subcategory');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(undefined);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">SubCategory Management</h1>
      
      <SubCategoryForm
        onSubCategoryAdded={fetchSubcategories}
        isEditing={isEditing}
        editData={editData}
        onCancelEdit={handleCancelEdit}
      />

      <SubCategoryList
        subcategories={subcategories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}