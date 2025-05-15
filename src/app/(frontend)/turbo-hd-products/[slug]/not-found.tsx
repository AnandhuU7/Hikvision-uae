import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Category Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          We couldn&apos;t find the Turbo HD product category you&apos;re looking for.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/turbo-hd-products" 
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md transition-colors"
          >
            Browse All Turbo HD Products
          </Link>
          <Link 
            href="/" 
            className="border border-gray-300 hover:bg-gray-100 py-3 px-6 rounded-md transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}