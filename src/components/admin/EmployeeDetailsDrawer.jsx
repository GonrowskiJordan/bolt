import { useState, useEffect } from 'react';
import { X, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

export default function EmployeeDetailsDrawer({ employee, isOpen, onClose, onSave, onDelete }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    employeeEnrollmentId: '9da72cd9-ba56-466e-8292-44397b10c3b7',
    employeeId: '62386703-bb8e-42c1-a9da-3e70e382cd2d',
    employerId: 'b9397e56-d6ac-4a14-84ff-2baa1701dddf',
    oneTimeAttestationId: '1e132325-f411-498e-a787-8ee007900f3c',
    year: '2025',
    openDate: '11/04/2024',
    closeDate: '11/14/2024',
    currentStipend: '149.94',
    currentMonthlyPremium: '271.33',
    currentStatus: 'completed',
    newStipend: '149.94',
    newMonthlyPremium: '271.33',
    newEnrollmentStatus: 'Completed',
    
    // Personal Information
    firstName: 'Adam',
    middleName: '',
    lastName: 'Pan',
    dateOfBirth: '08/21/1987',
    biologicalGender: 'male',
    emailAddress: 'adamp@airborneathletics.com',
    address: '8160 E 250th',
    zipCode: '55020',
    phoneNumber: '(612) 532-6319',
    tobaccoUser: 'False',
    
    // Employment Information
    brandUnit: '',
    storeNumber: '',
    homeAddress2: '',
    county: '',
    homeCity: 'Elko',
    averageHoursPerWeek: '40',
    hourlyRate: '22.50',
    annualWages: '46800',
    payType: 'Hourly',
    jobTitle: 'Customer Service Representative',
    employeeRef: 'Air9550',
    employeeClass: '',
    worksiteIdentifier: '',
    worksiteAddress: '',
    relationship: 'Self',
    currentEmployeeStatus: 'active',
    
    // Attestation Information
    attestedBy: 'jrickford@healthmarkets.com',
    policyStartDate: '05/01/2025',
    policyEndDate: '12/31/2025',
    livesCovered: '3',
    planTier: 'employee_child',
    monthlyPremiumAmount: '685.63',
    allowedMoney: '373.21',
    updatedDate: '04/24/2025 19:02:34',
    declinedReason: ''
  });

  // Add state for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Add state for accordion sections
  const [expandedSections, setExpandedSections] = useState({
    employment: false,
    enrollment: false,
    attestations: false
  });

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
        // Reset delete confirmation when drawer closes
        setShowDeleteConfirm(false);
        setDeleteConfirmInput('');
        setIsDeleting(false);
        // Reset accordion state when drawer closes
        setExpandedSections({
          employment: false,
          enrollment: false,
          attestations: false
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmInput === `${formData.firstName} ${formData.lastName}`) {
      setIsDeleting(true);
      // Simulate API call
      setTimeout(() => {
        if (onDelete) {
          onDelete(formData.employeeId);
        }
        onClose();
      }, 1000);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {employee ? `${employee.firstName} ${employee.lastName}` : 'Employee Details'}
                  </h2>
                  {employee && (
                    <p className="text-sm text-gray-500">
                      {employee.employer}
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
                <div className="space-y-4">
                  {/* Employee Information - This section is always expanded */}
                  <h3 className="text-md font-medium text-gray-800 border-b pb-2">Employee Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      EmployeeId
                    </label>
                    <input
                      type="text"
                      value={formData.employeeId}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      FirstName
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      MiddleName
                    </label>
                    <input
                      type="text"
                      value={formData.middleName}
                      onChange={(e) => handleChange('middleName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LastName
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DateOfBirth
                    </label>
                    <input
                      type="text"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      BiologicalGender
                    </label>
                    <input
                      type="text"
                      value={formData.biologicalGender}
                      onChange={(e) => handleChange('biologicalGender', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="text"
                      value={formData.emailAddress}
                      onChange={(e) => handleChange('emailAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tobacco User
                    </label>
                    <input
                      type="text"
                      value={formData.tobaccoUser}
                      onChange={(e) => handleChange('tobaccoUser', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  
                  {/* Employment Information - Collapsible Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <button 
                      className="flex w-full items-center justify-between pb-2" 
                      onClick={() => toggleSection('employment')}
                    >
                      <h3 className="text-md font-medium text-gray-800">Employment Information</h3>
                      {expandedSections.employment ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </button>
                    
                    {expandedSections.employment && (
                      <div className="space-y-4 mt-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Brand/Unit
                          </label>
                          <input
                            type="text"
                            value={formData.brandUnit}
                            onChange={(e) => handleChange('brandUnit', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Store Number
                          </label>
                          <input
                            type="text"
                            value={formData.storeNumber}
                            onChange={(e) => handleChange('storeNumber', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Home Address 2
                          </label>
                          <input
                            type="text"
                            value={formData.homeAddress2}
                            onChange={(e) => handleChange('homeAddress2', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            County
                          </label>
                          <input
                            type="text"
                            value={formData.county}
                            onChange={(e) => handleChange('county', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Home City
                          </label>
                          <input
                            type="text"
                            value={formData.homeCity}
                            onChange={(e) => handleChange('homeCity', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Average Hours Per Week
                          </label>
                          <input
                            type="text"
                            value={formData.averageHoursPerWeek}
                            onChange={(e) => handleChange('averageHoursPerWeek', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hourly Rate
                          </label>
                          <input
                            type="text"
                            value={formData.hourlyRate}
                            onChange={(e) => handleChange('hourlyRate', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Wages
                          </label>
                          <input
                            type="text"
                            value={formData.annualWages}
                            onChange={(e) => handleChange('annualWages', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pay Type
                          </label>
                          <input
                            type="text"
                            value={formData.payType}
                            onChange={(e) => handleChange('payType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={formData.jobTitle}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee Ref
                          </label>
                          <input
                            type="text"
                            value={formData.employeeRef}
                            onChange={(e) => handleChange('employeeRef', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee Class
                          </label>
                          <input
                            type="text"
                            value={formData.employeeClass}
                            onChange={(e) => handleChange('employeeClass', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Worksite Identifier
                          </label>
                          <input
                            type="text"
                            value={formData.worksiteIdentifier}
                            onChange={(e) => handleChange('worksiteIdentifier', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Worksite Address
                          </label>
                          <input
                            type="text"
                            value={formData.worksiteAddress}
                            onChange={(e) => handleChange('worksiteAddress', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Relationship
                          </label>
                          <input
                            type="text"
                            value={formData.relationship}
                            onChange={(e) => handleChange('relationship', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Employee Status
                          </label>
                          <input
                            type="text"
                            value={formData.currentEmployeeStatus}
                            onChange={(e) => handleChange('currentEmployeeStatus', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Enrollment Stipend & Status - Collapsible Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <button 
                      className="flex w-full items-center justify-between pb-2" 
                      onClick={() => toggleSection('enrollment')}
                    >
                      <h3 className="text-md font-medium text-gray-800">Enrollment Stipend & Status</h3>
                      {expandedSections.enrollment ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </button>
                    
                    {expandedSections.enrollment && (
                      <div className="space-y-4 mt-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employee Enrollment Id
                          </label>
                          <input
                            type="text"
                            value={formData.employeeEnrollmentId}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Employer Id
                          </label>
                          <input
                            type="text"
                            value={formData.employerId}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            One Time Attestation Id
                          </label>
                          <input
                            type="text"
                            value={formData.oneTimeAttestationId}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                          </label>
                          <input
                            type="text"
                            value={formData.year}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Open Date
                          </label>
                          <input
                            type="text"
                            value={formData.openDate}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Close Date
                          </label>
                          <input
                            type="text"
                            value={formData.closeDate}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Stipend
                          </label>
                          <input
                            type="text"
                            value={formData.currentStipend}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Monthly Premium
                          </label>
                          <input
                            type="text"
                            value={formData.currentMonthlyPremium}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Current Status
                          </label>
                          <input
                            type="text"
                            value={formData.currentStatus}
                            readOnly
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Stipend
                          </label>
                          <input
                            type="text"
                            value={formData.newStipend}
                            onChange={(e) => handleChange('newStipend', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Monthly Premium
                          </label>
                          <input
                            type="text"
                            value={formData.newMonthlyPremium}
                            onChange={(e) => handleChange('newMonthlyPremium', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            New Enrollment Status
                          </label>
                          <select
                            value={formData.newEnrollmentStatus}
                            onChange={(e) => handleChange('newEnrollmentStatus', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Not Started">Not Started</option>
                            <option value="Opted Out">Opted Out</option>
                            <option value="Attested">Attested</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Attestations - Collapsible Section */}
                  <div className="border-t border-gray-200 pt-4">
                    <button 
                      className="flex w-full items-center justify-between pb-2" 
                      onClick={() => toggleSection('attestations')}
                    >
                      <h3 className="text-md font-medium text-gray-800">Attestations</h3>
                      {expandedSections.attestations ? 
                        <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      }
                    </button>
                    
                    {expandedSections.attestations && (
                      <div className="space-y-3 bg-gray-50 p-4 rounded-lg mt-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Attested By:</p>
                          <p className="text-sm text-gray-900">{formData.attestedBy}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Policy Start Date:</p>
                          <p className="text-sm text-gray-900">{formData.policyStartDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Policy End Date:</p>
                          <p className="text-sm text-gray-900">{formData.policyEndDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Lives Covered:</p>
                          <p className="text-sm text-gray-900">{formData.livesCovered}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Plan Tier:</p>
                          <p className="text-sm text-gray-900">{formData.planTier}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Monthly Premium Amount:</p>
                          <p className="text-sm text-gray-900">{formData.monthlyPremiumAmount}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Allowed Money:</p>
                          <p className="text-sm text-gray-900">{formData.allowedMoney}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Updated Date:</p>
                          <p className="text-sm text-gray-900">{formData.updatedDate}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">Declined Reason:</p>
                          <p className="text-sm text-gray-900">{formData.declinedReason || "N/A"}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delete Employee Button */}
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Employee
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-500">
                      This will permanently remove this employee and all associated data
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end px-4 py-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-3"
                >
                  Cancel / Back to List
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed z-[60] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Employee
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this employee? This action cannot be undone.
                      </p>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Please type <strong>{formData.firstName} {formData.lastName}</strong> to confirm:
                        </label>
                        <input
                          type="text"
                          value={deleteConfirmInput}
                          onChange={(e) => setDeleteConfirmInput(e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button"
                  disabled={deleteConfirmInput !== `${formData.firstName} ${formData.lastName}` || isDeleting}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
                    deleteConfirmInput === `${formData.firstName} ${formData.lastName}` ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
                  onClick={handleConfirmDelete}
                >
                  {isDeleting ? 
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </span> : 
                    'Delete'
                  }
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}