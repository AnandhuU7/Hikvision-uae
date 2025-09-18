'use client'
import { useState, useEffect } from 'react';
import ProductForm from '@/app/Components/admin/ProductForm';
import ProductList from '@/app/Components/admin/ProductList';
import { Product } from '@/app/types/Product';
import { Toaster } from 'react-hot-toast';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      // Ensure data is an array
      setProducts(Array.isArray(data) ? data : []);
      console.log('Fetched products:', data); // Debug log
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditData(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <Toaster position="top-right" />
      
      <ProductForm
        onProductAdded={fetchProducts}
        isEditing={isEditing}
        editData={editData}
        onCancelEdit={handleCancelEdit}
      />

      <ProductList
        products={products}
        isLoading={isLoading}
        onProductsChange={fetchProducts}
        onEdit={handleEdit}
      />
    </div>
  );
} 