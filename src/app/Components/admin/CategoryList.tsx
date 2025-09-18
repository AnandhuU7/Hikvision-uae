import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useEffect, useState } from 'react';

interface NavbarCategory {
  _id: string;
  name: string;
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  navbarCategory: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryList({ categories, loading, onEdit, onDelete }: CategoryListProps) {
  const [navbarCategories, setNavbarCategories] = useState<{ [key: string]: string }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const response = await fetch('/api/navbar-categories');
        const data = await response.json();
        const categoryMap = data.reduce((acc: { [key: string]: string }, category: NavbarCategory) => {
          acc[category._id] = category.name;
          return acc;
        }, {});
        setNavbarCategories(categoryMap);
      } catch (error) {
        console.error('Error fetching navbar categories:', error);
      }
    };

    fetchNavbarCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NavBar Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center">Loading...</td>
              </tr>
            ) : filteredCategories.map((category) => (
              <tr key={category._id}>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">{category.slug}</td>
                <td className="px-6 py-4">{navbarCategories[category.navbarCategory] || 'Loading...'}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(category._id)}
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