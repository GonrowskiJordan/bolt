import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Users, MapPin, Mail, Phone, Check, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import Logo from '../../components/Logo';
import EmployerProgressSteps from '../../components/employer/EmployerProgressSteps';

export default function EmployerOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Organization Info
    name: '',
    type: 'Corporation',
    industry: '',
    size: '',
    taxId: '',
    
    // Contact Info
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    
    // Primary Admin User
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    
    // Secondary Admin User (Backup)
    secondaryAdminFirstName: '',
    secondaryAdminLastName: '',
    secondaryAdminEmail: '',
    secondaryAdminPhone: '',
    
    // Benefit Options
    contributionType: 'Fixed',
    contributionAmount: '',
    planStartDate: '',
    planEndDate: '',
    enrollmentStartDate: '',
    enrollmentEndDate: '',
    
    // Settings
    allowEmployeePortal: true,
    autoEnrollEmployees: true,
    sendWelcomeEmails: true
  });
  
  const [formComplete, setFormComplete] = useState(false);

  const steps = [
    'Organization Information',
    'Contact Information',
    'Primary Admin',
    'Secondary Admin',
    'Benefit Options',
    'Settings & Preferences',
    'Review'
  ];

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
    'Education', 'Hospitality', 'Construction', 'Transportation', 'Energy',
    'Agriculture', 'Professional Services', 'Entertainment', 'Non-profit', 'Other'
  ];
  
  const organizationSizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', 
    '501-1000 employees', '1001-5000 employees', '5000+ employees'
  ];

  const organizationTypes = [
    'Corporation', 'LLC', 'Partnership', 'Sole Proprietorship', 'Non-profit', 'Government', 'Other'
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormComplete(true);
    // In a real app, you would submit the form data to your backend here
    console.log('Form submitted:', formData);
  };

  // This function will still be used for tracking validation state
  // but won't be used to disable buttons
  const validateStep = () => {
    switch (currentStep) {
      case 0: // Organization Info
        return !!(formData.name && formData.industry && formData.size);
      case 1: // Contact Info
        return !!(formData.address && formData.city && formData.state && formData.zipCode);
      case 2: // Primary Admin User
        return !!(formData.adminFirstName && formData.adminLastName && formData.adminEmail);
      case 3: // Secondary Admin User (Backup)
        return !!(formData.secondaryAdminFirstName && formData.secondaryAdminLastName && formData.secondaryAdminEmail);
      case 4: // Benefit Options
        return !!(formData.contributionAmount && formData.planStartDate && formData.planEndDate);
      case 5: // Settings & Preferences
        return true; // All settings have defaults
      case 6: // Review
        return true;
      default:
        return false;
    }
  };

  const renderOrganizationInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Organization Information</h2>
      <p className="text-gray-500">Tell us about your organization</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {organizationTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry <span className="text-red-500">*</span>
            </label>
            <select
              name="industry"
              id="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
              Organization Size <span className="text-red-500">*</span>
            </label>
            <select
              name="size"
              id="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select employee count</option>
              {organizationSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID / EIN
            </label>
            <input
              type="text"
              name="taxId"
              id="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="XX-XXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Format: XX-XXXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactInfoStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
      <p className="text-gray-500">Where your organization is located and how to reach you</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div className="col-span-2">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              id="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="url"
            name="website"
            id="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://www.example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderAdminUserStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Primary Administrator Information</h2>
      <p className="text-gray-500">The main administrator who will manage this account</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="adminFirstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="adminFirstName"
              id="adminFirstName"
              value={formData.adminFirstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="adminLastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="adminLastName"
              id="adminLastName"
              value={formData.adminLastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="adminEmail"
            id="adminEmail"
            value={formData.adminEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">This email will be used for account access and notifications</p>
        </div>
        
        <div>
          <label htmlFor="adminPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="adminPhone"
            id="adminPhone"
            value={formData.adminPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            A temporary password will be sent to the administrator's email address once the account is created.
          </p>
        </div>
      </div>
    </div>
  );

  const renderSecondaryAdminStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Secondary Administrator Information</h2>
      <p className="text-gray-500">Designate a backup administrator to avoid single point of failure</p>
      
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-amber-700">
              For security and continuity, a secondary admin is required. This person will have administrative access if the primary admin is unavailable.
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="secondaryAdminFirstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="secondaryAdminFirstName"
              id="secondaryAdminFirstName"
              value={formData.secondaryAdminFirstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="secondaryAdminLastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="secondaryAdminLastName"
              id="secondaryAdminLastName"
              value={formData.secondaryAdminLastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="secondaryAdminEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="secondaryAdminEmail"
            id="secondaryAdminEmail"
            value={formData.secondaryAdminEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">This email must be different from the primary admin email</p>
        </div>
        
        <div>
          <label htmlFor="secondaryAdminPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="secondaryAdminPhone"
            id="secondaryAdminPhone"
            value={formData.secondaryAdminPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-700">Why this matters</h3>
              <p className="mt-1 text-sm text-gray-500">
                The secondary administrator ensures business continuity in case the primary admin is unavailable. 
                Both administrators will have the same level of access to manage your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBenefitOptionsStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Benefit Options</h2>
      <p className="text-gray-500">Configure your ICHRA (Individual Coverage Health Reimbursement Arrangement) benefit offering</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="contributionType" className="block text-sm font-medium text-gray-700 mb-1">
            Contribution Type
          </label>
          <select
            name="contributionType"
            id="contributionType"
            value={formData.contributionType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Fixed">Fixed Amount</option>
            <option value="Percentage">Percentage of Premium</option>
            <option value="Variable">Variable by Employee Class</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="contributionAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Contribution Amount <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="contributionAmount"
              id="contributionAmount"
              value={formData.contributionAmount}
              onChange={handleChange}
              className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Base amount per employee per month</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="planStartDate" className="block text-sm font-medium text-gray-700 mb-1">
              Plan Year Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="planStartDate"
              id="planStartDate"
              value={formData.planStartDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="planEndDate" className="block text-sm font-medium text-gray-700 mb-1">
              Plan Year End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="planEndDate"
              id="planEndDate"
              value={formData.planEndDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="enrollmentStartDate" className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="enrollmentStartDate"
              id="enrollmentStartDate"
              value={formData.enrollmentStartDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="enrollmentEndDate" className="block text-sm font-medium text-gray-700 mb-1">
              Enrollment End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="enrollmentEndDate"
              id="enrollmentEndDate"
              value={formData.enrollmentEndDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettingsStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Settings & Preferences</h2>
      <p className="text-gray-500">Customize your account settings and preferences</p>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="allowEmployeePortal"
              name="allowEmployeePortal"
              type="checkbox"
              checked={formData.allowEmployeePortal}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="allowEmployeePortal" className="font-medium text-gray-700">Enable Employee Portal</label>
            <p className="text-gray-500">Allow employees to access the portal to enroll in benefits and manage their accounts</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="autoEnrollEmployees"
              name="autoEnrollEmployees"
              type="checkbox"
              checked={formData.autoEnrollEmployees}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="autoEnrollEmployees" className="font-medium text-gray-700">Auto-enroll New Employees</label>
            <p className="text-gray-500">Automatically enroll new employees when they are added to the system</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="sendWelcomeEmails"
              name="sendWelcomeEmails"
              type="checkbox"
              checked={formData.sendWelcomeEmails}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="sendWelcomeEmails" className="font-medium text-gray-700">Send Welcome Emails</label>
            <p className="text-gray-500">Send a welcome email to employees when they are added to the system</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Review Information</h2>
      <p className="text-gray-500">Please review all information below before submitting</p>
      
      <div className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <Building2 className="w-4 h-4 mr-2 text-gray-500" />
            Organization Information
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div className="sm:col-span-2">
              <dt className="text-xs text-gray-500">Organization Name</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.name || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Organization Type</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.type || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Industry</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.industry || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Size</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.size || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Tax ID / EIN</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.taxId || 'Not provided'}</dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            Contact Information
          </h3>
          <dl className="grid grid-cols-1 gap-y-2">
            <div>
              <dt className="text-xs text-gray-500">Address</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {formData.address ? (
                  <>
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </>
                ) : 'Not provided'}
              </dd>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              <div>
                <dt className="text-xs text-gray-500">Phone</dt>
                <dd className="text-sm font-medium text-gray-900 mt-1">{formData.phone || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Email</dt>
                <dd className="text-sm font-medium text-gray-900 mt-1">{formData.email || 'Not provided'}</dd>
              </div>
            </div>
            {formData.website && (
              <div>
                <dt className="text-xs text-gray-500">Website</dt>
                <dd className="text-sm font-medium text-gray-900 mt-1">{formData.website}</dd>
              </div>
            )}
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <Users className="w-4 h-4 mr-2 text-gray-500" />
            Primary Administrator
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div className="sm:col-span-2">
              <dt className="text-xs text-gray-500">Name</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {formData.adminFirstName && formData.adminLastName 
                  ? `${formData.adminFirstName} ${formData.adminLastName}` 
                  : 'Not provided'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Email</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.adminEmail || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Phone</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.adminPhone || 'Not provided'}</dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 flex items-center mb-3">
            <Shield className="w-4 h-4 mr-2 text-gray-500" />
            Secondary Administrator (Backup)
          </h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div className="sm:col-span-2">
              <dt className="text-xs text-gray-500">Name</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {formData.secondaryAdminFirstName && formData.secondaryAdminLastName 
                  ? `${formData.secondaryAdminFirstName} ${formData.secondaryAdminLastName}` 
                  : 'Not provided'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Email</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.secondaryAdminEmail || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Phone</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.secondaryAdminPhone || 'Not provided'}</dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Benefit Options</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <dt className="text-xs text-gray-500">Contribution Type</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">{formData.contributionType}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Monthly Contribution</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">${formData.contributionAmount || '0.00'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Plan Year</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {formData.planStartDate && formData.planEndDate 
                  ? `${new Date(formData.planStartDate).toLocaleDateString()} - ${new Date(formData.planEndDate).toLocaleDateString()}`
                  : 'Not provided'}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Enrollment Period</dt>
              <dd className="text-sm font-medium text-gray-900 mt-1">
                {formData.enrollmentStartDate && formData.enrollmentEndDate 
                  ? `${new Date(formData.enrollmentStartDate).toLocaleDateString()} - ${new Date(formData.enrollmentEndDate).toLocaleDateString()}`
                  : 'Not provided'}
              </dd>
            </div>
          </dl>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Settings & Preferences</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${formData.allowEmployeePortal ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={formData.allowEmployeePortal ? 'text-green-500' : 'text-red-500'}>
                  {formData.allowEmployeePortal ? '✓' : '✗'}
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-700">Enable Employee Portal</span>
            </li>
            <li className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${formData.autoEnrollEmployees ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={formData.autoEnrollEmployees ? 'text-green-500' : 'text-red-500'}>
                  {formData.autoEnrollEmployees ? '✓' : '✗'}
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-700">Auto-enroll New Employees</span>
            </li>
            <li className="flex items-center">
              <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${formData.sendWelcomeEmails ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className={formData.sendWelcomeEmails ? 'text-green-500' : 'text-red-500'}>
                  {formData.sendWelcomeEmails ? '✓' : '✗'}
                </span>
              </div>
              <span className="ml-2 text-sm text-gray-700">Send Welcome Emails</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderFormSuccessStep = () => (
    <div className="text-center py-12">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
        <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-gray-900">Organization Created Successfully!</h2>
      <p className="mt-2 text-gray-500">Your account has been created and is ready to use.</p>
      
      {/* Added button to manually go to dashboard instead of auto-redirect */}
      <div className="mt-8">
        <button
          onClick={() => navigate('/employer/dashboard')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (formComplete) {
      return renderFormSuccessStep();
    }
    
    switch (currentStep) {
      case 0:
        return renderOrganizationInfoStep();
      case 1:
        return renderContactInfoStep();
      case 2:
        return renderAdminUserStep();
      case 3:
        return renderSecondaryAdminStep();
      case 4:
        return renderBenefitOptionsStep();
      case 5:
        return renderSettingsStep();
      case 6:
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with better z-index */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex">
              <button
                onClick={prevStep}
                aria-label="Go back"
                className="mr-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <Logo />
            </div>
          </div>
        </div>
        
        {/* Mobile Step Indicator */}
        <div className="bg-blue-50 py-3 px-4 text-sm text-blue-800 border-b border-blue-200 block md:hidden">
          <span className="font-medium">Step {currentStep + 1} of {steps.length}:</span> {steps[currentStep]}
        </div>
      </header>
      
      <main className="flex-1 pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Desktop Progress Steps - Only visible on tablet and larger */}
          <div className="hidden md:block mb-12">
            <div className="relative">
              {/* Background track */}
              <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 rounded-full" />
              
              {/* Filled progress bar */}
              <div 
                className="absolute top-4 left-0 h-[2px] bg-blue-600 transition-all duration-500 ease-in-out rounded-full"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
              
              {/* Steps container */}
              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-200 ${
                        index < currentStep 
                          ? 'bg-blue-600 text-white' 
                          : index === currentStep 
                          ? 'bg-blue-600 text-white border-2 border-blue-600 scale-110 shadow-md' 
                          : 'bg-white text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {index < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span 
                      className={`mt-3 text-sm font-medium transition-colors duration-200 text-center ${
                        index === currentStep 
                          ? 'text-blue-600' 
                          : index < currentStep 
                          ? 'text-gray-600' 
                          : 'text-gray-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="z-10 relative">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              {renderStepContent()}
            </div>
            
            {/* Form Navigation */}
            {!formComplete && (
              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  {currentStep === 0 ? 'Cancel' : 'Previous'}
                </button>
                
                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Create Organization
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}