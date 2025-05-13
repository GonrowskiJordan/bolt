import { Building2, Users, ArrowUpRight, FileText, Calendar, Mail, Clock, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import { StatusBadge } from './BrokerEmployees';
import BrokerHeader from '../../components/broker/BrokerHeader';
import { useState } from 'react';
import CompanyDetailsDrawer from '../../components/admin/CompanyDetailsDrawer';
import Logo from '../../components/Logo';

const stats = [
  { name: 'Total Clients', value: '28', icon: Building2, change: '+3', changeType: 'increase' },
  { name: 'Managed Employees', value: '1,842', icon: Users, change: '+214', changeType: 'increase' }
];

const clientList = [
  { 
    id: "a4c39e6a-e34e-45b3-a2cc-77ed9f72b8ae",
    name: 'Acme Corp', 
    employees: 234, 
    activeEmployees: 215,
    status: 'Active', 
    lastActivity: '2 hours ago',
    plan: 'Premium Plan',
    renewalDate: 'Jan 15, 2025',
    avgPremium: '$475',
    enrollmentRate: '92%',
    enrollmentStatus: {
      completed: 180,
      inProgress: 25,
      notStarted: 29
    },
    premiumDetails: {
      avgMonthly: '$475',
      totalAnnual: '$1.3M'
    },
    coverageDates: {
      start: '01/01/2024',
      end: '12/31/2024'
    },
    emailStats: {
      sent: 234,
      opened: 205,
      openRate: '87.6%'
    }
  },
  { 
    id: 2, 
    name: 'Globex Inc', 
    employees: 156, 
    activeEmployees: 142,
    status: 'Active', 
    lastActivity: '1 day ago',
    plan: 'Standard Plan',
    renewalDate: 'Mar 10, 2025',
    avgPremium: '$395',
    enrollmentRate: '91%',
    enrollmentStatus: {
      completed: 120,
      inProgress: 18,
      notStarted: 18
    },
    premiumDetails: {
      avgMonthly: '$395',
      totalAnnual: '$740K'
    },
    coverageDates: {
      start: '03/01/2024',
      end: '02/28/2025'
    },
    emailStats: {
      sent: 156,
      opened: 142,
      openRate: '91.0%'
    }
  },
  { 
    id: 3, 
    name: 'TechStart', 
    employees: 89, 
    activeEmployees: 63,
    status: 'Pending', 
    lastActivity: '3 days ago',
    plan: 'Basic Plan',
    renewalDate: 'Apr 22, 2025',
    avgPremium: '$325',
    enrollmentRate: '71%',
    enrollmentStatus: {
      completed: 45,
      inProgress: 12,
      notStarted: 32
    },
    premiumDetails: {
      avgMonthly: '$325',
      totalAnnual: '$175K'
    },
    coverageDates: {
      start: '05/01/2024',
      end: '04/30/2025'
    },
    emailStats: {
      sent: 89,
      opened: 67,
      openRate: '75.3%'
    }
  },
  { 
    id: 4, 
    name: 'InnoSys', 
    employees: 368, 
    activeEmployees: 342,
    status: 'Active', 
    lastActivity: '5 days ago',
    plan: 'Premium Plus',
    renewalDate: 'Feb 05, 2025',
    avgPremium: '$525',
    enrollmentRate: '93%',
    enrollmentStatus: {
      completed: 310,
      inProgress: 24,
      notStarted: 34
    },
    premiumDetails: {
      avgMonthly: '$525',
      totalAnnual: '$2.15M'
    },
    coverageDates: {
      start: '02/01/2024',
      end: '01/31/2025'
    },
    emailStats: {
      sent: 368,
      opened: 355,
      openRate: '96.5%'
    }
  },
  { 
    id: 5, 
    name: 'Quantum Motors', 
    employees: 214, 
    activeEmployees: 183,
    status: 'Active', 
    lastActivity: '1 week ago',
    plan: 'Standard Plan',
    renewalDate: 'Jun 30, 2025',
    avgPremium: '$412',
    enrollmentRate: '85%',
    enrollmentStatus: {
      completed: 163,
      inProgress: 15,
      notStarted: 36
    },
    premiumDetails: {
      avgMonthly: '$412',
      totalAnnual: '$905K'
    },
    coverageDates: {
      start: '07/01/2024',
      end: '06/30/2025'
    },
    emailStats: {
      sent: 214,
      opened: 178,
      openRate: '83.2%'
    }
  }
];

export default function BrokerDashboardReadOnly() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleRowClick = (client) => {
    setSelectedCompany({
      ...client,
      // Map the client object to format expected by CompanyDetailsDrawer
      name: client.name,
      industry: client.name.includes('Tech') ? 'Technology' : 
               client.name.includes('Motor') ? 'Automotive' :
               'Business Services',
      size: client.employees < 100 ? '51-200 employees' :
            client.employees < 300 ? '201-500 employees' : '501-1000 employees',
      status: client.status,
      address: '123 Business Ave',
      city: client.name.includes('Tech') ? 'San Francisco' :
            client.name.includes('Motor') ? 'Detroit' : 'New York',
      state: client.name.includes('Tech') ? 'California' :
             client.name.includes('Motor') ? 'Michigan' : 'New York',
      zipCode: '10001',
      phone: '(555) 123-4567',
      email: `info@${client.name.toLowerCase().replace(/\s+/g, '')}.com`,
      website: `www.${client.name.toLowerCase().replace(/\s+/g, '')}.com`,
      hrContact: {
        firstName: 'HR',
        lastName: 'Manager',
        phone: '(555) 987-6543',
        email: `hr@${client.name.toLowerCase().replace(/\s+/g, '')}.com`,
        position: 'HR Director'
      },
      enrollmentPeriods: [
        { 
          name: 'Open Enrollment 2025',
          startDate: client.coverageDates.start,
          endDate: client.coverageDates.end,
          status: 'Active'
        }
      ]
    });
    setIsDetailsDrawerOpen(true);
  };
  
  const handleCloseDetailsDrawer = () => {
    setIsDetailsDrawerOpen(false);
    setSelectedCompany(null);
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
            <SideNav role="broker" currentPath="/broker/dashboard-readonly" />
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

        <div className="flex-1 pt-20 lg:pt-6 px-4 sm:px-6 overflow-x-auto">
          <BrokerHeader 
            title="Broker Dashboard" 
            subtitle="View your client's information"
          />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Icon className="h-6 w-6 text-indigo-400" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                            <dd className="flex items-baseline">
                              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {stat.change}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Client Overview</h2>
                    <p className="mt-1 text-sm text-gray-500">View client organizations</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employees
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Enrollment Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Premium Details
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Coverage Period
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email Tracking
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clientList.slice(0, 5).map((client) => (
                        <tr 
                          key={client.id} 
                          className="hover:bg-gray-50 cursor-pointer" 
                          onClick={() => handleRowClick(client)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                  <Building2 className="h-6 w-6 text-indigo-600" />
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                <div className="text-xs text-gray-500">{client.plan}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <span className="text-sm text-gray-900">{client.activeEmployees}</span>
                              <span className="text-gray-500 text-xs">/{client.employees}</span>
                            </div>
                            <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                              <div 
                                className="h-1.5 bg-indigo-600 rounded-full" 
                                style={{ width: `${(client.activeEmployees / client.employees) * 100}%` }}
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              client.status === 'Active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {client.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Completed:</span> 
                                <span className="font-medium text-green-600">{client.enrollmentStatus.completed}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">In Progress:</span> 
                                <span className="font-medium text-yellow-600">{client.enrollmentStatus.inProgress}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-gray-500">Not Started:</span> 
                                <span className="font-medium text-gray-600">{client.enrollmentStatus.notStarted}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="space-y-2">
                              <div className="flex items-center text-xs">
                                <span className="text-gray-500 mr-2">Monthly Avg:</span>
                                <span className="font-medium text-gray-900">{client.premiumDetails.avgMonthly}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <span className="text-gray-500 mr-2">Annual Total:</span>
                                <span className="font-medium text-gray-900">{client.premiumDetails.totalAnnual}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                              <div className="text-sm">
                                <div className="text-xs text-gray-500">Start: <span className="text-gray-900">{client.coverageDates.start}</span></div>
                                <div className="text-xs text-gray-500">End: <span className="text-gray-900">{client.coverageDates.end}</span></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 text-gray-400 mr-2" />
                              <div className="text-sm">
                                <div className="text-xs text-gray-900">Open Rate: <span className="font-medium text-green-600">{client.emailStats.openRate}</span></div>
                                <div className="text-xs text-gray-500">{client.emailStats.opened}/{client.emailStats.sent} emails</div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <a href="/broker/clients-readonly" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                    View all clients
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-2" />
                    <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <span>New employee enrollment</span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-gray-500">Acme Corp</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          John Doe completed enrollment process with Blue Cross PPO Gold plan
                        </p>
                        <p className="mt-1 text-xs text-gray-400">Today at 2:34 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <span>Document shared</span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-gray-500">Globex Inc</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Benefits Guide 2024 was shared with all employees
                        </p>
                        <p className="mt-1 text-xs text-gray-400">Yesterday at 11:20 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                        <Calendar className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <span>Renewal date approaching</span>
                          <span className="mx-2 text-gray-500">•</span>
                          <span className="text-gray-500">InnoSys</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Contract renewal date in 30 days (Feb 05, 2025)
                        </p>
                        <p className="mt-1 text-xs text-gray-400">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-200">
                  <a href="/broker/activity-readonly" className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center">
                    View all activities
                    <ArrowUpRight className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Company Details Drawer */}
      <CompanyDetailsDrawer 
        company={selectedCompany}
        isOpen={isDetailsDrawerOpen}
        onClose={handleCloseDetailsDrawer}
      />
    </div>
  );
}