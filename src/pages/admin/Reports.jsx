import { useState } from 'react';
import { Download, Search, Mail, Calendar, User, CheckCircle, X as XIcon } from 'lucide-react';
import PlatformAdminSideNav from '../../components/admin/PlatformAdminSideNav';

const employers = [
  'Alexandria Motor Company',
  'Airborne Athletics',
  'American Foods Dist',
  'Alivation Health',
  'Angels 4 Life',
  "Andy's Appliance",
  'Atlas Collections',
  'BooksPLUS LLC',
  'Brandon Business Machines',
  'Brocks Auto Service Center'
];

const employees = [
  {
    id: 1,
    name: 'Brandon Pehan',
    dob: '12/28/1994',
    status: 'active',
    enrollmentStatus: 'OptOut',
    employerOpenDate: '12/10/2024 11:00:00',
    employerCloseDate: '12/16/2024 04:59:00',
    specialOpenDate: '12/11/2024 14:00:00',
    specialCloseDate: '12/21/2024 05:59:59',
    lastEmailSent: 6,
    emailOpened: true
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    dob: '05/15/1988',
    status: 'active',
    enrollmentStatus: 'Completed',
    employerOpenDate: '12/10/2024 11:00:00',
    employerCloseDate: '12/16/2024 04:59:00',
    specialOpenDate: '12/11/2024 14:00:00',
    specialCloseDate: '12/21/2024 05:59:59',
    lastEmailSent: 4,
    emailOpened: true
  },
  {
    id: 3,
    name: 'Michael Chen',
    dob: '09/22/1992',
    status: 'active',
    enrollmentStatus: 'In Progress',
    employerOpenDate: '12/10/2024 11:00:00',
    employerCloseDate: '12/16/2024 04:59:00',
    specialOpenDate: '12/11/2024 14:00:00',
    specialCloseDate: '12/21/2024 05:59:59',
    lastEmailSent: 5,
    emailOpened: false
  }
];

export default function Reports() {
  const [selectedEmployer, setSelectedEmployer] = useState(employers[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);

  // Filter employers based on search query
  const filteredEmployers = employers.filter(
    employer => employer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks on results
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const handleEmployerSelect = (employer) => {
    setSelectedEmployer(employer);
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div className="flex h-screen">
      <PlatformAdminSideNav currentPath="/admin/email-campaigns" />
      <div className="flex-1 ml-[200px] p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Employee emails sent</h1>

          {/* Report Actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export all data
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
              2024 Employees
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
              EOY Report
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50">
              Donnas Magic Report
            </button>
          </div>

          {/* Employer Search */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Select an Employer:</h2>
            <div className="relative inline-block w-full md:w-[520px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search employers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              
              {/* Selected employer display */}
              {!searchQuery && !showResults && (
                <div className="mt-2 px-3 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-md">
                  <p className="text-sm font-medium">Current: {selectedEmployer}</p>
                </div>
              )}
              
              {/* Search results dropdown */}
              {showResults && filteredEmployers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {filteredEmployers.map((employer, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 ${
                        selectedEmployer === employer ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900'
                      }`}
                      onClick={() => handleEmployerSelect(employer)}
                    >
                      {employer}
                    </div>
                  ))}
                </div>
              )}
              
              {/* No results message */}
              {showResults && searchQuery && filteredEmployers.length === 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No employers found matching "{searchQuery}"
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Employees Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Employees</h2>
            
            <div className="space-y-8">
              {employees.map(employee => (
                <div 
                  key={employee.id}
                  className={`bg-white p-6 rounded-lg shadow-sm ${
                    selectedEmployee.id === employee.id ? 'border-2 border-indigo-500' : 'border border-gray-200'
                  }`}
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">Name: <span className="font-bold text-gray-900">{employee.name}</span></p>
                          <p className="text-sm text-gray-700">Dob: <span className="font-medium">{employee.dob}</span></p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 ml-7">
                        Employee Status: <span className={`font-medium ${employee.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                          {employee.status}
                        </span>
                      </p>
                      
                      <p className="text-sm text-gray-700 ml-7">
                        Employee Enrollment Status: <span className="font-medium">{employee.enrollmentStatus}</span>
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-700">Employer Open Date: <span className="font-medium">{employee.employerOpenDate}</span></p>
                          <p className="text-sm text-gray-700">Employer Close Date: <span className="font-medium">{employee.employerCloseDate}</span></p>
                          <p className="text-sm text-gray-700">Special Open Date: <span className="font-medium">{employee.specialOpenDate}</span></p>
                          <p className="text-sm text-gray-700">Special Close Date: <span className="font-medium">{employee.specialCloseDate}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                      <div>
                        <p className="text-sm text-gray-700">Last Email Sent: <span className="font-medium">{employee.lastEmailSent}</span></p>
                        <p className="text-sm text-gray-700">
                          Email Opened? 
                          <span className="ml-1 inline-flex items-center">
                            {employee.emailOpened ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                                <span className="font-medium text-green-600">True</span>
                              </>
                            ) : (
                              <>
                                <XIcon className="w-4 h-4 text-red-500 mr-1" />
                                <span className="font-medium text-red-600">False</span>
                              </>
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}