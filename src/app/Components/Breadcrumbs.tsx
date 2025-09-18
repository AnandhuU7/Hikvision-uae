import Link from 'next/link';

export default function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-red-600 transition-colors">
              Home
            </Link>
          </li>
          {items.map((item: { name: string; href: string }, index: number) => (
            <li key={index}>
              <span className="text-gray-400 mx-2">›</span>
              {index === items.length - 1 ? (
                <span className="text-red-600 font-medium">{item.name}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}