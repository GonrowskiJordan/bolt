import { useState } from 'react';
import { BadgeHelp, Search, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react';
import PlatformAdminSideNav from '../../components/admin/PlatformAdminSideNav';
import AdvisorDetailsDrawer from '../../components/advisor/AdvisorDetailsDrawer';

// Sample advisor data
const advisorsData = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@savii.com',
    phone: '(612) 555-0123',
    calendlyLink: 'calendly.com/sarah-johnson-benefits'
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@savii.com',
    phone: '(612) 555-0124',
    calendlyLink: 'calendly.com/michael-chen-advisor'
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@savii.com',
    phone: '(612) 555-0125',
    calendlyLink: 'calendly.com/emily-rodriguez/benefits'
  },
  {
    id: 4,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@savii.com',
    phone: '(612) 555-0126',
    calendlyLink: 'calendly.com/james-wilson-savii'
  },
  {
    id: 5,
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'jennifer.taylor@savii.com',
    phone: '(612) 555-0127',
    calendlyLink: 'calendly.com/jennifer-taylor'
  },
  {
    id: 6,
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert.martinez@savii.com',
    phone: '(612) 555-0128',
    calendlyLink: 'calendly.com/robert-martinez/consult'
  },
  {
    id: 7,
    firstName: 'Olivia',
    lastName: 'Anderson',
    email: 'olivia.anderson@savii.com',
    phone: '(612) 555-0129',
    calendlyLink: 'calendly.com/olivia-anderson-benefits'
  },
  {
    id: 8,
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@savii.com',
    phone: '(612) 555-0130',
    calendlyLink: 'calendly.com/david-thompson/meeting'
  },
  {
    id: 9,
    firstName: 'Jessica',
    lastName: 'Garcia',
    email: 'jessica.garcia@savii.com',
    phone: '(612) 555-0131',
    calendlyLink: 'calendly.com/jessica-garcia-advisor'
  },
  {
    id: 10,
    firstName: 'William',
    lastName: 'Brown',
    email: 'william.brown@savii.com',
    phone: '(612) 555-0132',
    calendlyLink: 'calendly.com/william-brown/30min'
  },
];

export default function AdvisorBlankView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Drawer state
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // State for advisors data
  const [advisors, setAdvisors] = useState(advisorsData);

  // Search function
  const handleSearch = () => {
    setSearchTerm(searchQuery);
    setCurrentPage(1);
  };
  
  // Filter advisors based on search term
  const filteredAdvisors = advisors.filter(advisor => 
    searchTerm === '' ||
    advisor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.calendlyLink.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Calculate pagination
  const totalAdvisors = filteredAdvisors.length;
  const totalPages = Math.ceil(totalAdvisors / rowsPerPage);
  
  // Get current page data
  const indexOfLastAdvisor = currentPage * rowsPerPage;
  const indexOfFirstAdvisor = indexOfLastAdvisor - rowsPerPage;
  const currentAdvisors = filteredAdvisors.slice(indexOfFirstAdvisor, indexOfLastAdvisor);
  
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

  // Handle row click to open drawer
  const handleRowClick = (advisor) => {
    setSelectedAdvisor(advisor);
    setIsDrawerOpen(true);
  };

  // Handle save from drawer
  const handleSaveAdvisor = (updatedAdvisor) => {
    // In a real app, you would update this in your database
    console.log('Updated advisor:', updatedAdvisor);
    
    // For demo, update the local state
    setAdvisors(prev => 
      prev.map(advisor => 
        advisor.id === updatedAdvisor.id ? updatedAdvisor : advisor
      )
    );
  };

  // Handle delete from drawer
  const handleDeleteAdvisor = (advisorId) => {
    console.log('Deleting advisor with ID:', advisorId);
    
    // Filter out the deleted advisor
    setAdvisors(prev => prev.filter(advisor => advisor.id !== advisorId));
    
    // Close the drawer
    setIsDrawerOpen(false);
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
      <PlatformAdminSideNav currentPath="/advisor/dashboard" />
      <div className="flex-1 ml-[200px] p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Advisors</h1>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <BadgeHelp className="w-5 h-5 mr-2" />
            Add New Advisor
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
                  placeholder="Search advisors"
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
                    Name
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
                    Phone
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Calendly Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentAdvisors.map((advisor) => (
                  <tr 
                    key={advisor.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(advisor)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                          {advisor.firstName.charAt(0)}{advisor.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{advisor.firstName} {advisor.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{advisor.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{advisor.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                      <a href="#" className="hover:underline">{advisor.calendlyLink}</a>
                    </td>
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
                Showing <span className="font-medium">{indexOfFirstAdvisor + 1}</span> to <span className="font-medium">{Math.min(indexOfLastAdvisor, totalAdvisors)}</span> of <span className="font-medium">{totalAdvisors}</span> results
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

        {/* Advisor Details Drawer */}
        <AdvisorDetailsDrawer
          advisor={selectedAdvisor}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onSave={handleSaveAdvisor}
          onDelete={handleDeleteAdvisor}
        />
      </div>
    </div>
  );
}