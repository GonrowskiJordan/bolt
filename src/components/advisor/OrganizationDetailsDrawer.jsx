import { useState, useEffect } from 'react';
import { X, Mail, Phone, Calendar, Shield, User, MapPin, Briefcase, FileText, Info, Building2, Users, Activity } from 'lucide-react';

export default function OrganizationDetailsDrawer({ organization, isOpen, onClose }) {
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
                  <h2 className="text-lg font-medium text-gray-900">{organization ? organization.name : 'Organization Details'}</h2>
                  {organization && (
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                      <p className="text-sm text-gray-500">{organization.location}</p>
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

              {organization && (
                <div className="flex-1 overflow-y-auto">
                  <div className="px-4 py-6 space-y-6">
                    {/* Status Badge */}
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        organization.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {organization.status}
                      </span>
                      <span className="text-sm text-gray-500">Last activity: {organization.lastActivity}</span>
                    </div>

                    {/* Key Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Organization Information</h3>
                      </div>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                        <div>
                          <dt className="text-gray-500">Industry</dt>
                          <dd className="mt-1 font-medium text-gray-900">{organization.industry}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Location</dt>
                          <dd className="mt-1 font-medium text-gray-900">{organization.location}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Employees</dt>
                          <dd className="mt-1 font-medium text-gray-900">{organization.employees}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Status</dt>
                          <dd className="mt-1 font-medium text-gray-900">{organization.status}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Primary Contact</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <p className="text-gray-500">Name</p>
                          <p className="font-medium text-gray-900">
                            {organization.contactName || 'John Smith'}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">
                            {organization.contactEmail || `contact@${organization.name.toLowerCase().replace(/\s+/g, '')}.com`}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">
                            {organization.contactPhone || '(123) 456-7890'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Benefits Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Shield className="h-4 w-4 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Benefits Information</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <p className="text-gray-500">Plan Type</p>
                          <p className="font-medium text-gray-900">
                            {organization.planType || 'Standard ICHRA'}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Employee Contribution</p>
                          <p className="font-medium text-gray-900">$350-500/month</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-500">Renewal Date</p>
                          <p className="font-medium text-gray-900">
                            {organization.renewalDate || 'January 15, 2025'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Employee Stats */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Users className="h-4 w-4 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Employee Statistics</h3>
                      </div>
                      
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                        <div>
                          <dt className="text-gray-500">Total Employees</dt>
                          <dd className="mt-1 font-medium text-gray-900">{organization.employees}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Active Employees</dt>
                          <dd className="mt-1 font-medium text-gray-900">{Math.round(organization.employees * 0.92)}</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Enrollment Rate</dt>
                          <dd className="mt-1 font-medium text-green-600">92%</dd>
                        </div>
                        <div>
                          <dt className="text-gray-500">Avg. Monthly Premium</dt>
                          <dd className="mt-1 font-medium text-gray-900">$432</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Activity className="h-4 w-4 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Recent Activity</h3>
                      </div>

                      <ul className="divide-y divide-gray-200">
                        <li className="py-2">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Employee enrollment completed</p>
                            <p className="text-xs text-gray-500">2 days ago</p>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Benefits guide uploaded</p>
                            <p className="text-xs text-gray-500">5 days ago</p>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-600">Plan details updated</p>
                            <p className="text-xs text-gray-500">1 week ago</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    {/* Documents */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <FileText className="h-4 w-4 text-gray-400 mr-2" />
                        <h3 className="text-sm font-medium text-gray-700">Related Documents</h3>
                      </div>
                      
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-indigo-500 mr-2" />
                            <span className="text-sm text-gray-900">Benefits Guide 2024</span>
                          </div>
                          <button className="text-xs text-indigo-600 hover:text-indigo-800">View</button>
                        </li>
                        <li className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-indigo-500 mr-2" />
                            <span className="text-sm text-gray-900">Plan Summary</span>
                          </div>
                          <button className="text-xs text-indigo-600 hover:text-indigo-800">View</button>
                        </li>
                        <li className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-indigo-500 mr-2" />
                            <span className="text-sm text-gray-900">Employee Census</span>
                          </div>
                          <button className="text-xs text-indigo-600 hover:text-indigo-800">View</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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