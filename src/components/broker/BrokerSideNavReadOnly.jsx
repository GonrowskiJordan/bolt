import { Home, FileText, HelpCircle, User, BarChart3, Activity, Briefcase, Users, Building2, LogOut, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function BrokerSideNavReadOnly({ currentPath }) {
  const mainItems = [
    { icon: Briefcase, label: 'Dashboard', to: '/broker/dashboard-readonly' },
    { icon: Building2, label: 'Clients', to: '/broker/clients-readonly' },
    { icon: Users, label: 'Employees', to: '/broker/employees-readonly' },
    { icon: FileText, label: 'Documents', to: '/broker/documents-readonly' }
  ];

  const reportingItems = [
    { icon: BarChart3, label: 'Reports', to: '/broker/reports-readonly' },
    { icon: Activity, label: 'Activity', to: '/broker/activity-readonly' }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto pt-16 lg:pt-4">
        <div className="p-4 mb-4 hidden lg:block">
          <Logo />
        </div>

        {/* Single read-only indicator */}
        <div className="mx-4 mb-4 px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-md flex items-center text-xs font-medium">
          <Eye className="w-4 h-4 mr-1.5" />
          Read-Only Mode
        </div>
        
        <nav className="space-y-1">
          {mainItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.to}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  currentPath === item.to
                    ? 'bg-[#F4F3FF] text-[#4F46E5]' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-6 pb-2">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Analytics & Logs
            </h3>
          </div>

          {reportingItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.to}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  currentPath === item.to
                    ? 'bg-[#F4F3FF] text-[#4F46E5]' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="mt-auto border-t border-gray-200">
        <button className="w-full flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-gray-50">
          <HelpCircle className="w-5 h-5 mr-3" />
          Support
        </button>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Broker</p>
              <p className="text-xs text-gray-500 truncate">view_only...</p>
            </div>
          </div>
          
          <button className="w-full flex items-center px-4 py-2 mt-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}