import { useState, useEffect } from 'react';
import { FileText, Download, Search, Filter, Upload, FileSpreadsheet, Database, Menu } from 'lucide-react';
import SideNav from '../components/SideNav';
import Logo from '../components/Logo';

const documents = [
  {
    id: 1,
    name: 'ICHRA Plan Document',
    type: 'PDF',
    size: '3.2 MB',
    lastModified: '2024-03-15',
    category: 'Benefits'
  },
  {
    id: 2,
    name: 'Compliance Guidelines 2024',
    type: 'PDF',
    size: '1.8 MB',
    lastModified: '2024-03-10',
    category: 'Compliance'
  },
  {
    id: 3,
    name: 'Employee Handbook Template',
    type: 'DOCX',
    size: '1.5 MB',
    lastModified: '2024-03-05',
    category: 'Templates'
  },
  {
    id: 4,
    name: 'Benefits Administration Guide',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-03-01',
    category: 'Benefits'
  },
  {
    id: 5,
    name: 'Employee Census Template',
    type: 'CSV',
    size: '128 KB',
    lastModified: '2024-04-01',
    category: 'Data',
    icon: Database
  }
];

export default function EmployerDocuments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

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
  
  const categories = ['All', 'Benefits', 'Compliance', 'Templates', 'Data'];
  
  const filteredDocuments = activeCategory === 'All' 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

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
            <SideNav role="employer" currentPath="/employer/documents" />
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
        <div className="flex-1 pt-20 lg:pt-6">
          <div className="mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Documents</h1>
                <p className="text-sm text-gray-500">Manage and access your organization's documents</p>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 flex items-center self-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="relative max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search documents"
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 hidden sm:flex">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button 
                    key={category} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category 
                        ? 'bg-purple-100 text-purple-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {doc.icon ? (
                              <doc.icon className="w-5 h-5 text-indigo-500 mr-3" />
                            ) : (
                              <FileText className="w-5 h-5 text-gray-400 mr-3" />
                            )}
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.lastModified}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredDocuments.length === 0 && (
                <div className="py-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                  <p className="text-gray-500 mt-1">Try selecting a different category</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}