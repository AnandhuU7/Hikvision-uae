import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4">
      <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-lg">
        The display and control product you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link 
        href="/display-and-control" 
        className="bg-red-600 text-white py-3 px-6 rounded hover:bg-red-700 transition-colors"
      >
        Browse Display & Control Products
      </Link>
    </div>
  );
}