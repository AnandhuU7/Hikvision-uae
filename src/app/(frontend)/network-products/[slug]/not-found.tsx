import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-400 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Link 
          href="/network-products/network-cameras/pro-series" 
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors inline-flex items-center"
        >
          <span className="mr-2">←</span>
          Back to Products
        </Link>
      </div>
    </div>
  );
}