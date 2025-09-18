import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SmartIPData = [
  {
    id: 1,
    name: 'DS-2CD5A85G1-IZ(H)S',
    image: '/images/DS-2CD5A85G1-IZ.png',
    slug: 'ds-2cd5a85g1-iz-h-s'
  },
  {
    id: 2,
    name: 'DS-2CD5AC5G0-IZ(H)S',
    image: '/images/DS-2CD5AC5G0-IZ.png',
    slug: 'ds-2cd5ac5g0-iz-h-s'
  },
  {
    id: 3,
    name: 'DS-96128NI-M16',
    image: '/images/DS-96128NI-M16.png',
    slug: 'ds-96128ni-m16'
  }
];

export default function SmartIP() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-white mb-6 tracking-tight">
              SmartIP <span className="text-gray-200">Solutions In Dubai</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-200 leading-relaxed">
              Experience superior surveillance with Hikvision's Ultra Series SmartIP cameras. 
              As your trusted provider in Dubai, we offer advanced security solutions that combine 
              cutting-edge technology with exceptional performance.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center text-sm font-medium" aria-label="Breadcrumb">
          <Link href="/" className="text-red-600 hover:text-red-700 transition-colors">
            Home
          </Link>
          <svg className="mx-2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-500">Ultra Series (SmartIP)</span>
        </nav>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-16 bg-white text-red-600 py-6 rounded-lg shadow-lg border border-gray-100">
          Ultra Series Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SmartIPData.map((product) => (
            <Link 
              key={product.id}
              href={`/smart-ip/${product.slug}`}
              className="cursor-pointer"
            >
              <div className="group flex flex-col items-center bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="w-48 h-48 mb-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain relative z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 group-hover:text-red-600 transition-colors duration-300 mb-4">
                  {product.name}
                </h3>
                <span className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300">
                  View Details
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
