import { Home, User, UserCog, PenTool, Users2, LogOut, Mail, BadgeHelp, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

export default function PlatformAdminSideNav({ currentPath }) {
  const navItems = [
    { icon: Home, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: Users2, label: 'Employee', to: '/admin/employee' },
    { icon: PenTool, label: 'Feasibility Tool', to: '/admin/utility' },
    { icon: RotateCw, label: 'Update Carriers', to: '/admin/update-carriers' },
    { icon: Mail, label: 'Reports', to: '/admin/email-campaigns' },
    { icon: BadgeHelp, label: 'Advisor', to: '/advisor/dashboard' },
  ];

  return (
    <div className="bg-white h-screen fixed top-0 left-0 w-[200px] flex flex-col z-50 border-r border-gray-200">
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 mb-4">
          <Logo />
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPath === item.to;
            
            return (
              <Link
                key={index}
                to={item.to}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium ${
                  isActive
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
        <Link to="/" className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50">
          <LogOut className="w-5 h-5 mr-3" />
          Log out
        </Link>
      </div>
    </div>
  );
}