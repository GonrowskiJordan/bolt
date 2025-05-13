import { Activity } from 'lucide-react';
import useSWR from 'swr';
import { fetcher } from '../utils/api';
import { useEffect } from 'react';

export default function Dashboard() {
  const { data: health, error, mutate } = useSWR('/api/health', fetcher);

  useEffect(() => {
    // Retry on mount if there was an error
    if (error) {
      mutate();
    }
  }, [error, mutate]);

  if (error) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <div className="text-center text-red-600">
          {error.message || 'Error loading server status'}
        </div>
        <button
          onClick={() => mutate()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <div className="flex items-center justify-center mb-6">
        <Activity className="w-12 h-12 text-green-600" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Dashboard
      </h1>
      {health ? (
        <div className="text-center">
          <p className="text-green-600 font-semibold">
            Server Status: {health.status}
          </p>
          <p className="text-gray-500 text-sm">
            Last Check: {new Date(health.timestamp).toLocaleString()}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Loading server status...
        </p>
      )}
    </div>
  );
}