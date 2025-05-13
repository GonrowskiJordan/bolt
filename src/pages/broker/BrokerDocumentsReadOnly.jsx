import { useState } from 'react';
import { FileText, Download, Search, Filter, FileSpreadsheet, ChevronDown, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import BrokerHeader from '../../components/broker/BrokerHeader';
import Logo from '../../components/Logo';

const documentCategories = [
  'All Documents', 
  'Client Documents', 
  'Agreements', 
  'Census Data',
  'Forms', 
  'Policies', 
  'Templates'
];

const documents = [
  {
    id: 1,
    name: 'Master Service Agreement',
    organization: 'Acme Corporation',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-03-15',
    category: 'Agreements',
    shared: true
  },
  {
    id: 2,
    name: '2024 Benefits Guide',
    organization: 'Globex Inc',
    type: 'PDF',
    size: '3.8 MB',
    lastModified: '2024-03-10',
    category: 'Client Documents',
    shared: true
  },
  {
    id: 3,
    name: 'ICHRA Implementation Checklist',
    organization: 'All Clients',
    type: 'DOCX',
    size: '1.2 MB',
    lastModified: '2024-03-05',
    category: 'Forms',
    shared: false
  },
  {
    id: 4,
    name: 'Employee Census Template',
    organization: 'All Clients',
    type: 'XLSX',
    size: '245 KB',
    lastModified: '2024-04-01',
    category: 'Templates',
    icon: FileSpreadsheet,
    shared: true
  },
  {
    id: 5,
    name: 'Compliance Training Materials',
    organization: 'Broker Portal',
    type: 'PDF',
    size: '5.7 MB',
    lastModified: '2024-02-15',
    category: 'Policies',
    shared: false
  },
  {
    id: 6,
    name: 'TechStart Employee Census - Complete',
    organization: 'TechStart',
    type: 'XLSX',
    size: '428 KB',
    lastModified: '2024-03-28',
    category: 'Census Data',
    icon: FileSpreadsheet,
    shared: true
  },
  {
    id: 7,
    name: 'Acme Corporation Employee Census - Complete',
    organization: 'Acme Corporation',
    type: 'XLSX',
    size: '820 KB',
    lastModified: '2024-03-22',
    category: 'Census Data',
    icon: FileSpreadsheet,
    shared: false
  },
  {
    id: 8,
    name: 'Enrollment Metrics',
    organization: 'All Clients',
    type: 'XLSX',
    size: '1.2 MB',
    lastModified: '2024-04-05',
    category: 'Templates',
    icon: FileSpreadsheet,
    shared: true
  }
];

export default function BrokerDocumentsReadOnly() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Documents');
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const organizations = ['All Organizations', ...new Set(documents.map(doc => doc.organization))];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Documents' || doc.category === selectedCategory;
    
    const matchesOrg = selectedOrg === 'All Organizations' || doc.organization === selectedOrg;
    
    return matchesSearch && matchesCategory && matchesOrg;
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
            <SideNav role="broker" currentPath="/broker/documents-readonly" />
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
            title="Documents" 
            subtitle="View documents"
          />

          <div className="max-w-7xl mx-auto">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 max-w-lg">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Search documents"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <div className="relative">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        id="org-dropdown"
                        onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                      >
                        {selectedOrg}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </button>

                      {showOrgDropdown && (
                        <div 
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                          role="menu" 
                          aria-orientation="vertical" 
                          aria-labelledby="org-dropdown"
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

                    <button
                      onClick={() => {}}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
                  {documentCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Organization
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shared
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.organization}
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.shared ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {doc.shared ? 'Shared' : 'Private'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900">View</button>
                            {doc.shared && (
                              <button className="text-indigo-600 hover:text-indigo-900">
                                <Download className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}