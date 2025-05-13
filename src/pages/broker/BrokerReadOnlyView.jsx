import { useState } from 'react';
import SideNav from '../../components/SideNav';
import BrokerHeader from '../../components/broker/BrokerHeader';
import BrokerEmployeeDetails from '../../components/broker/BrokerEmployeeDetails';
import { Building2, Mail, Phone, Shield, FileText, Calendar, ExternalLink, Users, ChevronRight, CheckCircle, FileCheck, Menu } from 'lucide-react';
import { StatusBadge } from './BrokerEmployees';
import { useBroker } from '../../context/BrokerContext';
import Logo from '../../components/Logo';

// Sample client and employee data for the read-only view
const clientData = {
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
  planType: 'Premium',
  enrollmentRate: '92%',
  stipend: {
    employee: '$450',
    spouse: '$350',
    dependent: '$250'
  },
  planDetails: {
    name: 'Premium ICHRA',
    description: 'Full suite of benefits with premium carrier options',
    key_features: [
      'Comprehensive medical coverage',
      'Dental and vision options',
      'Wellness program included',
      'Telemedicine services'
    ],
    coveragePeriod: {
      start: 'Jan 1, 2024',
      end: 'Dec 31, 2024'
    },
    planDocumentation: `# ICHRA Plan Details - Premium Tier

This Individual Coverage Health Reimbursement Arrangement (ICHRA) offers comprehensive benefits for all eligible employees of Acme Corporation.

## Coverage Details
- **Medical**: Full coverage with major carriers
- **Pharmacy**: Prescription drug benefits included
- **Preventive Care**: 100% covered for in-network providers
- **Specialist Visits**: Coverage for specialty care
- **Emergency Services**: Coverage for emergency situations

## Reimbursement Structure
- **Employee**: $450/month
- **Spouse**: $350/month
- **Dependent**: $250/month per eligible dependent

## Eligibility
- All full-time employees (30+ hours/week)
- Part-time employees with 20+ hours/week after 90-day waiting period
- 1099 contractors not eligible

## Important Dates
- **Plan Year**: January 1, 2024 - December 31, 2024
- **Open Enrollment**: November 1, 2023 - November 30, 2023
- **Renewal Date**: January 15, 2025`
  }
};

const employees = [
  {
    id: 1,
    employmentStatus: 'Active',
    enrollmentStatus: 'Completed',
    email: 'john.doe@acmecorp.com',
    firstName: 'John',
    lastName: 'Doe',
    organization: 'Acme Corporation',
    stipend: '$543.28',
    premium: '$492.00',
    enrollmentOpenDate: '09/05/2024',
    enrollmentCloseDate: '10/31/2024',
    coverageStartDate: '11/01/2024',
    emailOpened: 'Yes',
    phone: '(415) 555-7890',
    gender: 'Male',
    dateOfBirth: '1982-06-15',
    address: {
      street: '123 Main Street',
      unit: 'Apt 45',
      city: 'San Francisco',
      state: 'California',
      zipCode: '94105'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 40,
      hourlyRate: 0,
      annualWages: 85000,
      payType: 'Salary',
      jobTitle: 'Senior Developer',
      brandUnit: 'Engineering',
      storeNumber: 'SF-001'
    },
    planDetails: {
      plan: 'Blue Cross PPO Gold',
      premium: '$492.00/month',
      deductible: '$1,000/year',
      outOfPocketMax: '$4,500/year',
      coverage: ['Medical', 'Dental', 'Vision'],
      startDate: '11/01/2024',
      endDate: '10/31/2025'
    }
  },
  {
    id: 2,
    employmentStatus: 'Active',
    enrollmentStatus: 'In Progress',
    email: 'jane.smith@acmecorp.com',
    firstName: 'Jane',
    lastName: 'Smith',
    organization: 'Acme Corporation',
    stipend: '$543.28',
    premium: 'TBD',
    enrollmentOpenDate: '09/05/2024',
    enrollmentCloseDate: '10/31/2024',
    coverageStartDate: '11/01/2024',
    emailOpened: 'Yes',
    phone: '(415) 555-6789',
    gender: 'Female',
    dateOfBirth: '1989-09-24',
    address: {
      street: '456 Pine Avenue',
      unit: '',
      city: 'San Francisco',
      state: 'California',
      zipCode: '94103'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 40,
      hourlyRate: 0,
      annualWages: 75000,
      payType: 'Salary',
      jobTitle: 'Product Manager',
      brandUnit: 'Product',
      storeNumber: 'SF-001'
    },
    planDetails: {
      plan: 'In Progress',
      premium: 'TBD',
      deductible: 'TBD',
      outOfPocketMax: 'TBD',
      coverage: [],
      startDate: '11/01/2024',
      endDate: '10/31/2025'
    }
  },
  {
    id: 3,
    employmentStatus: 'Active',
    enrollmentStatus: 'Not Started',
    email: 'mark.wilson@acmecorp.com',
    firstName: 'Mark',
    lastName: 'Wilson',
    organization: 'Acme Corporation',
    stipend: '$543.28',
    premium: 'N/A',
    enrollmentOpenDate: '09/05/2024',
    enrollmentCloseDate: '10/31/2024',
    coverageStartDate: '11/01/2024',
    emailOpened: 'No',
    phone: '(415) 555-2345',
    gender: 'Male',
    dateOfBirth: '1975-03-18',
    address: {
      street: '789 Market Street',
      unit: 'Suite 200',
      city: 'San Francisco',
      state: 'California',
      zipCode: '94102'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 40,
      hourlyRate: 0,
      annualWages: 95000,
      payType: 'Salary',
      jobTitle: 'Marketing Director',
      brandUnit: 'Marketing',
      storeNumber: 'SF-001'
    },
    planDetails: {
      plan: 'Not Selected',
      premium: 'N/A',
      deductible: 'N/A',
      outOfPocketMax: 'N/A',
      coverage: [],
      startDate: '11/01/2024',
      endDate: '10/31/2025'
    }
  }
];

export default function BrokerReadOnlyView() {
  const { isReadOnly } = useBroker();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showPlanDocumentation, setShowPlanDocumentation] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
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
            <SideNav role="broker" currentPath="/broker/client" />
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
        <div className="flex-1 pt-20 lg:pt-6 px-4 sm:px-6 overflow-y-auto">
          <BrokerHeader 
            title={clientData.name} 
            subtitle={`${clientData.industry} • ${clientData.location}`} 
            showBackButton={true}
            backUrl="/broker/clients-readonly"
          />
          
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Client Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-base font-medium mb-4 text-gray-900">Client Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{clientData.name}</p>
                      <p className="text-xs text-gray-500">{clientData.industry}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="mt-1">
                        <StatusBadge status={clientData.status} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Employees</p>
                      <p className="text-sm font-medium text-gray-900">{clientData.employees}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500 mb-2">Primary Contact</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">{clientData.contactName}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-1.5 text-gray-400" />
                        {clientData.contactPhone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-4 h-4 mr-1.5 text-gray-400" />
                        {clientData.contactEmail}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-base font-medium mb-4 text-gray-900">Plan Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Plan Type</p>
                    <p className="text-sm font-medium text-gray-900">{clientData.planDetails.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{clientData.planDetails.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-500">Renewal Date</p>
                      <p className="text-sm font-medium text-gray-900">{clientData.renewalDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Enrollment Rate</p>
                      <p className="text-sm font-medium text-green-600">{clientData.enrollmentRate}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs text-gray-500 mb-2">Coverage Period</p>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {clientData.planDetails.coveragePeriod.start} – {clientData.planDetails.coveragePeriod.end}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      onClick={() => setShowPlanDocumentation(!showPlanDocumentation)}
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
                    >
                      <FileCheck className="w-4 h-4 mr-1.5" />
                      {showPlanDocumentation ? 'Hide Plan Documentation' : 'View Plan Documentation'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-base font-medium mb-4 text-gray-900">Stipend Structure</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Employee</p>
                      <p className="text-lg font-semibold text-green-600">{clientData.stipend.employee}</p>
                      <p className="text-xs text-gray-500">per month</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Spouse</p>
                      <p className="text-lg font-semibold text-green-600">{clientData.stipend.spouse}</p>
                      <p className="text-xs text-gray-500">per month</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Dependent</p>
                      <p className="text-lg font-semibold text-green-600">{clientData.stipend.dependent}</p>
                      <p className="text-xs text-gray-500">per dependent</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <Shield className="w-6 h-6 text-indigo-500" />
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-medium text-gray-900">Key Features</p>
                      {clientData.planDetails.key_features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Plan Documentation */}
            {showPlanDocumentation && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Plan Documentation</h3>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-800">
                    {clientData.planDetails.planDocumentation}
                  </div>
                </div>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/broker/employees-readonly'}
                className="flex-1 py-4 px-6 bg-white shadow rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <Users className="w-5 h-5 text-indigo-600 mr-2" />
                <span className="text-gray-900 font-medium">View Employees</span>
              </button>
            </div>
            
            {/* Employee Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Employees</h3>
                </div>
                <span className="text-sm font-medium text-gray-500">{employees.length} employees</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stipend</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {employees.map(employee => (
                      <tr 
                        key={employee.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleEmployeeClick(employee)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.firstName} {employee.lastName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={employee.employmentStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={employee.enrollmentStatus} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.planDetails.plan === 'Not Selected' || employee.planDetails.plan === 'In Progress' 
                            ? employee.planDetails.plan 
                            : employee.planDetails.plan.split(' ').slice(0, 2).join(' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.stipend}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {employee.premium}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                          <button 
                            className="flex items-center hover:text-indigo-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEmployeeClick(employee);
                            }}
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Showing {employees.length} of {employees.length} employees
                </p>
                
                <div className="flex items-center space-x-2">
                  <a 
                    href="/broker/employees-readonly"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-900 flex items-center"
                  >
                    View all employees 
                    <ExternalLink className="ml-1 w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {selectedEmployee && (
            <BrokerEmployeeDetails
              employee={selectedEmployee}
              isOpen={showEmployeeDetails}
              onClose={() => setShowEmployeeDetails(false)}
              isReadOnly={isReadOnly}
            />
          )}
        </div>
      </div>
    </div>
  );
}