import { useState } from 'react';
import { Building2, Search, Filter, AlertCircle, MapPin, Users, Phone, Mail, Calendar, BarChart3, ChevronRight, FileText } from 'lucide-react';
import BrokerSideNavReadOnly from '../../components/broker/BrokerSideNavReadOnly';
import BrokerHeader from '../../components/broker/BrokerHeader';
import Logo from '../../components/Logo';

const clients = [
  { 
    id: 1, 
    name: 'Acme Corporation', 
    industry: 'Technology',
    location: 'San Francisco, CA',
    employees: 234, 
    contactName: 'John Smith',
    contactPhone: '(415) 555-1234',
    contactEmail: 'john@acmecorp.com',
    status: 'Active',
    renewalDate: 'Jan 15, 2025',
    lastActivity: '2 hours ago',
    planType: 'Premium',
    enrollmentRate: 92,
    notes: 'Interested in adding dental benefits next quarter.'
  },
  { 
    id: 2, 
    name: 'Globex Inc', 
    industry: 'Manufacturing',
    location: 'Detroit, MI',
    employees: 156, 
    contactName: 'Sarah Johnson',
    contactPhone: '(313) 555-2345',
    contactEmail: 'sarah@globex.com',
    status: 'Active',
    renewalDate: 'Mar 10, 2025',
    lastActivity: '1 day ago',
    planType: 'Standard',
    enrollmentRate: 85,
    notes: 'Considering expanding coverage to part-time employees.'
  },
  { 
    id: 3, 
    name: 'TechStart', 
    industry: 'Technology',
    location: 'Austin, TX',
    employees: 89, 
    contactName: 'Mike Chen',
    contactPhone: '(512) 555-3456',
    contactEmail: 'mike@techstart.com',
    status: 'Pending',
    renewalDate: 'Apr 22, 2025',
    lastActivity: '3 days ago',
    planType: 'Basic',
    enrollmentRate: 71,
    notes: 'New client, still finalizing implementation details.'
  },
  { 
    id: 4, 
    name: 'InnoSys', 
    industry: 'Healthcare',
    location: 'Boston, MA',
    employees: 368, 
    contactName: 'Emily Rodriguez',
    contactPhone: '(617) 555-4567',
    contactEmail: 'emily@innosys.com',
    status: 'Active',
    renewalDate: 'Feb 05, 2025',
    lastActivity: '5 days ago',
    planType: 'Premium Plus',
    enrollmentRate: 93,
    notes: 'Very satisfied client, potential for referrals.'
  },
  { 
    id: 5, 
    name: 'Quantum Motors', 
    industry: 'Automotive',
    location: 'Seattle, WA',
    employees: 214, 
    contactName: 'David Lee',
    contactPhone: '(206) 555-5678',
    contactEmail: 'david@quantummotors.com',
    status: 'Active',
    renewalDate: 'Jun 30, 2025',
    lastActivity: '1 week ago',
    planType: 'Standard',
    enrollmentRate: 85,
    notes: 'Recently expanded benefits package.'
  },
  { 
    id: 6, 
    name: 'Evergreen Solutions', 
    industry: 'Environmental',
    location: 'Portland, OR',
    employees: 142, 
    contactName: 'Lisa Martinez',
    contactPhone: '(503) 555-6789',
    contactEmail: 'lisa@evergreensolutions.com',
    status: 'Active',
    renewalDate: 'Aug 15, 2025',
    lastActivity: '2 weeks ago',
    planType: 'Standard',
    enrollmentRate: 89,
    notes: 'Looking to add vision benefits next renewal.'
  },
  { 
    id: 7, 
    name: 'Coastal Shipping', 
    industry: 'Logistics',
    location: 'Miami, FL',
    employees: 302, 
    contactName: 'Robert Johnson',
    contactPhone: '(305) 555-7890',
    contactEmail: 'robert@coastalshipping.com',
    status: 'Inactive',
    renewalDate: 'May 20, 2025',
    lastActivity: '1 month ago',
    planType: 'Basic',
    enrollmentRate: 64,
    notes: 'Needs follow-up regarding renewal options.'
  }
];

export default function BrokerClientsReadOnly() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const industries = [...new Set(clients.map(client => client.industry))];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.location.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const matchesIndustry = selectedIndustries.length === 0 || 
                           selectedIndustries.includes(client.industry);
                           
    return matchesSearch && matchesIndustry;
  });

  const handleClientClick = (client) => {
    setSelectedClient(client);
  };

  const renderClientDetails = () => {
    if (!selectedClient) return null;
    
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setSelectedClient(null)}></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                          {selectedClient.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedClient.industry} • {selectedClient.location}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        selectedClient.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        selectedClient.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedClient.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{selectedClient.contactName}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{selectedClient.contactPhone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{selectedClient.contactEmail}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{selectedClient.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Plan Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-500">Plan Type:</div>
                          <div className="ml-auto text-sm text-gray-900">{selectedClient.planType}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-500">Employees:</div>
                          <div className="ml-auto text-sm text-gray-900">{selectedClient.employees}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-500">Enrollment Rate:</div>
                          <div className="ml-auto text-sm text-gray-900">{selectedClient.enrollmentRate}%</div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">Renewal: {selectedClient.renewalDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Notes</h4>
                      <p className="text-sm text-gray-600">{selectedClient.notes}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">View Options</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button 
                        className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                        onClick={() => {
                          setSelectedClient(null);
                          window.location.href = `/broker/client?clientId=${selectedClient.id}&access=readonly`;
                        }}
                      >
                        <Building2 className="w-4 h-4 mr-2" />
                        View Client Details
                      </button>
                      <button 
                        className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                        onClick={() => {
                          setSelectedClient(null);
                          window.location.href = `/broker/employees-readonly`;
                        }}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        View Employees
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setSelectedClient(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
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
            <BrokerSideNavReadOnly currentPath="/broker/clients-readonly" />
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
            title="Clients" 
            subtitle="View client organizations"
          />

          <div className="flex justify-between items-center mb-6">
            <div className="relative max-w-xs w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search clients"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg mb-8">
            {showFilters && (
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Industry
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map(industry => (
                        <label key={industry} className="inline-flex items-center">
                          <input 
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={selectedIndustries.includes(industry)}
                            onChange={() => {
                              if (selectedIndustries.includes(industry)) {
                                setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                              } else {
                                setSelectedIndustries([...selectedIndustries, industry]);
                              }
                            }}
                          />
                          <span className="ml-2 text-sm text-gray-700">{industry}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
              
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plan Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Renewal Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleClientClick(client)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-indigo-600" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.industry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.employees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.planType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          client.status === 'Active' ? 'bg-green-100 text-green-800' :
                          client.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.renewalDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClientClick(client);
                          }}
                        >
                          View Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredClients.length === 0 && (
              <div className="py-8 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {renderClientDetails()}
    </div>
  );
}