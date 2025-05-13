import { useState, useEffect } from 'react';
import { Search, Filter, Download, UserPlus, X, Menu } from 'lucide-react';
import SideNav from '../components/SideNav';
import FilterDrawer from '../components/FilterDrawer';
import { StatusBadge } from '../components/FilterDrawer';
import Logo from '../components/Logo';

const employees = [
  {
    id: 1,
    employmentStatus: 'Active',
    enrollmentStatus: 'Not Started',
    email: 'sarah.johnson@example.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    workState: 'California',
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
    }
  },
  {
    id: 2,
    employmentStatus: 'Active',
    enrollmentStatus: 'Completed',
    email: 'michael.chen@example.com',
    firstName: 'Michael',
    lastName: 'Chen',
    workState: 'New York',
    stipend: '$984.18',
    premium: '$850.00',
    enrollmentOpenDate: '02/21/2024',
    enrollmentCloseDate: '12/30/2024',
    coverageStartDate: '10/01/2025',
    emailOpened: 'Yes',
    phone: '(208) 993-3552'
  },
  {
    id: 3,
    employmentStatus: 'Active',
    enrollmentStatus: 'In Progress',
    email: 'emily.rodriguez@example.com',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    workState: 'Texas',
    stipend: '$700.09',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'Yes'
  },
  {
    id: 4,
    employmentStatus: 'Termed',
    enrollmentStatus: 'Not Started',
    email: 'david.kim@example.com',
    firstName: 'David',
    lastName: 'Kim',
    workState: 'Minnesota',
    stipend: '$413.95',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'No'
  },
  {
    id: 5,
    employmentStatus: 'Active',
    enrollmentStatus: 'Completed',
    email: 'rachel.patel@example.com',
    firstName: 'Rachel',
    lastName: 'Patel',
    workState: 'Florida',
    stipend: '$661.24',
    premium: '$600',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/20/2025',
    coverageStartDate: '03/01/2025',
    emailOpened: 'Yes'
  },
  {
    id: 6,
    employmentStatus: 'Active',
    enrollmentStatus: 'Not Started',
    email: 'james.wilson@example.com',
    firstName: 'James',
    lastName: 'Wilson',
    workState: 'Washington',
    stipend: '$541.12',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'No'
  },
  {
    id: 7,
    employmentStatus: 'Active',
    enrollmentStatus: 'Opted Out',
    email: 'sophia.martinez@example.com',
    firstName: 'Sophia',
    lastName: 'Martinez',
    workState: 'Illinois',
    stipend: '$725.00',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'Yes'
  },
  {
    id: 8,
    employmentStatus: 'Active',
    enrollmentStatus: 'In Progress',
    email: 'william.taylor@example.com',
    firstName: 'William',
    lastName: 'Taylor',
    workState: 'Arizona',
    stipend: '$550.00',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'Yes'
  },
  {
    id: 9,
    employmentStatus: 'Active',
    enrollmentStatus: 'Completed',
    email: 'olivia.brown@example.com',
    firstName: 'Olivia',
    lastName: 'Brown',
    workState: 'Oregon',
    stipend: '$675.00',
    premium: '$550.00',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'Yes'
  },
  {
    id: 10,
    employmentStatus: 'Active',
    enrollmentStatus: 'Attested',
    email: 'ethan.garcia@example.com',
    firstName: 'Ethan',
    lastName: 'Garcia',
    workState: 'Colorado',
    stipend: '$600.00',
    premium: 'N/A',
    enrollmentOpenDate: '01/30/2025',
    enrollmentCloseDate: '02/14/2025',
    coverageStartDate: '02/01/2025',
    emailOpened: 'Yes'
  }
];

export default function EmployerDashboard() {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [drawerMode, setDrawerMode] = useState('filter');
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState({
    enrollmentStatus: [],
    employmentStatus: [],
    emailOpened: 'All',
    dateRange: { startDate: '', endDate: '' },
    dateRangeType: 'custom',
    enrollmentDateRange: { openDate: '', closeDate: '' }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const rowsPerPageOptions = [10, 25, 50, 100];
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  
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
  
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setDrawerMode('employee');
    setIsFilterDrawerOpen(true);
  };

  const handleNewEmployee = () => {
    setSelectedEmployee(null);
    setDrawerMode('employee');
    setIsNewEmployee(true);
    setIsFilterDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsFilterDrawerOpen(false);
    if (drawerMode === 'employee') {
      setSelectedEmployee(null);
      setIsNewEmployee(false);
      setDrawerMode('filter');
    }
  };

  const handleFilterApply = (filters) => {
    // Ensure enrollmentStatus and employmentStatus are always arrays
    const updatedFilters = {
      ...filters,
      enrollmentStatus: Array.isArray(filters.enrollmentStatus) ? filters.enrollmentStatus : [],
      employmentStatus: Array.isArray(filters.employmentStatus) ? filters.employmentStatus : []
    };
    setAppliedFilters(updatedFilters);
    setIsFilterDrawerOpen(false);
  };

  const handleRemoveFilter = (filterType, value) => {
    if (Array.isArray(appliedFilters[filterType])) {
      setAppliedFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].filter(item => item !== value)
      }));
    } else if (filterType === 'emailOpened') {
      setAppliedFilters(prev => ({
        ...prev,
        emailOpened: 'All'
      }));
    } else if (filterType === 'dateRange') {
      setAppliedFilters(prev => ({
        ...prev,
        dateRange: { startDate: '', endDate: '' }
      }));
    } else if (filterType === 'enrollmentDateRange') {
      setAppliedFilters(prev => ({
        ...prev,
        enrollmentDateRange: { openDate: '', closeDate: '' }
      }));
    }
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
    
    if (appliedFilters.emailOpened && appliedFilters.emailOpened !== 'All') {
      activeFilters.push({
        type: 'emailOpened',
        value: appliedFilters.emailOpened,
        label: `Email Opened: ${appliedFilters.emailOpened}`
      });
    }
    
    if (appliedFilters.dateRangeType === 'custom' && 
        (appliedFilters.dateRange.startDate || appliedFilters.dateRange.endDate)) {
      let dateLabel = 'Coverage: ';
      if (appliedFilters.dateRange.startDate) {
        dateLabel += `From ${appliedFilters.dateRange.startDate}`;
      }
      if (appliedFilters.dateRange.endDate) {
        dateLabel += `${appliedFilters.dateRange.startDate ? ' to ' : 'Until '}${appliedFilters.dateRange.endDate}`;
      }
      activeFilters.push({
        type: 'dateRange',
        value: 'dateRange',
        label: dateLabel
      });
    }
    
    if (appliedFilters.dateRangeType === 'enrollment' && 
        (appliedFilters.enrollmentDateRange.openDate || appliedFilters.enrollmentDateRange.closeDate)) {
      let dateLabel = 'Enrollment: ';
      if (appliedFilters.enrollmentDateRange.openDate) {
        dateLabel += `From ${appliedFilters.enrollmentDateRange.openDate}`;
      }
      if (appliedFilters.enrollmentDateRange.closeDate) {
        dateLabel += `${appliedFilters.enrollmentDateRange.openDate ? ' to ' : 'Until '}${appliedFilters.enrollmentDateRange.closeDate}`;
      }
      activeFilters.push({
        type: 'enrollmentDateRange',
        value: 'enrollmentDateRange',
        label: dateLabel
      });
    }
    
    return activeFilters;
  };

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
            {/* SideNav component is now inside this container */}
            <SideNav role="employer" currentPath="/employer/dashboard" />
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Overview all your employees.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setDrawerMode('filter');
                    setIsFilterDrawerOpen(true);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button 
                  onClick={handleNewEmployee}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#46236D] rounded-lg hover:bg-[#351A52] flex items-center"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  New Employee
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="mb-4">
                <h2 className="text-base font-medium text-gray-900 p-4">
                  All employees <span className="text-sm font-normal text-gray-500 ml-1">{employees.length} employees</span>
                </h2>
              </div>
              
              {/* Active Filters */}
              {getActiveFilters().length > 0 && (
                <div className="px-4 pb-4 -mt-2">
                  <div className="flex flex-wrap gap-2">
                    {getActiveFilters().map((filter, index) => (
                      <div
                        key={`${filter.type}-${filter.value}-${index}`}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800"
                      >
                        <span className="truncate max-w-xs">{filter.label}</span>
                        <button
                          onClick={() => handleRemoveFilter(filter.type, filter.value)}
                          className="ml-2 flex-shrink-0 inline-flex text-purple-500 hover:text-purple-700 focus:outline-none"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {getActiveFilters().length > 1 && (
                      <button
                        onClick={() => setAppliedFilters({
                          enrollmentStatus: [],
                          employmentStatus: [],
                          emailOpened: 'All',
                          dateRange: { startDate: '', endDate: '' },
                          dateRangeType: 'custom',
                          enrollmentDateRange: { openDate: '', closeDate: '' }
                        })}
                        className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="relative overflow-auto">
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Status</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work State</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stipend</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Open Date</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Close Date</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage Start Date</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Opened?</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedEmployees.map((employee) => (
                        <tr 
                          key={employee.id} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => handleEmployeeClick(employee)}
                        >
                          <td className="px-3 py-4 whitespace-nowrap">
                            <StatusBadge status={employee.employmentStatus} />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <StatusBadge status={employee.enrollmentStatus} />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.firstName}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.lastName}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.workState}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.stipend}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.premium}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.enrollmentOpenDate}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.enrollmentCloseDate}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.coverageStartDate}</td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button 
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEmployeeClick(employee);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.emailOpened}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Rows per page:</label>
                      <select
                        value={rowsPerPage}
                        onChange={(e) => {
                          setRowsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                      >
                        {rowsPerPageOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <button className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Previous</button>
                    <button className="px-3 py-1 text-sm text-white bg-indigo-600 rounded">1</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">2</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">3</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">4</button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">5</button>
                    <span className="text-gray-500">...</span>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">67</button>
                    <button className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Drawers and modals - highest z-index */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={handleDrawerClose}
        onApply={handleFilterApply}
        mode={drawerMode}
        employeeData={isNewEmployee ? {} : selectedEmployee}
        isNewEmployee={isNewEmployee}
      />
    </div>
  );
}