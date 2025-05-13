import { useState, useEffect } from 'react';
import { X, Building2, Save, AlertCircle } from 'lucide-react';

export default function CreateEmployerDrawer({ isOpen, onClose, onSubmit }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: '',
    taxId: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    contributionAmount: '',
  });
  const [isSaving, setIsSaving] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(formData);
      }
      setIsSaving(false);
      onClose();
      
      // Reset form data
      setFormData({
        name: '',
        industry: '',
        size: '',
        taxId: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        email: '',
        website: '',
        adminFirstName: '',
        adminLastName: '',
        adminEmail: '',
        adminPhone: '',
        contributionAmount: '',
      });
    }, 1000);
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
    'Education', 'Hospitality', 'Construction', 'Transportation', 'Energy',
    'Agriculture', 'Professional Services', 'Entertainment', 'Non-profit', 'Other'
  ];
  
  const organizationSizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', 
    '501-1000 employees', '1001-5000 employees', '5000+ employees'
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

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
                  <h2 className="text-lg font-medium text-gray-900">Create New Employer</h2>
                  <p className="text-sm text-gray-500">
                    Add a new employer organization to the platform
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                        Organization Information
                      </h3>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Organization Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Industry <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                          >
                            <option value="">Select an industry</option>
                            {industries.map((industry) => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Organization Size <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                          >
                            <option value="">Select employee count</option>
                            {organizationSizes.map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tax ID / EIN
                          </label>
                          <input
                            type="text"
                            name="taxId"
                            value={formData.taxId}
                            onChange={handleChange}
                            placeholder="XX-XXXXXXX"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                          <p className="text-xs text-gray-500 mt-1">Format: XX-XXXXXXX</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900">Contact Information</h3>
                      
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div className="grid grid-cols-6 gap-3">
                          <div className="col-span-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <select
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            >
                              <option value="">Select</option>
                              {states.map((state) => (
                                <option key={state} value={state}>{state}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Website
                          </label>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://www.example.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900">Administrator Information</h3>
                      
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="adminFirstName"
                              value={formData.adminFirstName}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="adminLastName"
                              value={formData.adminLastName}
                              onChange={handleChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="adminEmail"
                            value={formData.adminEmail}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="adminPhone"
                            value={formData.adminPhone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900">Benefit Options</h3>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Monthly Contribution Amount <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </span>
                          <input
                            type="text"
                            name="contributionAmount"
                            value={formData.contributionAmount}
                            onChange={handleChange}
                            className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Base amount per employee per month</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                    <div className="text-xs text-gray-600">
                      <p className="font-medium text-gray-700 mb-1">Important Information</p>
                      <p>
                        Creating an employer will automatically generate an account for the specified administrator.
                        They will receive an email with instructions to set up their password.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex justify-end px-4 py-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 flex items-center"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Create Employer
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}