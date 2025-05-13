import { useState, useEffect } from 'react';
import { BarChart3, Download, Filter, Search, FileSpreadsheet, FileText, Users, Building2, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import Logo from '../../components/Logo';

const reportTypes = [
  { 
    id: 'enrollment',
    name: 'Enrollment Reports',
    description: 'Track enrollment status and progress',
    icon: Users,
    reports: [
      { id: 1, name: 'Enrollment Status Summary', format: 'xlsx', lastGenerated: '2024-03-20' },
      { id: 2, name: 'Enrollment Completion Rate', format: 'xlsx', lastGenerated: '2024-03-19' },
      { id: 3, name: 'Pending Enrollments', format: 'xlsx', lastGenerated: '2024-03-18' }
    ]
  },
  {
    id: 'financial',
    name: 'Financial Reports',
    description: 'Monitor stipends and premium costs',
    icon: Building2,
    reports: [
      { id: 4, name: 'Monthly Stipend Distribution', format: 'xlsx', lastGenerated: '2024-03-20' },
      { id: 5, name: 'Premium Cost Analysis', format: 'xlsx', lastGenerated: '2024-03-19' },
      { id: 6, name: 'Budget Utilization', format: 'pdf', lastGenerated: '2024-03-18' }
    ]
  }
];

export default function Reports() {
  const [selectedType, setSelectedType] = useState(reportTypes[0]);
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
            <SideNav role="employer" currentPath="/employer/reports" />
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
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Reports</h1>
              <p className="text-sm text-gray-500">Generate and download reports</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-64 space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-sm font-medium text-gray-900 mb-4">Report Types</h2>
                <div className="space-y-2">
                  {reportTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type)}
                        className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${
                          selectedType.id === type.id
                            ? 'bg-purple-50 text-purple-700'
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
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">{selectedType.name}</h2>
                      <p className="text-sm text-gray-500">{selectedType.description}</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 whitespace-nowrap">
                      Schedule Report
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search reports"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center whitespace-nowrap">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {selectedType.reports.map((report) => (
                      <div
                        key={report.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50 transition-colors gap-4"
                      >
                        <div className="flex items-center">
                          {report.format === 'xlsx' ? (
                            <FileSpreadsheet className="w-8 h-8 text-green-600 flex-shrink-0" />
                          ) : (
                            <FileText className="w-8 h-8 text-red-600 flex-shrink-0" />
                          )}
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-gray-900">{report.name}</h3>
                            <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                          </div>
                        </div>
                        <button className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center self-end sm:self-center whitespace-nowrap">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </button>
                      </div>
                    ))}
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