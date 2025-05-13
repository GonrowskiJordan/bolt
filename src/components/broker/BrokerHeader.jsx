import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BrokerHeader({ title, subtitle, showBackButton = false, backUrl = '/broker/dashboard-readonly' }) {
  return (
    <div className="relative mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <Link 
              to={backUrl}
              className="mr-4 p-2 -ml-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}