'use client'
import { Product } from '@/app/types/Product';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  onProductsChange: () => void;
  onEdit: (product: Product) => void;
}

export default function ProductList({ products = [], isLoading, onProductsChange, onEdit }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Product deleted successfully');
          onProductsChange();
        } else {
          toast.error('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Error deleting product');
      }
    }

  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!products) {
    console.error('Products is undefined');
    return (
      <div className="text-center text-red-600 p-4">
        Error: No products data available
      </div>
    );
  }

  if (!Array.isArray(products)) {
    console.error('Products is not an array:', products);
    return (
      <div className="text-center text-red-600 p-4">
        Error: Invalid products data format
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No products found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative mt-6">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 tracking-wider">
                Product
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 tracking-wider">
                Categories
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 tracking-wider">
                SEO Keywords
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 tracking-wider w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-16 w-16 flex-shrink-0">
                      <img
                        className="h-16 w-16 rounded-lg object-cover shadow-sm"
                        src={product.image1}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-5">
                      <div className="text-base font-semibold text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 max-w-md mt-1">
                        {product.description?.substring(0, 100)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col space-y-2">
                    <span className="px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-700 w-fit">
                      {product.navbarCategory?.name || 'No Navbar Category'}
                    </span>
                    <span className="px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-50 text-green-700 w-fit">
                      {product.category?.name || 'No Category'}
                    </span>
                    {product.subcategory && (
                      <span className="px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-50 text-yellow-700 w-fit">
                        {product.subcategory.name || 'No Subcategory'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm text-gray-600">
                    {product.seoKeywords ? (
                      <div className="flex flex-wrap gap-1">
                        {product.seoKeywords.split(',').map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {keyword.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">No keywords</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right">
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => onEdit(product)}
                      className="px-3 py-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium hover:bg-indigo-50 rounded-md transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-3 py-1.5 text-sm text-red-600 hover:text-red-800 font-medium hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}