import { useState } from 'react';
import { Search, Filter, Download, Menu } from 'lucide-react';
import SideNav from '../../components/SideNav';
import FilterDrawer from '../../components/FilterDrawer';
import BrokerEmployeesTable from '../../components/broker/BrokerEmployeesTable';
import { useBroker } from '../../context/BrokerContext';
import BrokerHeader from '../../components/broker/BrokerHeader';
import BrokerEmployeeDetailsReadOnly from '../../components/broker/BrokerEmployeeDetailsReadOnly';
import Logo from '../../components/Logo';

// Sample employee data
const employees = [
  {
    id: 1,
    employmentStatus: 'Active',
    enrollmentStatus: 'Not Started',
    email: 'sarah.johnson@acmecorp.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    organization: 'Acme Corporation',
    stipend: '$543.28',
    premium: 'N/A',
    enrollmentOpenDate: '09/05/2024',
    enrollmentCloseDate: '10/31/2024',
    coverageStartDate: '11/01/2024',
    emailOpened: 'No',
    phone: '(402) 555-0123',
    gender: 'Female',
    dateOfBirth: '1992-03-15',
    address: {
      street: '789 Pine Street',
      unit: 'Suite 101',
      city: 'San Francisco',
      state: 'California',
      zipCode: '94105'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 35,
      hourlyRate: 18.75,
      annualWages: 34125,
      payType: 'Hourly',
      jobTitle: 'Customer Service Representative',
      brandUnit: 'Support',
      storeNumber: 'CSR-789'
    },
    planDetails: {
      plan: 'No Plan Selected',
      premium: 'N/A',
      deductible: 'N/A',
      outOfPocketMax: 'N/A',
      coverage: [],
      startDate: '11/01/2024',
      endDate: '10/31/2025'
    }
  },
  {
    id: 2,
    employmentStatus: 'Active',
    enrollmentStatus: 'Completed',
    email: 'michael.chen@globex.com',
    firstName: 'Michael',
    lastName: 'Chen',
    organization: 'Globex Inc',
    stipend: '$984.18',
    premium: '$850.00',
    enrollmentOpenDate: '02/21/2024',
    enrollmentCloseDate: '12/30/2024',
    coverageStartDate: '10/01/2025',
    emailOpened: 'Yes',
    phone: '(208) 993-3552',
    gender: 'Male',
    dateOfBirth: '1985-07-12',
    address: {
      street: '456 Market Street',
      unit: 'Apt 3B',
      city: 'Detroit',
      state: 'Michigan',
      zipCode: '48201'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 40,
      hourlyRate: 24.50,
      annualWages: 51000,
      payType: 'Salary',
      jobTitle: 'Manufacturing Engineer',
      brandUnit: 'Production',
      storeNumber: 'ME-456'
    },
    planDetails: {
      plan: 'Blue Cross Blue Shield PPO Gold',
      premium: '$850.00/month',
      deductible: '$1,500/year',
      outOfPocketMax: '$4,000/year',
      coverage: ['Medical', 'Dental', 'Vision'],
      startDate: '10/01/2025',
      endDate: '09/30/2026'
    }
  },
  {
    id: 3,
    employmentStatus: 'Active',
    enrollmentStatus: 'In Progress',
    email: 'emily.rodriguez@techstart.com',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    organization: 'TechStart',
    stipend: '$700.09',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'Yes',
    phone: '(512) 555-8765',
    gender: 'Female',
    dateOfBirth: '1990-11-08',
    address: {
      street: '123 Tech Blvd',
      unit: 'Unit 5',
      city: 'Austin',
      state: 'Texas',
      zipCode: '78701'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 40,
      hourlyRate: 0,
      annualWages: 85000,
      payType: 'Salary',
      jobTitle: 'Software Developer',
      brandUnit: 'Engineering',
      storeNumber: 'ENG-123'
    },
    planDetails: {
      plan: 'In Progress',
      premium: 'TBD',
      deductible: 'TBD',
      outOfPocketMax: 'TBD',
      coverage: [],
      startDate: '02/01/2025',
      endDate: '01/31/2026'
    }
  },
  {
    id: 4,
    employmentStatus: 'Termed',
    enrollmentStatus: 'Not Started',
    email: 'david.kim@innosys.com',
    firstName: 'David',
    lastName: 'Kim',
    organization: 'InnoSys',
    stipend: '$413.95',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'No',
    phone: '(617) 555-2345',
    gender: 'Male',
    dateOfBirth: '1978-04-22',
    address: {
      street: '200 Innovation Way',
      unit: '',
      city: 'Boston',
      state: 'Massachusetts',
      zipCode: '02110'
    },
    employmentDetails: {
      type: 'Former Employee',
      avgHoursPerWeek: 0,
      hourlyRate: 0,
      annualWages: 0,
      payType: 'N/A',
      jobTitle: 'Former Project Manager',
      brandUnit: 'Operations',
      storeNumber: 'OPS-201'
    },
    planDetails: {
      plan: 'No Plan Selected',
      premium: 'N/A',
      deductible: 'N/A',
      outOfPocketMax: 'N/A',
      coverage: [],
      startDate: 'N/A',
      endDate: 'N/A'
    }
  },
  {
    id: 5,
    employmentStatus: 'Active',
    enrollmentStatus: 'Completed',
    email: 'rachel.patel@quantummotors.com',
    firstName: 'Rachel',
    lastName: 'Patel',
    organization: 'Quantum Motors',
    stipend: '$661.24',
    premium: '$600',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/20/2025',
    coverageStartDate: '03/01/2025',
    emailOpened: 'Yes',
    phone: '(206) 555-7890',
    gender: 'Female',
    dateOfBirth: '1982-09-17',
    address: {
      street: '500 Electric Avenue',
      unit: 'Floor 3',
      city: 'Seattle',
      state: 'Washington',
      zipCode: '98101'
    },
    employmentDetails: {
      type: 'Full Time',
      avgHoursPerWeek: 40,
      hourlyRate: 0,
      annualWages: 72000,
      payType: 'Salary',
      jobTitle: 'Marketing Manager',
      brandUnit: 'Marketing',
      storeNumber: 'MKT-105'
    },
    planDetails: {
      plan: 'UnitedHealthcare Silver HMO',
      premium: '$600.00/month',
      deductible: '$2,500/year',
      outOfPocketMax: '$6,000/year',
      coverage: ['Medical', 'Dental'],
      startDate: '03/01/2025',
      endDate: '02/28/2026'
    }
  }
];

export default function BrokerEmployeesReadOnly() {
  const { isReadOnly } = useBroker();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({
    enrollmentStatus: [],
    employmentStatus: [],
    emailOpened: 'All',
    dateRange: { startDate: '', endDate: '' },
    dateRangeType: 'custom',
    enrollmentDateRange: { openDate: '', closeDate: '' },
    organization: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const rowsPerPageOptions = [10, 25, 50, 100];
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  
  // Filter employees based on search query and applied filters
  const filteredEmployees = employees.filter(employee => {
    // Search query filter
    const matchesSearch = 
      searchQuery === '' ||
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Enrollment status filter
    const matchesEnrollmentStatus = 
      appliedFilters.enrollmentStatus.length === 0 || 
      appliedFilters.enrollmentStatus.includes(employee.enrollmentStatus);
    
    // Employment status filter
    const matchesEmploymentStatus = 
      appliedFilters.employmentStatus.length === 0 || 
      appliedFilters.employmentStatus.includes(employee.employmentStatus);
    
    // Email opened filter
    const matchesEmailOpened = 
      appliedFilters.emailOpened === 'All' || 
      employee.emailOpened === appliedFilters.emailOpened;
    
    // Organization filter
    const matchesOrganization = 
      appliedFilters.organization.length === 0 || 
      appliedFilters.organization.includes(employee.organization);

    return matchesSearch && matchesEnrollmentStatus && matchesEmploymentStatus && matchesEmailOpened && matchesOrganization;
  });
  
  // Paginate the filtered employees
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };
  
  const handleFilterApply = (filters) => {
    // Ensure enrollmentStatus and employmentStatus are always arrays
    const updatedFilters = {
      ...filters,
      enrollmentStatus: Array.isArray(filters.enrollmentStatus) ? filters.enrollmentStatus : [],
      employmentStatus: Array.isArray(filters.employmentStatus) ? filters.employmentStatus : [],
      organization: Array.isArray(filters.organization) ? filters.organization : []
    };
    setAppliedFilters(updatedFilters);
    setIsFilterDrawerOpen(false);
  };

  const getActiveFilters = () => {
    const activeFilters = [];
    
    if (Array.isArray(appliedFilters.enrollmentStatus) && appliedFilters.enrollmentStatus.length > 0) {
      appliedFilters.enrollmentStatus.forEach(status => {
        activeFilters.push({
          type: 'enrollmentStatus',
          value: status,
          label: `Enrollment: ${status}`
        });
      });
    }
    
    if (Array.isArray(appliedFilters.employmentStatus) && appliedFilters.employmentStatus.length > 0) {
      appliedFilters.employmentStatus.forEach(status => {
        activeFilters.push({
          type: 'employmentStatus',
          value: status,
          label: `Employment: ${status}`
        });
      });
    }
    
    if (Array.isArray(appliedFilters.organization) && appliedFilters.organization.length > 0) {
      appliedFilters.organization.forEach(org => {
        activeFilters.push({
          type: 'organization',
          value: org,
          label: `Organization: ${org}`
        });
      });
    }
    
    if (appliedFilters.emailOpened && appliedFilters.emailOpened !== 'All') {
      activeFilters.push({
        type: 'emailOpened',
        value: appliedFilters.emailOpened,
        label: `Email Opened: ${appliedFilters.emailOpened}`
      });
    }
    
    return activeFilters;
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
            <SideNav role="broker" currentPath="/broker/employees-readonly" />
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
            title="Employees" 
            subtitle="View employee details"
            showBackButton={true}
            backUrl="/broker/clients-readonly"
          />
          
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 min-w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="mb-4">
              <h2 className="text-base font-medium text-gray-900 p-4">
                All employees <span className="text-sm font-normal text-gray-500 ml-1">{filteredEmployees.length} employees</span>
              </h2>
            </div>
            
            {/* Use the BrokerEmployeesTable component */}
            <BrokerEmployeesTable
              employees={employees}
              isReadOnly={true}
              filteredEmployees={filteredEmployees}
              paginatedEmployees={paginatedEmployees}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalPages={totalPages}
              rowsPerPageOptions={rowsPerPageOptions}
            />
          </div>

          {/* Filter Drawer for filtering employees */}
          <FilterDrawer
            isOpen={isFilterDrawerOpen}
            onClose={() => setIsFilterDrawerOpen(false)}
            onApply={handleFilterApply}
            mode="filter"
            isForBroker={true}
            organizations={['Acme Corporation', 'Globex Inc', 'TechStart', 'InnoSys', 'Quantum Motors']}
          />

          {/* Employee details modal - read-only version */}
          {selectedEmployee && (
            <BrokerEmployeeDetailsReadOnly
              employee={selectedEmployee}
              isOpen={showEmployeeDetails}
              onClose={() => setShowEmployeeDetails(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}