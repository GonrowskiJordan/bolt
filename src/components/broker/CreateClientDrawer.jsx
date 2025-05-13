import { useState, useEffect } from 'react';
import { X, Building2, MapPin, Users, Mail, Phone, Save, Calendar, AlertCircle } from 'lucide-react';

export default function CreateClientDrawer({ isOpen, onClose, onSubmit }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    industry: '',
    location: '',
    employees: '',
    status: 'Active',
    
    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Plan Information
    planType: 'Standard',
    renewalDate: '',
    stipendEmployee: '',
    stipendSpouse: '',
    stipendDependent: '',
    planStartDate: '',
    planEndDate: '',
    
    // Notes
    notes: ''
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
        location: '',
        employees: '',
        status: 'Active',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        planType: 'Standard',
        renewalDate: '',
        stipendEmployee: '',
        stipendSpouse: '',
        stipendDependent: '',
        planStartDate: '',
        planEndDate: '',
        notes: ''
      });
    }, 1000);
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
    'Education', 'Hospitality', 'Construction', 'Transportation', 'Energy',
    'Agriculture', 'Professional Services', 'Entertainment', 'Non-profit', 'Other'
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

  const planTypes = [
    'Basic', 'Standard', 'Premium', 'Premium Plus'
  ];

  return (
    <div 
      className={`fixed inset-0 overflow-hidden transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 9999 }}
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
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Add New Client</h2>
                  <p className="text-sm text-gray-500">
                    Add a new client organization to manage
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div className="space-y-6">
                    <div className="pb-2 mb-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                        Organization Information
                      </h3>
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Organization Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry<span className="text-red-500">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        required
                      >
                        <option value="">Select an industry</option>
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="City, State"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                          Employees<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="employees"
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="pb-2 mb-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        Contact Information
                      </h3>
                    </div>

                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Person<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                          Email<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="contactPhone"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    
                    <div className="grid grid-cols-6 gap-3">
                      <div className="col-span-3">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        >
                          <option value="">Select</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Plan Information */}
                  <div className="space-y-6">
                    <div className="pb-2 mb-2 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        Plan Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">
                          Plan Type
                        </label>
                        <select
                          id="planType"
                          name="planType"
                          value={formData.planType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        >
                          {planTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="renewalDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Renewal Date
                        </label>
                        <input
                          type="date"
                          id="renewalDate"
                          name="renewalDate"
                          value={formData.renewalDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="stipendEmployee" className="block text-sm font-medium text-gray-700 mb-1">
                          Employee Stipend
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            id="stipendEmployee"
                            name="stipendEmployee"
                            value={formData.stipendEmployee}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="stipendSpouse" className="block text-sm font-medium text-gray-700 mb-1">
                          Spouse Stipend
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            id="stipendSpouse"
                            name="stipendSpouse"
                            value={formData.stipendSpouse}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="stipendDependent" className="block text-sm font-medium text-gray-700 mb-1">
                          Dependent Stipend
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="text"
                            id="stipendDependent"
                            name="stipendDependent"
                            value={formData.stipendDependent}
                            onChange={handleChange}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 py-2 sm:text-sm border border-gray-300 rounded-md"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="planStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Plan Start Date
                        </label>
                        <input
                          type="date"
                          id="planStartDate"
                          name="planStartDate"
                          value={formData.planStartDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="planEndDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Plan End Date
                        </label>
                        <input
                          type="date"
                          id="planEndDate"
                          name="planEndDate"
                          value={formData.planEndDate}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows="3"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        placeholder="Additional information about the client..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">Important</p>
                      <p className="text-blue-600 text-xs leading-5">
                        Adding a client will create an organization in the system. After creating, 
                        you'll be able to add employees and configure enrollment periods.
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
                  type="button"
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
                      Add Client
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