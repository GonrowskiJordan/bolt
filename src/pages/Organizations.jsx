import { useState } from 'react';
import { Building2, Users, Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import SideNav from '../components/SideNav';
import OrganizationDetailsDrawer from '../components/advisor/OrganizationDetailsDrawer';

const organizations = [
  {
    id: 1,
    name: 'Acme Corporation',
    employees: 234,
    location: 'New York, NY',
    industry: 'Technology',
    status: 'Active',
    lastActivity: '2 hours ago',
    contactName: 'John Smith',
    contactEmail: 'john.smith@acmecorp.com',
    contactPhone: '(212) 555-1234',
    planType: 'Premium ICHRA',
    renewalDate: 'January 15, 2025'
  },
  {
    id: 2,
    name: 'Global Industries',
    employees: 567,
    location: 'Los Angeles, CA',
    industry: 'Manufacturing',
    status: 'Active',
    lastActivity: '1 day ago',
    contactName: 'Sarah Johnson',
    contactEmail: 'sarah@globalindustries.com',
    contactPhone: '(323) 555-6789',
    planType: 'Standard ICHRA',
    renewalDate: 'March 10, 2025'
  },
  {
    id: 3,
    name: 'Tech Startups Inc',
    employees: 89,
    location: 'San Francisco, CA',
    industry: 'Technology',
    status: 'Pending',
    lastActivity: '3 days ago',
    contactName: 'Mike Chen',
    contactEmail: 'mike@techstartups.com',
    contactPhone: '(415) 555-9876',
    planType: 'Basic ICHRA',
    renewalDate: 'April 22, 2025'
  },
  {
    id: 4,
    name: 'Healthcare Plus',
    employees: 432,
    location: 'Chicago, IL',
    industry: 'Healthcare',
    status: 'Active',
    lastActivity: '1 week ago',
    contactName: 'Emily Rodriguez',
    contactEmail: 'emily@healthcareplus.com',
    contactPhone: '(312) 555-4321',
    planType: 'Premium ICHRA',
    renewalDate: 'February 5, 2025'
  }
];

export default function Organizations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredOrganizations = organizations.filter(org => {
    if (!searchQuery) return true;
    return (
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOrganizationClick = (organization) => {
    setSelectedOrganization(organization);
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex h-screen">
      <SideNav role="advisor" currentPath="/advisor/organizations" />
      <div className="flex-1 ml-[200px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view all organizations under your supervision
              </p>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <div className="flex items-center">
                <div className="relative flex-1 max-w-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search organizations"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrganizations.map((org) => (
                    <tr 
                      key={org.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleOrganizationClick(org)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-indigo-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{org.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{org.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {org.industry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-2" />
                          {org.employees}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          org.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {org.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {org.lastActivity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                        <button className="flex items-center hover:text-indigo-900" onClick={(e) => {
                          e.stopPropagation();
                          handleOrganizationClick(org);
                        }}>
                          View Details
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Details Drawer */}
      <OrganizationDetailsDrawer 
        organization={selectedOrganization}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}