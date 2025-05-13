import { useState, useEffect } from 'react';
import { Activity, Filter, Search, ArrowDown, ArrowUp, User, FileText, Settings, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import Logo from '../../components/Logo';

const activityLogs = [
  {
    id: 1,
    type: 'employee_update',
    user: 'John Smith',
    action: 'Updated employee information',
    details: 'Changed employment status to Active',
    timestamp: '2024-03-20 14:30:00',
    category: 'Employee Management'
  },
  {
    id: 2,
    type: 'document_upload',
    user: 'Sarah Johnson',
    action: 'Uploaded new document',
    details: 'Added "Benefits Guide 2024.pdf"',
    timestamp: '2024-03-20 13:15:00',
    category: 'Documents'
  },
  {
    id: 3,
    type: 'settings_change',
    user: 'Admin',
    action: 'Modified system settings',
    details: 'Updated enrollment period dates',
    timestamp: '2024-03-20 11:45:00',
    category: 'Settings'
  },
  {
    id: 4,
    type: 'employee_update',
    user: 'John Smith',
    action: 'Added new employee',
    details: 'Created profile for Michael Brown',
    timestamp: '2024-03-20 10:30:00',
    category: 'Employee Management'
  }
];

const categories = [
  { id: 'all', name: 'All Activities' },
  { id: 'employee', name: 'Employee Management', icon: User },
  { id: 'document', name: 'Documents', icon: FileText },
  { id: 'settings', name: 'Settings', icon: Settings }
];

export default function ActivityLogs() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle window resize to close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'employee_update':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'document_upload':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'settings_change':
        return <Settings className="w-5 h-5 text-purple-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Header - z-index 50 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="h-16 flex items-center justify-between px-4 shadow-sm">
          <Logo className="w-24" />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - z-index 40 */}
        <div className="lg:relative">
          <div 
            className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 lg:w-[200px] flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:h-screen z-40`}
          >
            <SideNav role="employer" currentPath="/employer/activity" />
          </div>
          
          {/* Overlay when mobile menu is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden z-30"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Main content - z-index 10 */}
        <div className="flex-1 lg:ml-[200px] p-4 sm:p-6 pt-20 lg:pt-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Activity Logs</h1>
              <p className="text-sm text-gray-500">Track all system activities and changes</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search activity logs"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </button>
                  <button 
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                  >
                    {sortOrder === 'asc' ? (
                      <ArrowUp className="w-4 h-4 mr-2" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-2" />
                    )}
                    Sort by Date
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                      selectedCategory.id === category.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {getActivityIcon(log.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <p className="text-sm font-medium text-gray-900">{log.user}</p>
                        <span className="text-xs text-gray-500">{log.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{log.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {log.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}