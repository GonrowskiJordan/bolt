import { Home, FileText, HelpCircle, User, BarChart3, Activity, BadgeHelp, Building2, UserCog, Settings, LogOut, Briefcase, Users, Eye, Users2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useBroker } from '../context/BrokerContext';
import BrokerSideNavFull from './broker/BrokerSideNavFull';
import BrokerSideNavReadOnly from './broker/BrokerSideNavReadOnly';

const navigationConfig = {
  admin: {
    mainItems: [
      { icon: Home, label: 'Dashboard', to: '/admin/dashboard' },
      { icon: Users2, label: 'Employee', to: '/admin/employee' },
      { icon: FileText, label: 'Documents', to: '/admin/documents' },
      { icon: HelpCircle, label: 'Settings', to: '/admin/settings' }
    ],
    title: 'Platform Admin',
    shortName: 'AD'
  },
  advisor: {
    mainItems: [
      { icon: BadgeHelp, label: 'Dashboard', to: '/advisor/dashboard' },
      { icon: Building2, label: 'Organizations', to: '/advisor/organizations' },
      { icon: FileText, label: 'Documents', to: '/advisor/documents' },
      { icon: HelpCircle, label: 'Settings', to: '/advisor/settings' }
    ],
    title: 'Benefits Advisor',
    shortName: 'AB'
  },
  employer: {
    mainItems: [
      { icon: Home, label: 'Dashboard', to: '/employer/dashboard' },
      { icon: FileText, label: 'Documents', to: '/employer/documents' },
      { icon: Settings, label: 'Settings', to: '/employer/settings' }
    ],
    reportingItems: [
      { icon: BarChart3, label: 'Reports', to: '/employer/reports' },
      { icon: Activity, label: 'Activity Logs', to: '/employer/activity' }
    ],
    title: 'Employer Admin',
    shortName: 'EM'
  }
};

export default function SideNav({ role = 'employer', currentPath }) {
  const { isReadOnly } = useBroker();
  
  // If the role is broker, use the appropriate broker-specific navigation component
  if (role === 'broker') {
    return isReadOnly ? 
      <BrokerSideNavReadOnly currentPath={currentPath} /> : 
      <BrokerSideNavFull currentPath={currentPath} />;
  }
  
  const config = navigationConfig[role];
  
  if (!config) {
    console.error(`Invalid role: ${role}`);
    return null;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto pt-16 lg:pt-4">
        <div className="p-4 mb-4 hidden lg:block">
          <Logo />
        </div>
        
        <nav className="space-y-1">
          {config.mainItems.map((item, index) => {
            const Icon = item.icon;
            // Determine the correct path based on read-only status
            const linkPath = (role === 'broker' && isReadOnly && item.readOnlyTo) ? item.readOnlyTo : item.to;
            // Check if this link is active
            const isActive = (role === 'broker' && isReadOnly) 
              ? currentPath === item.readOnlyTo 
              : currentPath === item.to;
            
            return (
              <Link
                key={index}
                to={linkPath}
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

          {config.reportingItems && (
            <>
              <div className="pt-6 pb-2">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Analytics & Logs
                </h3>
              </div>

              {config.reportingItems.map((item, index) => {
                const Icon = item.icon;
                // Determine the correct path based on read-only status
                const linkPath = (role === 'broker' && isReadOnly && item.readOnlyTo) ? item.readOnlyTo : item.to;
                // Check if this link is active
                const isActive = (role === 'broker' && isReadOnly) 
                  ? currentPath === item.readOnlyTo 
                  : currentPath === item.to;
                
                return (
                  <Link
                    key={index}
                    to={linkPath}
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
            </>
          )}
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
              <p className="font-medium text-gray-800">{config.title}</p>
              <p className="text-xs text-gray-500 truncate">demo_{role.substring(0, 5)}...</p>
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