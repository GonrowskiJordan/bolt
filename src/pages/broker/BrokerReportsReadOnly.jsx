import { useState } from 'react';
import { BarChart3, Download, Filter, Search, FileSpreadsheet, FileText, Users, Building2, ArrowUpRight, ChevronDown, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import BrokerHeader from '../../components/broker/BrokerHeader';
import Logo from '../../components/Logo';

const reportTypes = [
  { 
    id: 'enrollment',
    name: 'Enrollment Reports',
    description: 'View enrollment status and progress across clients',
    icon: Users,
    reports: [
      { id: 1, name: 'Multi-Client Enrollment Summary', format: 'xlsx', lastGenerated: '2024-03-20' },
      { id: 2, name: 'Client-Specific Enrollment Details', format: 'xlsx', lastGenerated: '2024-03-19' },
      { id: 3, name: 'Enrollment Completion Rates', format: 'xlsx', lastGenerated: '2024-03-18' }
    ]
  },
  {
    id: 'financial',
    name: 'Financial Reports',
    description: 'View stipends and premium costs',
    icon: Building2,
    reports: [
      { id: 4, name: 'Client Premium Analysis', format: 'xlsx', lastGenerated: '2024-03-20' },
      { id: 5, name: 'Premium Cost Comparison', format: 'xlsx', lastGenerated: '2024-03-19' },
      { id: 6, name: 'Budget Utilization by Client', format: 'pdf', lastGenerated: '2024-03-18' }
    ]
  },
  { 
    id: 'broker',
    name: 'Broker Performance',
    description: 'View your performance metrics',
    icon: BarChart3,
    reports: [
      { id: 7, name: 'Performance Summary', format: 'xlsx', lastGenerated: '2024-03-20' },
      { id: 8, name: 'Client Acquisition Report', format: 'pdf', lastGenerated: '2024-03-15' },
      { id: 9, name: 'Renewal Performance', format: 'xlsx', lastGenerated: '2024-03-10' }
    ]
  }
];

export default function BrokerReportsReadOnly() {
  const [selectedType, setSelectedType] = useState(reportTypes[0]);
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const organizations = [
    'All Organizations',
    'Acme Corporation',
    'Globex Inc',
    'TechStart',
    'InnoSys',
    'Quantum Motors'
  ];

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
            <SideNav role="broker" currentPath="/broker/reports-readonly" />
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
          <BrokerHeader 
            title="Reports" 
            subtitle="View reports"
          />

          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-64 space-y-4">
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-sm font-medium text-gray-900 mb-4">Report Categories</h2>
                  <div className="space-y-2">
                    {reportTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${
                            selectedType.id === type.id
                              ? 'bg-indigo-50 text-indigo-700'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-4">
                  <h2 className="text-sm font-medium text-gray-900 mb-4">Report Options</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Organization
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className="inline-flex w-full justify-between items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                        >
                          {selectedOrg}
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </button>

                        {showOrgDropdown && (
                          <div 
                            className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" 
                            aria-orientation="vertical"
                          >
                            <div className="py-1" role="none">
                              {organizations.map((org, index) => (
                                <button 
                                  key={index} 
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  role="menuitem"
                                  onClick={() => {
                                    setSelectedOrg(org);
                                    setShowOrgDropdown(false);
                                  }}
                                >
                                  {org}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="date"
                          className="px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <input
                          type="date"
                          className="px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">{selectedType.name}</h2>
                        <p className="text-sm text-gray-500">{selectedType.description}</p>
                      </div>
                      {selectedOrg !== 'All Organizations' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Filtered by: {selectedOrg}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search reports"
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filters
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {selectedType.reports.map((report) => (
                        <div
                          key={report.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                        >
                          <div className="flex items-center">
                            {report.format === 'xlsx' ? (
                              <FileSpreadsheet className="w-8 h-8 text-green-600" />
                            ) : (
                              <FileText className="w-8 h-8 text-red-600" />
                            )}
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                              <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                              View
                            </button>
                            <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedType.reports.length === 0 && (
                      <div className="text-center py-8">
                        <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No reports available</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Choose different filters to find reports.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <div className="flex justify-end">
                      <a href="/broker/dashboard-readonly" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                        Dashboard insights
                        <ArrowUpRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}