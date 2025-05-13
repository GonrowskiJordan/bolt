import { useState } from 'react';
import { Building2, Plus, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import PlatformAdminSideNav from '../components/admin/PlatformAdminSideNav';
import CreateEmployerDrawer from '../components/admin/CreateEmployerDrawer';
import CompanyDetailsDrawer from '../components/admin/CompanyDetailsDrawer';

// Sample company data with administrators and enrollment periods
const companiesData = [
  {
    id: 1,
    name: 'Airborne Athletics',
    activeEmployees: 53,
    enrolledEmployees: 'completed=33',
    totalLivesCovered: 58,
    totalMonthlyPremiums: '18,515',
    industry: 'Sports & Recreation',
    size: '51-200 employees',
    status: 'Active',
    taxId: '45-1234567',
    address: '123 Airport Way',
    city: 'Minneapolis',
    state: 'Minnesota',
    zipCode: '55401',
    phone: '(612) 555-1234',
    email: 'info@airborne-athletics.com',
    website: 'www.airborne-athletics.com',
    admins: [
      { firstName: 'John', lastName: 'Smith', email: 'john.smith@airborne-athletics.com', phone: '(612) 555-2345' },
      { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@airborne-athletics.com', phone: '(612) 555-3456' }
    ],
    enrollmentPeriods: [
      { name: 'Open Enrollment 2024', startDate: '2024-10-01', endDate: '2024-11-15', status: 'Scheduled' },
      { name: 'Special Enrollment', startDate: '2024-01-15', endDate: '2024-02-15', status: 'Completed' }
    ]
  },
  {
    id: 2,
    name: 'Alexandria Motor Company',
    activeEmployees: 14,
    enrolledEmployees: 'completed=12',
    totalLivesCovered: 14,
    totalMonthlyPremiums: '8,336',
    industry: 'Automotive',
    size: '11-50 employees',
    status: 'Active',
    taxId: '87-7654321',
    address: '456 Main Street',
    city: 'Alexandria',
    state: 'Virginia',
    zipCode: '22314',
    phone: '(703) 555-6789',
    email: 'info@alexmotorco.com',
    website: 'www.alexandriamotorcompany.com',
    admins: [
      { firstName: 'Michael', lastName: 'Williams', email: 'michael.w@alexmotorco.com', phone: '(703) 555-7890' },
      { firstName: 'Jennifer', lastName: 'Davis', email: 'jennifer.d@alexmotorco.com', phone: '(703) 555-8901' }
    ],
    enrollmentPeriods: [
      { name: 'Annual Enrollment 2024', startDate: '2023-11-01', endDate: '2023-12-15', status: 'Completed' },
      { name: 'New Hire Enrollment Q1', startDate: '2024-01-01', endDate: '2024-03-31', status: 'Active' }
    ]
  },
  {
    id: 3,
    name: 'Alivation Health',
    activeEmployees: 51,
    enrolledEmployees: 'completed=26',
    totalLivesCovered: 32,
    totalMonthlyPremiums: '17,516',
    industry: 'Healthcare',
    size: '51-200 employees',
    status: 'Active',
    taxId: '23-4567890',
    address: '789 Health Blvd',
    city: 'Lincoln',
    state: 'Nebraska',
    zipCode: '68502',
    phone: '(402) 555-5678',
    email: 'admin@alivationhealth.org',
    website: 'www.alivationhealth.org',
    admins: [
      { firstName: 'Robert', lastName: 'Miller', email: 'robert.m@alivationhealth.org', phone: '(402) 555-6789' },
      { firstName: 'Elizabeth', lastName: 'Wilson', email: 'elizabeth.w@alivationhealth.org', phone: '(402) 555-7890' }
    ],
    enrollmentPeriods: [
      { name: 'Open Enrollment 2024', startDate: '2023-11-15', endDate: '2023-12-31', status: 'Completed' },
      { name: 'Mid-Year Enrollment', startDate: '2024-06-01', endDate: '2024-06-30', status: 'Scheduled' }
    ]
  },
  {
    id: 4,
    name: 'American Foods Dist',
    activeEmployees: 37,
    enrolledEmployees: 'completed=15',
    totalLivesCovered: 19,
    totalMonthlyPremiums: '4,048',
    industry: 'Food & Beverage',
    size: '11-50 employees',
    status: 'Active',
    taxId: '34-5678901',
    address: '101 Distribution Ln',
    city: 'Omaha',
    state: 'Nebraska',
    zipCode: '68102',
    phone: '(402) 555-1234',
    email: 'info@americanfoodsdist.com',
    website: 'www.americanfoodsdist.com',
    admins: [
      { firstName: 'Richard', lastName: 'Taylor', email: 'richard.t@americanfoodsdist.com', phone: '(402) 555-2345' },
      { firstName: 'Patricia', lastName: 'Brown', email: 'patricia.b@americanfoodsdist.com', phone: '(402) 555-3456' }
    ],
    enrollmentPeriods: [
      { name: 'Annual Enrollment', startDate: '2023-12-01', endDate: '2023-12-31', status: 'Completed' },
      { name: 'Q3 Special Enrollment', startDate: '2024-07-01', endDate: '2024-07-15', status: 'Scheduled' }
    ]
  }
];

// Additional sample data for more rows
const additionalCompaniesData = [
  {
    id: 5,
    name: "Anderson Preparatory Academy",
    activeEmployees: 105,
    enrolledEmployees: "completed=58",
    totalLivesCovered: 88,
    totalMonthlyPremiums: "39,102"
  },
  {
    id: 6,
    name: "Andy's Appliance (SBFA)",
    activeEmployees: 25,
    enrolledEmployees: "attested=4 completed=19",
    totalLivesCovered: 70,
    totalMonthlyPremiums: "15,442"
  },
  {
    id: 7,
    name: "Angels 4 Life",
    activeEmployees: 0,
    enrolledEmployees: "",
    totalLivesCovered: 0,
    totalMonthlyPremiums: "0"
  },
  {
    id: 8,
    name: "Atlas Collections",
    activeEmployees: 10,
    enrolledEmployees: "completed=4",
    totalLivesCovered: 7,
    totalMonthlyPremiums: "4,120"
  },
  {
    id: 9,
    name: "BooksPLUS LLC",
    activeEmployees: 6,
    enrolledEmployees: "completed=3",
    totalLivesCovered: 8,
    totalMonthlyPremiums: "3,513"
  },
  {
    id: 10,
    name: "Brandon Business Machines",
    activeEmployees: 6,
    enrolledEmployees: "completed=4",
    totalLivesCovered: 5,
    totalMonthlyPremiums: "1,170"
  },
  {
    id: 11,
    name: "Brocks Auto Service Center",
    activeEmployees: 8,
    enrolledEmployees: "completed=4",
    totalLivesCovered: 8,
    totalMonthlyPremiums: "1,380"
  },
  {
    id: 12,
    name: "Chasse Building Team, Inc.",
    activeEmployees: 1,
    enrolledEmployees: "",
    totalLivesCovered: 0,
    totalMonthlyPremiums: "0"
  },
  {
    id: 13,
    name: "Christian Chapel Assembly of God Church",
    activeEmployees: 2,
    enrolledEmployees: "completed=2",
    totalLivesCovered: 2,
    totalMonthlyPremiums: "1,638"
  },
  {
    id: 14,
    name: "CN Brown Company",
    activeEmployees: 48,
    enrolledEmployees: "attested=2 completed=28",
    totalLivesCovered: 53,
    totalMonthlyPremiums: "31,268"
  },
  {
    id: 15,
    name: "CoApp LLC",
    activeEmployees: 3,
    enrolledEmployees: "completed=2",
    totalLivesCovered: 2,
    totalMonthlyPremiums: "874"
  }
];

// Combine the detailed data with the simple data
const allCompanies = [...companiesData, ...additionalCompaniesData];

export default function AdminDashboard() {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const handleOpenCreateDrawer = () => {
    setIsCreateDrawerOpen(true);
  };

  const handleCloseCreateDrawer = () => {
    setIsCreateDrawerOpen(false);
  };

  const handleRowClick = (company) => {
    setSelectedCompany(company);
    setIsDetailsDrawerOpen(true);
  };

  const handleCloseDetailsDrawer = () => {
    setIsDetailsDrawerOpen(false);
    setSelectedCompany(null);
  };

  const handleCreateSubmit = (formData) => {
    console.log('New employer data:', formData);
    // In a real app, you would send this data to your API
  };

  const handleSaveCompanyDetails = (updatedCompany) => {
    console.log('Updated company data:', updatedCompany);
    // In a real app, you would send this data to your API and update the local data
  };

  // Search function
  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchTerm('');
    setCurrentPage(1); // Reset to first page when clearing search
  };

  // Filter companies based on search term (not query)
  const filteredCompanies = allCompanies.filter(company => 
    searchTerm === '' || company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalCompanies = filteredCompanies.length;
  const totalPages = Math.ceil(totalCompanies / rowsPerPage);
  
  // Get current page data
  const indexOfLastCompany = currentPage * rowsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - rowsPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);
  
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
      <PlatformAdminSideNav currentPath="/admin/dashboard" />
      <div className="flex-1 ml-[200px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleOpenCreateDrawer}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Employer
          </button>
        </div>
        
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <div className="py-1">
            <div className="text-sm">Number of active companies: 126</div>
          </div>
          <div className="py-1">
            <div className="text-sm">Number of active employees: 2,240</div>
          </div>
          <div className="py-1">
            <div className="text-sm">Number of enrolled employees: attested=153 completed=1064</div>
          </div>
          <div className="py-1">
            <div className="text-sm">Total lives covered: 2,278</div>
          </div>
          <div className="py-1">
            <div className="text-sm">Total monthly premiums: ¤1,087,484</div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Employers</h2>

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
                  placeholder="Search employers..."
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
                    Company Name
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Active Employees
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Enrolled Employees
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Lives Covered
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total Monthly Premiums
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCompanies.map((company) => (
                  <tr 
                    key={company.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(company)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.activeEmployees}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.enrolledEmployees}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.totalLivesCovered}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">¤{company.totalMonthlyPremiums}</td>
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
                Showing <span className="font-medium">{indexOfFirstCompany + 1}</span> to <span className="font-medium">{Math.min(indexOfLastCompany, totalCompanies)}</span> of <span className="font-medium">{totalCompanies}</span> results
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

        {/* Create Employer Drawer */}
        <CreateEmployerDrawer 
          isOpen={isCreateDrawerOpen} 
          onClose={handleCloseCreateDrawer} 
          onSubmit={handleCreateSubmit} 
        />

        {/* Company Details Drawer */}
        <CompanyDetailsDrawer
          company={selectedCompany}
          isOpen={isDetailsDrawerOpen}
          onClose={handleCloseDetailsDrawer}
          onSave={handleSaveCompanyDetails}
        />
      </div>
    </div>
  );
}