import { useState } from 'react';
import { Activity, Filter, Search, ArrowDown, ArrowUp, Building2, FileText, Settings, Calendar, CheckCircle, BarChart3, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import { useBroker } from '../../context/BrokerContext';
import BrokerHeader from '../../components/broker/BrokerHeader';
import Logo from '../../components/Logo';

const activityLogs = [
  {
    id: 1,
    type: 'client_update',
    user: 'Thomas Reynolds',
    action: 'Updated client information',
    details: 'Updated contact information for Acme Corporation',
    timestamp: '2024-03-20 14:30:00',
    category: 'Client Management',
    organization: 'Acme Corporation'
  },
  {
    id: 2,
    type: 'document_upload',
    user: 'Thomas Reynolds',
    action: 'Uploaded new document',
    details: 'Added "Benefits Guide 2024.pdf" for Globex Inc',
    timestamp: '2024-03-20 13:15:00',
    category: 'Documents',
    organization: 'Globex Inc'
  },
  {
    id: 3,
    type: 'enrollment_update',
    user: 'Amanda Garcia',
    action: 'Enrollment completed',
    details: 'Employee Michael Chen completed enrollment',
    timestamp: '2024-03-20 11:45:00',
    category: 'Enrollment',
    organization: 'Globex Inc'
  },
  {
    id: 4,
    type: 'client_added',
    user: 'Thomas Reynolds',
    action: 'Added new client',
    details: 'Created profile for TechStart',
    timestamp: '2024-03-20 10:30:00',
    category: 'Client Management',
    organization: 'TechStart'
  },
  {
    id: 5,
    type: 'meeting_scheduled',
    user: 'Amanda Garcia',
    action: 'Scheduled client meeting',
    details: 'Benefits review with InnoSys on April 5th',
    timestamp: '2024-03-19 15:45:00',
    category: 'Meetings',
    organization: 'InnoSys'
  },
  {
    id: 6,
    type: 'plan_changed',
    user: 'Thomas Reynolds',
    action: 'Updated plan details',
    details: 'Changed Quantum Motors plan from Standard to Premium',
    timestamp: '2024-03-19 11:30:00',
    category: 'Plans',
    organization: 'Quantum Motors'
  },
  {
    id: 7,
    type: 'report_generated',
    user: 'Amanda Garcia',
    action: 'Generated report',
    details: 'Created enrollment summary report for all clients',
    timestamp: '2024-03-18 14:15:00',
    category: 'Reports',
    organization: 'All Clients'
  }
];

const categories = [
  { id: 'all', name: 'All Activities' },
  { id: 'client', name: 'Client Management', icon: Building2 },
  { id: 'enrollment', name: 'Enrollment', icon: CheckCircle },
  { id: 'document', name: 'Documents', icon: FileText },
  { id: 'meetings', name: 'Meetings', icon: Calendar },
  { id: 'reports', name: 'Reports', icon: BarChart3 }
];

export default function BrokerActivity() {
  const { isReadOnly } = useBroker();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const pathBase = isReadOnly ? '/broker/activity-readonly' : '/broker/activity';

  const organizations = ['All Organizations', ...new Set(activityLogs.map(log => log.organization))];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'client_update':
      case 'client_added':
        return <Building2 className="w-5 h-5 text-blue-600" />;
      case 'document_upload':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'enrollment_update':
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'meeting_scheduled':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'plan_changed':
        return <Settings className="w-5 h-5 text-indigo-600" />;
      case 'report_generated':
        return <BarChart3 className="w-5 h-5 text-teal-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  // Filter logs based on search, category, and organization
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory.id === 'all' || 
      (selectedCategory.id === 'client' && log.category === 'Client Management') ||
      (selectedCategory.id === 'enrollment' && log.category === 'Enrollment') ||
      (selectedCategory.id === 'document' && log.category === 'Documents') ||
      (selectedCategory.id === 'meetings' && log.category === 'Meetings') ||
      (selectedCategory.id === 'reports' && log.category === 'Reports');
    
    const matchesOrg = 
      selectedOrg === 'All Organizations' || 
      log.organization === selectedOrg;
    
    return matchesSearch && matchesCategory && matchesOrg;
  });

  // Sort logs by timestamp
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sortOrder === 'asc') {
      return new Date(a.timestamp) - new Date(b.timestamp);
    } else {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Header */}
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
        {/* Sidebar */}
        <div className="lg:relative">
          <div 
            className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 lg:w-[200px] flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:h-screen z-40`}
          >
            <SideNav role="broker" currentPath={pathBase} />
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
        
        {/* Main content */}
        <div className="flex-1 pt-20 lg:pt-6 px-4 sm:px-6">
          {isReadOnly && (
            <BrokerHeader 
              title="Activity Logs" 
              subtitle="View activity logs"
            />
          )}
          
          {!isReadOnly && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
                <p className="text-sm text-gray-500">Track all activities and changes across your clients</p>
              </div>
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search activities"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div>
                    <select
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedOrg}
                      onChange={e => setSelectedOrg(e.target.value)}
                    >
                      {organizations.map((org, index) => (
                        <option key={index} value={org}>{org}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    {sortOrder === 'asc' ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    Sort by Date
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Filter className="w-4 h-4 mr-2" />
                    Advanced Filters
                  </button>
                </div>

                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
                        selectedCategory.id === category.id
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.icon && (
                        <span className="inline-block mr-2">
                          {<category.icon className="inline-block w-4 h-4" />}
                        </span>
                      )}
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {sortedLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {getActivityIcon(log.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{log.user}</p>
                            <p className="text-sm text-gray-600 mt-1">{log.action}</p>
                            <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-gray-500 whitespace-nowrap">{log.timestamp}</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-2">
                              {log.organization}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {sortedLogs.length === 0 && (
                  <div className="text-center py-12">
                    <Activity className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No activities found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
              
              {sortedLogs.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Showing {sortedLogs.length} of {activityLogs.length} activities
                    </p>
                    {!isReadOnly && (
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-900">
                        Load more
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}