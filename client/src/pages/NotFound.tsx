import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Page not found</h2>
      <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link
        to="/"
        className="btn btn-primary mt-8 flex items-center"
      >
        <Home size={18} className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;