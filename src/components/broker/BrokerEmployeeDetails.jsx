import { useState, useEffect } from 'react';
import { X, Mail, Phone, Calendar, Shield, User, MapPin, Briefcase, FileText, Info, AlertCircle, Building2, Save, CheckCircle } from 'lucide-react';
import { StatusBadge } from '../../pages/broker/BrokerEmployees';

export default function BrokerEmployeeDetails({ employee, isOpen, onClose, isReadOnly }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName || '',
        lastName: employee.lastName || '',
        email: employee.email || '',
        phone: employee.phone || '',
        gender: employee.gender || '',
        dateOfBirth: employee.dateOfBirth || '',
        address: {
          street: employee.address?.street || '',
          unit: employee.address?.unit || '',
          city: employee.address?.city || '',
          state: employee.address?.state || '',
          zipCode: employee.address?.zipCode || ''
        },
        organization: employee.organization || '',
        employmentStatus: employee.employmentStatus || 'Active',
        enrollmentStatus: employee.enrollmentStatus || 'Not Started',
        emailOpened: employee.emailOpened || 'No',
        stipend: employee.stipend || '',
        premium: employee.premium || 'N/A',
        enrollmentOpenDate: employee.enrollmentOpenDate || '',
        enrollmentCloseDate: employee.enrollmentCloseDate || '',
        coverageStartDate: employee.coverageStartDate || '',
        employmentDetails: {
          jobTitle: employee.employmentDetails?.jobTitle || '',
          type: employee.employmentDetails?.type || 'Full Time',
          payType: employee.employmentDetails?.payType || 'Salary',
          hourlyRate: employee.employmentDetails?.hourlyRate || 0,
          avgHoursPerWeek: employee.employmentDetails?.avgHoursPerWeek || 0,
          annualWages: employee.employmentDetails?.annualWages || 0,
          brandUnit: employee.employmentDetails?.brandUnit || ''
        },
        planDetails: {
          plan: employee.planDetails?.plan || 'No Plan Selected',
          coverage: employee.planDetails?.coverage || [],
          deductible: employee.planDetails?.deductible || 'N/A',
          outOfPocketMax: employee.planDetails?.outOfPocketMax || 'N/A',
          startDate: employee.planDetails?.startDate || '',
          endDate: employee.planDetails?.endDate || ''
        }
      });
    }
  }, [employee]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
        setIsEditing(false);
        setSaveSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = (section, field, value) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
  };

  if (!mounted && !isOpen) return null;

  const renderReadOnlyCard = (title, icon, content) => (
    <div className="bg-gray-50 p-4 rounded-lg h-full">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</h4>
      </div>
      {content}
    </div>
  );

  const renderEditableCard = (title, icon, content) => (
    <div className="bg-white border border-gray-200 p-4 rounded-lg h-full">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">{title}</h4>
      </div>
      {content}
    </div>
  );

  return (
    <div 
      className={`fixed inset-0 overflow-hidden z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gray-500 transition-opacity ${
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
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {isEditing ? 'Edit Employee' : employee ? `${employee.firstName} ${employee.lastName}` : 'Employee Details'}
                  </h2>
                  {employee && !isEditing && (
                    <div className="flex items-center mt-1">
                      <Building2 className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">{employee.organization}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {employee && (
                <div className="flex-1 px-4 py-6 overflow-y-auto">
                  {saveSuccess && (
                    <div className="bg-green-50 p-3 rounded-md mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            Employee details saved successfully!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Status Badges */}
                    {!isEditing && (
                      <div className="flex space-x-2">
                        <StatusBadge status={employee.employmentStatus} />
                        <StatusBadge status={employee.enrollmentStatus} />
                      </div>
                    )}
                    
                    {/* Contact Information */}
                    {isEditing && !isReadOnly ? (
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Mail className="h-4 w-4 text-indigo-500 mr-1" />
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Contact Information</h4>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">First Name</label>
                              <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange(null, 'firstName', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Last Name</label>
                              <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange(null, 'lastName', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange(null, 'email', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Phone</label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => handleChange(null, 'phone', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Gender</label>
                            <select
                              value={formData.gender}
                              onChange={(e) => handleChange(null, 'gender', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                              <option value="">Select gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Date of Birth</label>
                            <input
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) => handleChange(null, 'dateOfBirth', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          
                          {/* Address */}
                          <div className="pt-3 border-t border-gray-200">
                            <label className="block text-xs text-gray-700 mb-2">Address</label>
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="Street Address"
                                value={formData.address.street}
                                onChange={(e) => handleChange('address', 'street', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                              <input
                                type="text"
                                placeholder="Apt, Suite, Unit, etc."
                                value={formData.address.unit}
                                onChange={(e) => handleChange('address', 'unit', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                              <div className="grid grid-cols-6 gap-2">
                                <div className="col-span-3">
                                  <input
                                    type="text"
                                    placeholder="City"
                                    value={formData.address.city}
                                    onChange={(e) => handleChange('address', 'city', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <input
                                    type="text"
                                    placeholder="State"
                                    value={formData.address.state}
                                    onChange={(e) => handleChange('address', 'state', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={formData.address.zipCode}
                                    onChange={(e) => handleChange('address', 'zipCode', e.target.value)}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      renderReadOnlyCard(
                        "Contact Information",
                        <Mail className="h-4 w-4 text-gray-400 mr-1" />,
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="font-medium">{employee.email}</p>
                          </div>
                          {employee.phone && (
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="font-medium">{employee.phone}</p>
                            </div>
                          )}
                          {employee.gender && (
                            <div>
                              <p className="text-xs text-gray-500">Gender</p>
                              <p className="font-medium">{employee.gender}</p>
                            </div>
                          )}
                          {employee.dateOfBirth && (
                            <div>
                              <p className="text-xs text-gray-500">Date of Birth</p>
                              <p className="font-medium">{employee.dateOfBirth}</p>
                            </div>
                          )}
                          {employee.address && (
                            <div>
                              <p className="text-xs text-gray-500">Address</p>
                              <div>
                                <p className="font-medium">
                                  {employee.address.street}
                                  {employee.address.unit ? `, ${employee.address.unit}` : ''}
                                </p>
                                <p className="font-medium">
                                  {employee.address.city}, {employee.address.state} {employee.address.zipCode}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {/* Employment Details */}
                    {isEditing && !isReadOnly ? (
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Briefcase className="h-4 w-4 text-indigo-500 mr-1" />
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Employment Details</h4>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Organization</label>
                            <input
                              type="text"
                              value={formData.organization}
                              onChange={(e) => handleChange(null, 'organization', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Job Title</label>
                            <input
                              type="text"
                              value={formData.employmentDetails.jobTitle}
                              onChange={(e) => handleChange('employmentDetails', 'jobTitle', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Employment Status</label>
                              <select
                                value={formData.employmentStatus}
                                onChange={(e) => handleChange(null, 'employmentStatus', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                <option value="Active">Active</option>
                                <option value="Termed">Termed</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Employment Type</label>
                              <select
                                value={formData.employmentDetails.type}
                                onChange={(e) => handleChange('employmentDetails', 'type', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Contractor">Contractor</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Department</label>
                            <input
                              type="text"
                              value={formData.employmentDetails.brandUnit}
                              onChange={(e) => handleChange('employmentDetails', 'brandUnit', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Pay Type</label>
                              <select
                                value={formData.employmentDetails.payType}
                                onChange={(e) => handleChange('employmentDetails', 'payType', e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              >
                                <option value="Salary">Salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Commission">Commission</option>
                              </select>
                            </div>
                            {formData.employmentDetails.payType === 'Hourly' && (
                              <div>
                                <label className="block text-xs text-gray-700 mb-1">Hourly Rate</label>
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">$</span>
                                  <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.employmentDetails.hourlyRate}
                                    onChange={(e) => handleChange('employmentDetails', 'hourlyRate', parseFloat(e.target.value) || 0)}
                                    className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            {formData.employmentDetails.payType === 'Hourly' && (
                              <div>
                                <label className="block text-xs text-gray-700 mb-1">Avg. Hours Per Week</label>
                                <input
                                  type="number"
                                  min="0"
                                  value={formData.employmentDetails.avgHoursPerWeek}
                                  onChange={(e) => handleChange('employmentDetails', 'avgHoursPerWeek', parseInt(e.target.value, 10) || 0)}
                                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                />
                              </div>
                            )}
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Annual Wages</label>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">$</span>
                                <input
                                  type="number"
                                  min="0"
                                  value={formData.employmentDetails.annualWages}
                                  onChange={(e) => handleChange('employmentDetails', 'annualWages', parseInt(e.target.value, 10) || 0)}
                                  className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      renderReadOnlyCard(
                        "Employment Details",
                        <Briefcase className="h-4 w-4 text-gray-400 mr-1" />,
                        employee.employmentDetails ? (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="text-xs text-gray-500">Job Title</p>
                              <p className="font-medium">{employee.employmentDetails.jobTitle}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Employment Type</p>
                              <p className="font-medium">{employee.employmentDetails.type}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Pay Type</p>
                              <p className="font-medium">{employee.employmentDetails.payType}</p>
                            </div>
                            {employee.employmentDetails.payType === 'Hourly' && (
                              <div>
                                <p className="text-xs text-gray-500">Hourly Rate</p>
                                <p className="font-medium">${employee.employmentDetails.hourlyRate.toFixed(2)}</p>
                              </div>
                            )}
                            {employee.employmentDetails.avgHoursPerWeek > 0 && (
                              <div>
                                <p className="text-xs text-gray-500">Avg. Hours Per Week</p>
                                <p className="font-medium">{employee.employmentDetails.avgHoursPerWeek}</p>
                              </div>
                            )}
                            {employee.employmentDetails.annualWages > 0 && (
                              <div>
                                <p className="text-xs text-gray-500">Annual Wages</p>
                                <p className="font-medium">${employee.employmentDetails.annualWages.toLocaleString()}</p>
                              </div>
                            )}
                            {employee.employmentDetails.brandUnit && (
                              <div>
                                <p className="text-xs text-gray-500">Department</p>
                                <p className="font-medium">{employee.employmentDetails.brandUnit}</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">No employment details available</p>
                        )
                      )
                    )}

                    {/* Benefits Information */}
                    {isEditing && !isReadOnly ? (
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Shield className="h-4 w-4 text-indigo-500 mr-1" />
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Benefits Information</h4>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Stipend Amount</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">$</span>
                              <input
                                type="text"
                                value={formData.stipend.replace(/^\$/, '')}
                                onChange={(e) => handleChange(null, 'stipend', `$${e.target.value}`)}
                                className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Premium</label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">$</span>
                              <input
                                type="text"
                                value={formData.premium === 'N/A' ? '' : formData.premium.replace(/^\$/, '')}
                                onChange={(e) => handleChange(null, 'premium', e.target.value ? `$${e.target.value}` : 'N/A')}
                                placeholder="N/A"
                                className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Selected Plan</label>
                            <input
                              type="text"
                              value={formData.planDetails.plan}
                              onChange={(e) => handleChange('planDetails', 'plan', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Deductible</label>
                            <input
                              type="text"
                              value={formData.planDetails.deductible === 'N/A' ? '' : formData.planDetails.deductible}
                              onChange={(e) => handleChange('planDetails', 'deductible', e.target.value || 'N/A')}
                              placeholder="N/A"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Out of Pocket Max</label>
                            <input
                              type="text"
                              value={formData.planDetails.outOfPocketMax === 'N/A' ? '' : formData.planDetails.outOfPocketMax}
                              onChange={(e) => handleChange('planDetails', 'outOfPocketMax', e.target.value || 'N/A')}
                              placeholder="N/A"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      renderReadOnlyCard(
                        "Benefits Information",
                        <Shield className="h-4 w-4 text-gray-400 mr-1" />,
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Stipend Amount</p>
                            <p className="font-medium">{employee.stipend}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Premium</p>
                            <p className="font-medium">{employee.premium}</p>
                          </div>
                          {employee.planDetails && (
                            <>
                              <div>
                                <p className="text-xs text-gray-500">Selected Plan</p>
                                <p className="font-medium">{employee.planDetails.plan}</p>
                              </div>
                              {employee.planDetails.coverage && employee.planDetails.coverage.length > 0 && (
                                <div>
                                  <p className="text-xs text-gray-500">Coverage</p>
                                  <p className="font-medium">{employee.planDetails.coverage.join(', ')}</p>
                                </div>
                              )}
                              {employee.planDetails.deductible !== 'N/A' && (
                                <div>
                                  <p className="text-xs text-gray-500">Deductible</p>
                                  <p className="font-medium">{employee.planDetails.deductible}</p>
                                </div>
                              )}
                              {employee.planDetails.outOfPocketMax !== 'N/A' && (
                                <div>
                                  <p className="text-xs text-gray-500">Out of Pocket Max</p>
                                  <p className="font-medium">{employee.planDetails.outOfPocketMax}</p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    )}

                    {/* Enrollment Information */}
                    {isEditing && !isReadOnly ? (
                      <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Calendar className="h-4 w-4 text-indigo-500 mr-1" />
                          <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wider">Enrollment Information</h4>
                        </div>
                        
                        <div className="space-y-4 text-sm">
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Enrollment Status</label>
                            <select
                              value={formData.enrollmentStatus}
                              onChange={(e) => handleChange(null, 'enrollmentStatus', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                              <option value="Not Started">Not Started</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Opted Out">Opted Out</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Enrollment Open Date</label>
                              <input
                                type="text"
                                value={formData.enrollmentOpenDate}
                                onChange={(e) => handleChange(null, 'enrollmentOpenDate', e.target.value)}
                                placeholder="MM/DD/YYYY"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Enrollment Close Date</label>
                              <input
                                type="text"
                                value={formData.enrollmentCloseDate}
                                onChange={(e) => handleChange(null, 'enrollmentCloseDate', e.target.value)}
                                placeholder="MM/DD/YYYY"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Coverage Start Date</label>
                            <input
                              type="text"
                              value={formData.coverageStartDate}
                              onChange={(e) => handleChange(null, 'coverageStartDate', e.target.value)}
                              placeholder="MM/DD/YYYY"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Plan Start Date</label>
                              <input
                                type="text"
                                value={formData.planDetails.startDate}
                                onChange={(e) => handleChange('planDetails', 'startDate', e.target.value)}
                                placeholder="MM/DD/YYYY"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-700 mb-1">Plan End Date</label>
                              <input
                                type="text"
                                value={formData.planDetails.endDate}
                                onChange={(e) => handleChange('planDetails', 'endDate', e.target.value)}
                                placeholder="MM/DD/YYYY"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-700 mb-1">Email Opened</label>
                            <select
                              value={formData.emailOpened}
                              onChange={(e) => handleChange(null, 'emailOpened', e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : (
                      renderReadOnlyCard(
                        "Enrollment Information",
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />,
                        <div className="space-y-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Enrollment Status</p>
                            <div className="mt-1">
                              <StatusBadge status={employee.enrollmentStatus} />
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Enrollment Period</p>
                            <p className="font-medium">
                              {employee.enrollmentOpenDate} to {employee.enrollmentCloseDate}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Coverage Start Date</p>
                            <p className="font-medium">{employee.coverageStartDate}</p>
                          </div>
                          {employee.planDetails && employee.planDetails.startDate !== 'N/A' && (
                            <div>
                              <p className="text-xs text-gray-500">Plan Year</p>
                              <p className="font-medium">
                                {employee.planDetails.startDate} to {employee.planDetails.endDate}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-gray-500">Email Opened</p>
                            <p className={`font-medium ${employee.emailOpened === 'Yes' ? 'text-green-600' : ''}`}>
                              {employee.emailOpened}
                            </p>
                          </div>
                        </div>
                      )
                    )}

                    {/* Documents Section */}
                    {renderReadOnlyCard(
                      "Related Documents",
                      <FileText className="h-4 w-4 text-gray-400 mr-1" />,
                      <div className="space-y-2 text-sm">
                        {employee.enrollmentStatus === 'Completed' ? (
                          <>
                            <div className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer">
                              <FileText className="h-4 w-4 mr-2" />
                              <span>Plan Selection Confirmation</span>
                            </div>
                            <div className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer">
                              <FileText className="h-4 w-4 mr-2" />
                              <span>Benefit Summary</span>
                            </div>
                            <div className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer">
                              <FileText className="h-4 w-4 mr-2" />
                              <span>Enrollment Form</span>
                            </div>
                          </>
                        ) : employee.enrollmentStatus === 'Opted Out' ? (
                          <div className="flex items-center text-indigo-600 hover:text-indigo-800 cursor-pointer">
                            <FileText className="h-4 w-4 mr-2" />
                            <span>Opt-Out Confirmation</span>
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            No documents available yet
                          </p>
                        )}
                      </div>
                    )}

                    {/* Notes Section */}
                    {renderReadOnlyCard(
                      "Notes & Comments",
                      <Info className="h-4 w-4 text-gray-400 mr-1" />,
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-500 italic">
                          No notes available for this employee
                        </p>
                        {isReadOnly && (
                          <div className="text-yellow-600 flex items-start mt-4">
                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                            <p className="text-xs">
                              You are in read-only mode and cannot add notes.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={isSaving}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      {isSaving ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    >
                      Close
                    </button>
                    
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Edit Details
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}