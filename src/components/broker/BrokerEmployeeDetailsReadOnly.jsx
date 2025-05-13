import { useState, useEffect } from 'react';
import { X, Mail, Phone, Calendar, Shield, User, MapPin, Briefcase, FileText, Info, AlertCircle, Building2 } from 'lucide-react';
import { StatusBadge } from '../../pages/broker/BrokerEmployees';

export default function BrokerEmployeeDetailsReadOnly({ employee, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const renderInfoCard = (title, icon, content) => (
    <div className="bg-gray-50 p-4 rounded-lg h-full">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</h4>
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
                  <h2 className="text-lg font-medium text-gray-900">{employee ? `${employee.firstName} ${employee.lastName}` : 'Employee Details'}</h2>
                  {employee && (
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
                  <div className="space-y-6">
                    {/* Status Badges */}
                    <div className="flex space-x-2">
                      <StatusBadge status={employee.employmentStatus} />
                      <StatusBadge status={employee.enrollmentStatus} />
                    </div>
                    
                    {/* Contact Information */}
                    {renderInfoCard(
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
                    )}

                    {/* Employment Details */}
                    {renderInfoCard(
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
                    )}

                    {/* Benefits Information */}
                    {renderInfoCard(
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
                    )}

                    {/* Enrollment Information */}
                    {renderInfoCard(
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
                    )}

                    {/* Documents Section */}
                    {renderInfoCard(
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
                    {renderInfoCard(
                      "Notes & Comments",
                      <Info className="h-4 w-4 text-gray-400 mr-1" />,
                      <div className="space-y-3 text-sm">
                        <p className="text-gray-500 italic">
                          No notes available for this employee
                        </p>
                        <div className="text-yellow-600 flex items-start mt-4">
                          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-xs">
                            You are in read-only mode and cannot add notes.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}