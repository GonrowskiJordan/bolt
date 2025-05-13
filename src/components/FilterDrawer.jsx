import { useState, useEffect } from 'react';
import { X, Filter, ChevronDown, ChevronUp, Calendar, Check } from 'lucide-react';

// Status badge component
export const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';

  if (status === 'Active') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
  } else if (status === 'Termed') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  } else if (status === 'Completed' || status === 'Enrolled') {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-800';
  } else if (status === 'In Progress') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
  } else if (status === 'Opted Out') {
    bgColor = 'bg-orange-100';
    textColor = 'text-orange-800';
  } else if (status === 'Not Started') {
    bgColor = 'bg-gray-100';
    textColor = 'text-gray-800';
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status}
    </span>
  );
};

export default function FilterDrawer({ isOpen, onClose, onApply, mode = 'filter', employeeData = {}, isNewEmployee = false, isForBroker = false, organizations = [] }) {
  // State for filter settings
  const [enrollmentStatus, setEnrollmentStatus] = useState([]);
  const [employmentStatus, setEmploymentStatus] = useState([]);
  const [emailOpened, setEmailOpened] = useState('All');
  const [dateRangeType, setDateRangeType] = useState('custom'); // 'custom' or 'enrollment'
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [enrollmentDateRange, setEnrollmentDateRange] = useState({ openDate: '', closeDate: '' });
  const [selectedOrganizations, setSelectedOrganizations] = useState([]);

  // State for employee edit/create mode
  const [employeeFormData, setEmployeeFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    employmentStatus: 'Active',
    enrollmentStatus: 'Not Started',
    workState: '',
    emailOpened: 'No',
    stipend: '',
    premium: 'N/A',
    enrollmentOpenDate: '',
    enrollmentCloseDate: '',
    coverageStartDate: '',
    organization: isForBroker ? '' : undefined
  });

  // State for collapsible sections
  const [sectionsOpen, setSectionsOpen] = useState({
    status: true,
    email: true,
    dates: true,
    organization: true
  });

  // Reset filters on open if in filter mode
  useEffect(() => {
    if (isOpen && mode === 'filter') {
      // Don't reset filters when reopening
    }
  }, [isOpen, mode]);

  // Load employee data when editing
  useEffect(() => {
    if (mode === 'employee' && !isNewEmployee && employeeData && Object.keys(employeeData).length > 0) {
      setEmployeeFormData({
        firstName: employeeData.firstName || '',
        lastName: employeeData.lastName || '',
        email: employeeData.email || '',
        employmentStatus: employeeData.employmentStatus || 'Active',
        enrollmentStatus: employeeData.enrollmentStatus || 'Not Started',
        workState: employeeData.workState || '',
        emailOpened: employeeData.emailOpened || 'No',
        stipend: employeeData.stipend || '',
        premium: employeeData.premium || 'N/A',
        enrollmentOpenDate: employeeData.enrollmentOpenDate || '',
        enrollmentCloseDate: employeeData.enrollmentCloseDate || '',
        coverageStartDate: employeeData.coverageStartDate || '',
        organization: isForBroker ? (employeeData.organization || '') : undefined
      });
    } else if (mode === 'employee' && isNewEmployee) {
      // Reset form for new employee
      setEmployeeFormData({
        firstName: '',
        lastName: '',
        email: '',
        employmentStatus: 'Active',
        enrollmentStatus: 'Not Started',
        workState: '',
        emailOpened: 'No',
        stipend: '',
        premium: 'N/A',
        enrollmentOpenDate: '',
        enrollmentCloseDate: '',
        coverageStartDate: '',
        organization: isForBroker ? '' : undefined
      });
    }
  }, [mode, isNewEmployee, employeeData, isForBroker]);

  const toggleSection = (section) => {
    setSectionsOpen({
      ...sectionsOpen,
      [section]: !sectionsOpen[section]
    });
  };

  const handleEnrollmentStatusChange = (status) => {
    if (enrollmentStatus.includes(status)) {
      setEnrollmentStatus(enrollmentStatus.filter(s => s !== status));
    } else {
      setEnrollmentStatus([...enrollmentStatus, status]);
    }
  };

  const handleEmploymentStatusChange = (status) => {
    if (employmentStatus.includes(status)) {
      setEmploymentStatus(employmentStatus.filter(s => s !== status));
    } else {
      setEmploymentStatus([...employmentStatus, status]);
    }
  };

  const handleOrganizationChange = (org) => {
    if (selectedOrganizations.includes(org)) {
      setSelectedOrganizations(selectedOrganizations.filter(o => o !== org));
    } else {
      setSelectedOrganizations([...selectedOrganizations, org]);
    }
  };

  const handleApplyFilters = () => {
    onApply({
      enrollmentStatus,
      employmentStatus,
      emailOpened,
      dateRangeType,
      dateRange,
      enrollmentDateRange,
      organization: selectedOrganizations
    });
  };

  const handleApplyEmployeeChanges = () => {
    onApply(employeeFormData);
  };

  const handleEmployeeFormChange = (field, value) => {
    setEmployeeFormData({
      ...employeeFormData,
      [field]: value
    });
  };

  // Handle mounting/unmounting animation
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      setTimeout(() => {
        setMounted(false);
      }, 300);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 overflow-hidden z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gray-500 transition-all duration-300 ${
            isOpen ? 'opacity-75' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            className={`relative w-screen max-w-md transform transition-all duration-300 ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {mode === 'filter' && (
                      <>
                        <Filter className="w-5 h-5 inline-block mr-2 align-text-bottom" />
                        Filters
                      </>
                    )}
                    {mode === 'employee' && (
                      isNewEmployee ? 'Add Employee' : 'Edit Employee'
                    )}
                  </h2>
                  {mode === 'filter' && (
                    <p className="text-sm text-gray-500">
                      Filter employees by status, dates, and more
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {mode === 'filter' && (
                  <div className="space-y-6">
                    {/* Status Filters */}
                    <div className="border-b border-gray-200 pb-6">
                      <button
                        className="flex w-full items-center justify-between text-sm font-medium text-gray-900 mb-2"
                        onClick={() => toggleSection('status')}
                      >
                        Status Filters
                        {sectionsOpen.status ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {sectionsOpen.status && (
                        <div className="mt-4">
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Enrollment Status</h3>
                            <div className="grid grid-cols-2 gap-2">
                              {['Completed', 'In Progress', 'Not Started', 'Opted Out'].map((status) => (
                                <label key={status} className="inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                    checked={enrollmentStatus.includes(status)}
                                    onChange={() => handleEnrollmentStatusChange(status)}
                                  />
                                  <span className="ml-2 text-sm text-gray-700">{status}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Employment Status</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-indigo-600"
                                  checked={employmentStatus.includes('Active')}
                                  onChange={() => handleEmploymentStatusChange('Active')}
                                />
                                <span className="ml-2 text-sm text-gray-700">Active</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="form-checkbox h-4 w-4 text-indigo-600"
                                  checked={employmentStatus.includes('Termed')}
                                  onChange={() => handleEmploymentStatusChange('Termed')}
                                />
                                <span className="ml-2 text-sm text-gray-700">Termed</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Email Filters */}
                    <div className="border-b border-gray-200 pb-6">
                      <button
                        className="flex w-full items-center justify-between text-sm font-medium text-gray-900 mb-2"
                        onClick={() => toggleSection('email')}
                      >
                        Email Filters
                        {sectionsOpen.email ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {sectionsOpen.email && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">Email Opened</h3>
                          <div className="space-y-2">
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio h-4 w-4 text-indigo-600"
                                checked={emailOpened === 'All'}
                                onChange={() => setEmailOpened('All')}
                              />
                              <span className="ml-2 text-sm text-gray-700">All</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio h-4 w-4 text-indigo-600"
                                checked={emailOpened === 'Yes'}
                                onChange={() => setEmailOpened('Yes')}
                              />
                              <span className="ml-2 text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                              <input
                                type="radio"
                                className="form-radio h-4 w-4 text-indigo-600"
                                checked={emailOpened === 'No'}
                                onChange={() => setEmailOpened('No')}
                              />
                              <span className="ml-2 text-sm text-gray-700">No</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Date Filters */}
                    <div className="border-b border-gray-200 pb-6">
                      <button
                        className="flex w-full items-center justify-between text-sm font-medium text-gray-900 mb-2"
                        onClick={() => toggleSection('dates')}
                      >
                        Date Filters
                        {sectionsOpen.dates ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      
                      {sectionsOpen.dates && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Date Type</h3>
                            <div className="space-y-2">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio h-4 w-4 text-indigo-600"
                                  checked={dateRangeType === 'custom'}
                                  onChange={() => setDateRangeType('custom')}
                                />
                                <span className="ml-2 text-sm text-gray-700">Coverage Dates</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio h-4 w-4 text-indigo-600"
                                  checked={dateRangeType === 'enrollment'}
                                  onChange={() => setDateRangeType('enrollment')}
                                />
                                <span className="ml-2 text-sm text-gray-700">Enrollment Dates</span>
                              </label>
                            </div>
                          </div>
                          
                          {dateRangeType === 'custom' && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Coverage Date Range</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="start-date" className="block text-xs text-gray-500 mb-1">Start Date</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                      type="date"
                                      id="start-date"
                                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                                      value={dateRange.startDate}
                                      onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="end-date" className="block text-xs text-gray-500 mb-1">End Date</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                      type="date"
                                      id="end-date"
                                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                                      value={dateRange.endDate}
                                      onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {dateRangeType === 'enrollment' && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Enrollment Date Range</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="enrollment-open-date" className="block text-xs text-gray-500 mb-1">Open Date</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                      type="date"
                                      id="enrollment-open-date"
                                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                                      value={enrollmentDateRange.openDate}
                                      onChange={(e) => setEnrollmentDateRange({ ...enrollmentDateRange, openDate: e.target.value })}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label htmlFor="enrollment-close-date" className="block text-xs text-gray-500 mb-1">Close Date</label>
                                  <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                      <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                      type="date"
                                      id="enrollment-close-date"
                                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                                      value={enrollmentDateRange.closeDate}
                                      onChange={(e) => setEnrollmentDateRange({ ...enrollmentDateRange, closeDate: e.target.value })}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Organization Filters - Only for broker view */}
                    {isForBroker && (
                      <div className="border-b border-gray-200 pb-6">
                        <button
                          className="flex w-full items-center justify-between text-sm font-medium text-gray-900 mb-2"
                          onClick={() => toggleSection('organization')}
                        >
                          Organization Filters
                          {sectionsOpen.organization ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        
                        {sectionsOpen.organization && (
                          <div className="mt-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Select Organizations</h3>
                            <div className="space-y-2">
                              {organizations.map((org) => (
                                <label key={org} className="inline-flex items-center">
                                  <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                    checked={selectedOrganizations.includes(org)}
                                    onChange={() => handleOrganizationChange(org)}
                                  />
                                  <span className="ml-2 text-sm text-gray-700">{org}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyFilters}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'employee' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">Basic Information</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="first-name" className="block text-sm text-gray-700 mb-1">
                              First Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="first-name"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              value={employeeFormData.firstName}
                              onChange={(e) => handleEmployeeFormChange('firstName', e.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="last-name" className="block text-sm text-gray-700 mb-1">
                              Last Name<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="last-name"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              value={employeeFormData.lastName}
                              onChange={(e) => handleEmployeeFormChange('lastName', e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                            Email<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.email}
                            onChange={(e) => handleEmployeeFormChange('email', e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="work-state" className="block text-sm text-gray-700 mb-1">
                            Work State<span className="text-red-500">*</span>
                          </label>
                          <select
                            id="work-state"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.workState}
                            onChange={(e) => handleEmployeeFormChange('workState', e.target.value)}
                            required
                          >
                            <option value="">Select a state</option>
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Maryland">Maryland</option>
                            <option value="Massachusetts">Massachusetts</option>
                            <option value="Michigan">Michigan</option>
                            <option value="Minnesota">Minnesota</option>
                            <option value="Mississippi">Mississippi</option>
                            <option value="Missouri">Missouri</option>
                            <option value="Montana">Montana</option>
                            <option value="Nebraska">Nebraska</option>
                            <option value="Nevada">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New York">New York</option>
                            <option value="North Carolina">North Carolina</option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Ohio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Only show organization field for broker view */}
                    {isForBroker && (
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="organization" className="block text-sm text-gray-700 mb-1">
                            Organization<span className="text-red-500">*</span>
                          </label>
                          <select
                            id="organization"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.organization}
                            onChange={(e) => handleEmployeeFormChange('organization', e.target.value)}
                            required
                          >
                            <option value="">Select an organization</option>
                            {organizations.map((org) => (
                              <option key={org} value={org}>{org}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">Status</h3>
                        
                        <div>
                          <label htmlFor="employment-status" className="block text-sm text-gray-700 mb-1">
                            Employment Status
                          </label>
                          <select
                            id="employment-status"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.employmentStatus}
                            onChange={(e) => handleEmployeeFormChange('employmentStatus', e.target.value)}
                          >
                            <option value="Active">Active</option>
                            <option value="Termed">Termed</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="enrollment-status" className="block text-sm text-gray-700 mb-1">
                            Enrollment Status
                          </label>
                          <select
                            id="enrollment-status"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.enrollmentStatus}
                            onChange={(e) => handleEmployeeFormChange('enrollmentStatus', e.target.value)}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Opted Out">Opted Out</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="email-opened" className="block text-sm text-gray-700 mb-1">
                            Email Opened
                          </label>
                          <select
                            id="email-opened"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.emailOpened}
                            onChange={(e) => handleEmployeeFormChange('emailOpened', e.target.value)}
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">Financial Details</h3>
                        
                        <div>
                          <label htmlFor="stipend" className="block text-sm text-gray-700 mb-1">
                            Stipend Amount
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input
                              type="text"
                              id="stipend"
                              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                              value={employeeFormData.stipend.replace('$', '')}
                              onChange={(e) => handleEmployeeFormChange('stipend', `$${e.target.value}`)}
                              placeholder="0.00"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="premium" className="block text-sm text-gray-700 mb-1">
                            Premium
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input
                              type="text"
                              id="premium"
                              className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md text-sm"
                              value={employeeFormData.premium === 'N/A' ? '' : employeeFormData.premium.replace('$', '')}
                              onChange={(e) => handleEmployeeFormChange('premium', e.target.value ? `$${e.target.value}` : 'N/A')}
                              placeholder="N/A"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-gray-700">Dates</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="enrollment-open" className="block text-sm text-gray-700 mb-1">
                              Enrollment Open
                            </label>
                            <input
                              type="text"
                              id="enrollment-open"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              value={employeeFormData.enrollmentOpenDate}
                              onChange={(e) => handleEmployeeFormChange('enrollmentOpenDate', e.target.value)}
                              placeholder="MM/DD/YYYY"
                            />
                          </div>
                          <div>
                            <label htmlFor="enrollment-close" className="block text-sm text-gray-700 mb-1">
                              Enrollment Close
                            </label>
                            <input
                              type="text"
                              id="enrollment-close"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                              value={employeeFormData.enrollmentCloseDate}
                              onChange={(e) => handleEmployeeFormChange('enrollmentCloseDate', e.target.value)}
                              placeholder="MM/DD/YYYY"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="coverage-start" className="block text-sm text-gray-700 mb-1">
                            Coverage Start Date
                          </label>
                          <input
                            type="text"
                            id="coverage-start"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            value={employeeFormData.coverageStartDate}
                            onChange={(e) => handleEmployeeFormChange('coverageStartDate', e.target.value)}
                            placeholder="MM/DD/YYYY"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleApplyEmployeeChanges}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                      >
                        {isNewEmployee ? 'Add Employee' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}