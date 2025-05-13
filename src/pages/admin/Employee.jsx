import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import PlatformAdminSideNav from '../../components/admin/PlatformAdminSideNav';
import EmployeeDetailsDrawer from '../../components/admin/EmployeeDetailsDrawer';

// Sample employee data
const employeesData = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    employer: 'Acme Corporation',
    status: 'Active',
    enrollmentStatus: 'Completed',
    dateHired: '2020-05-15',
    phone: '(555) 123-4567',
    stipend: '$450.00',
    premium: '$375.50'
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@example.com',
    employer: 'Globex Inc',
    status: 'Active',
    enrollmentStatus: 'In Progress',
    dateHired: '2021-03-10',
    phone: '(555) 234-5678',
    stipend: '$450.00',
    premium: 'N/A'
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@example.com',
    employer: 'TechStart',
    status: 'Active',
    enrollmentStatus: 'Not Started',
    dateHired: '2022-01-05',
    phone: '(555) 345-6789',
    stipend: '$400.00',
    premium: 'N/A'
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@example.com',
    employer: 'InnoSys',
    status: 'Termed',
    enrollmentStatus: 'N/A',
    dateHired: '2019-11-20',
    phone: '(555) 456-7890',
    stipend: '$0.00',
    premium: 'N/A'
  },
  {
    id: 5,
    firstName: 'Rachel',
    lastName: 'Patel',
    email: 'rachel.patel@example.com',
    employer: 'Quantum Motors',
    status: 'Active',
    enrollmentStatus: 'Completed',
    dateHired: '2020-09-15',
    phone: '(555) 567-8901',
    stipend: '$500.00',
    premium: '$425.75'
  },
  {
    id: 6,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@example.com',
    employer: 'Alexandria Motor Company',
    status: 'Active',
    enrollmentStatus: 'Completed',
    dateHired: '2021-06-10',
    phone: '(555) 678-9012',
    stipend: '$450.00',
    premium: '$380.25'
  },
  {
    id: 7,
    firstName: 'Sophia',
    lastName: 'Martinez',
    email: 'sophia.martinez@example.com',
    employer: 'Alivation Health',
    status: 'Active',
    enrollmentStatus: 'Opted Out',
    dateHired: '2022-02-01',
    phone: '(555) 789-0123',
    stipend: '$425.00',
    premium: 'N/A'
  },
  {
    id: 8,
    firstName: 'William',
    lastName: 'Taylor',
    email: 'william.taylor@example.com',
    employer: 'American Foods Dist',
    status: 'Active',
    enrollmentStatus: 'In Progress',
    dateHired: '2021-11-08',
    phone: '(555) 890-1234',
    stipend: '$400.00',
    premium: 'N/A'
  },
  {
    id: 9,
    firstName: 'Olivia',
    lastName: 'Brown',
    email: 'olivia.brown@example.com',
    employer: 'Anderson Preparatory Academy',
    status: 'Active',
    enrollmentStatus: 'Completed',
    dateHired: '2020-07-22',
    phone: '(555) 901-2345',
    stipend: '$475.00',
    premium: '$410.50'
  },
  {
    id: 10,
    firstName: 'Ethan',
    lastName: 'Garcia',
    email: 'ethan.garcia@example.com',
    employer: "Andy's Appliance",
    status: 'Active',
    enrollmentStatus: 'Attested',
    dateHired: '2022-03-15',
    phone: '(555) 012-3456',
    stipend: '$450.00',
    premium: 'N/A'
  },
  {
    id: 11,
    firstName: 'Isabella',
    lastName: 'Lopez',
    email: 'isabella.lopez@example.com',
    employer: 'Angels 4 Life',
    status: 'Active',
    enrollmentStatus: 'Completed',
    dateHired: '2021-04-12',
    phone: '(555) 123-4567',
    stipend: '$425.00',
    premium: '$375.00'
  },
  {
    id: 12,
    firstName: 'Alexander',
    lastName: 'Lee',
    email: 'alexander.lee@example.com',
    employer: 'Atlas Collections',
    status: 'Active',
    enrollmentStatus: 'In Progress',
    dateHired: '2021-10-18',
    phone: '(555) 234-5678',
    stipend: '$400.00',
    premium: 'N/A'
  },
  {
    id: 13,
    firstName: 'Mia',
    lastName: 'Nguyen',
    email: 'mia.nguyen@example.com',
    employer: 'BooksPLUS LLC',
    status: 'Active',
    enrollmentStatus: 'Completed',
    dateHired: '2020-12-05',
    phone: '(555) 345-6789',
    stipend: '$450.00',
    premium: '$395.25'
  },
  {
    id: 14,
    firstName: 'Benjamin',
    lastName: 'Thompson',
    email: 'benjamin.thompson@example.com',
    employer: 'Brandon Business Machines',
    status: 'Termed',
    enrollmentStatus: 'N/A',
    dateHired: '2019-08-30',
    phone: '(555) 456-7890',
    stipend: '$0.00',
    premium: 'N/A'
  },
  {
    id: 15,
    firstName: 'Charlotte',
    lastName: 'Davis',
    email: 'charlotte.davis@example.com',
    employer: 'Brocks Auto Service Center',
    status: 'Active',
    enrollmentStatus: 'Not Started',
    dateHired: '2022-01-20',
    phone: '(555) 567-8901',
    stipend: '$425.00',
    premium: 'N/A'
  }
];

// Add additional employee data to match the detail view example
const enhancedEmployeesData = employeesData.map(employee => {
  if (employee.id === 1) {
    return {
      ...employee,
      middleName: '',
      employeeId: '62386703-bb8e-42c1-a9da-3e70e382cd2d',
      dateOfBirth: '1987-08-21',
      biologicalGender: 'male',
      emailAddress: 'sarah.johnson@example.com',
      address: '8160 E 250th',
      zipCode: '55020',
      phoneNumber: '(612) 532-6319',
      tobaccoUser: false,
      brandUnit: '',
      storeNumber: '',
      homeAddress2: '',
      county: '',
      homeCity: 'Elko',
      averageHoursPerWeek: 40,
      hourlyRate: 22.50,
      annualWages: 46800,
      payType: 'Hourly',
      jobTitle: 'Customer Service Representative',
      employeeRef: 'Air9550',
      employeeClass: '',
      worksiteIdentifier: '',
      worksiteAddress: '',
      relationship: 'Self'
    };
  }
  return employee;
});

export default function Employee() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Employee details drawer state
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  
  // Employee data state
  const [employees, setEmployees] = useState(enhancedEmployeesData);
  
  // Search function
  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1);
  };
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    searchTerm === '' ||
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalEmployees = filteredEmployees.length;
  const totalPages = Math.ceil(totalEmployees / rowsPerPage);
  
  // Get current page data
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Handle employee row click
  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsDrawerOpen(true);
  };

  // Handle details drawer close
  const handleCloseDetailsDrawer = () => {
    setIsDetailsDrawerOpen(false);
    setSelectedEmployee(null);
  };

  // Handle save employee details
  const handleSaveEmployeeDetails = (updatedEmployee) => {
    console.log('Updated employee data:', updatedEmployee);
    // In a real app, you would send this data to your API
    
    // Update the local state
    setEmployees(employees.map(employee => 
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    ));
  };
  
  // Handle delete employee
  const handleDeleteEmployee = (employeeId) => {
    console.log('Deleting employee with ID:', employeeId);
    
    // Filter out the deleted employee
    setEmployees(employees.filter(employee => employee.id !== employeeId));
    
    // Close the drawer
    handleCloseDetailsDrawer();
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If there are less than maxPagesToShow pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate start and end of current window
      let startPage, endPage;
      if (currentPage <= 3) {
        startPage = 2;
        endPage = 4;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
      
      // Add ellipsis after first page if necessary
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if necessary
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      // Always include last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex h-screen">
      <PlatformAdminSideNav currentPath="/admin/employee" />
      <div className="flex-1 ml-[200px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add New Employee
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex">
              <div className="relative w-64 mr-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={handleSearch}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Search
              </button>
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employee Name
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employer
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Enrollment
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date Hired
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stipend
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentEmployees.map((employee) => (
                  <tr 
                    key={employee.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.employer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.enrollmentStatus === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        employee.enrollmentStatus === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        employee.enrollmentStatus === 'Not Started' ? 'bg-gray-100 text-gray-800' :
                        employee.enrollmentStatus === 'Opted Out' ? 'bg-orange-100 text-orange-800' :
                        employee.enrollmentStatus === 'Attested' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {employee.enrollmentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(employee.dateHired).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.stipend}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Controls */}
          <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex items-center">
              <label htmlFor="rows-per-page" className="mr-2 text-sm text-gray-600">
                Rows per page:
              </label>
              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="border border-gray-300 rounded-md text-sm p-1"
              >
                {[10, 25, 50, 100].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              
              <span className="ml-4 text-sm text-gray-500">
                Showing <span className="font-medium">{indexOfFirstEmployee + 1}</span> to <span className="font-medium">{Math.min(indexOfLastEmployee, totalEmployees)}</span> of <span className="font-medium">{totalEmployees}</span> results
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              {getPageNumbers().map((pageNumber, index) => (
                pageNumber === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-1 text-sm">...</span>
                ) : (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      currentPage === pageNumber
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              ))}
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Employee Details Drawer */}
        <EmployeeDetailsDrawer
          employee={selectedEmployee}
          isOpen={isDetailsDrawerOpen}
          onClose={handleCloseDetailsDrawer}
          onSave={handleSaveEmployeeDetails}
          onDelete={handleDeleteEmployee}
        />
      </div>
    </div>
  );
}