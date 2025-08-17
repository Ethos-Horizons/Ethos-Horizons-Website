import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * Custom 404 page for unknown routes
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Button asChild size="lg" className="w-full">
            <Link href="/">
              Return Home
            </Link>
          </Button>

          <div className="flex space-x-4">
            <Button asChild variant="outline" className="flex-1">
              <Link href="/blog">
                Browse Blog
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/portfolio">
                View Portfolio
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
