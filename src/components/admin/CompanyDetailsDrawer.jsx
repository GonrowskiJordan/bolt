import { useState, useEffect } from 'react';
import { X, Building2, Mail, Phone, Calendar, Save, CheckCircle, Link, Archive, User, Users, Info, Briefcase } from 'lucide-react';

export default function CompanyDetailsDrawer({ company, isOpen, onClose, onSave, onDelete }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    employerId: '',
    ein: '',
    industry: '',
    size: '',
    taxId: '',
    status: 'Active',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    
    // HR Contact
    hrContact: {
      firstName: '',
      lastName: '', 
      phone: '',
      email: '',
      position: ''
    },
    
    // Administrators
    admins: [
      { firstName: '', lastName: '', email: '', phone: '' },
      { firstName: '', lastName: '', email: '', phone: '' }
    ],
    
    // Enrollment Periods
    enrollmentPeriods: [
      { 
        id: '',
        year: '',
        name: 'Open Enrollment', 
        openDate: '',
        openTime: '',
        closeDate: '', 
        closeTime: '',
        effectiveDate: '',
        lossOfCoverageDate: '',
        currentGroupCarrier: '',
        status: 'Active' 
      }
    ],
    
    // Advisors
    advisors: [
      { firstName: '', lastName: '', email: '', phone: '', firm: '' }
    ]
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basicInfo: true,
    hrContact: false,
    administrators: false,
    enrollments: false,
    advisors: false
  });
  
  // State for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (company) {
      // Initialize form data with company data
      setFormData({
        // Basic Info
        name: company.name || '',
        employerId: company.employerId || '',
        ein: company.ein || '',
        industry: company.industry || '',
        size: company.size || '',
        taxId: company.taxId || '',
        status: company.status || 'Active',
        address: company.address || '',
        city: company.city || '',
        state: company.state || '',
        zipCode: company.zipCode || '',
        phone: company.phone || '',
        email: company.email || '',
        website: company.website || '',
        
        // HR Contact
        hrContact: company.hrContact || {
          firstName: '',
          lastName: '', 
          phone: '',
          email: '',
          position: ''
        },
        
        // Administrators
        admins: company.admins || [
          { firstName: '', lastName: '', email: '', phone: '' },
          { firstName: '', lastName: '', email: '', phone: '' }
        ],
        
        // Enrollment Periods
        enrollmentPeriods: company.enrollmentPeriods || [
          { 
            id: '',
            year: new Date().getFullYear().toString(),
            name: 'Open Enrollment', 
            openDate: '',
            openTime: '',
            closeDate: '', 
            closeTime: '',
            effectiveDate: '',
            lossOfCoverageDate: '',
            currentGroupCarrier: '',
            status: 'Active' 
          }
        ],
        
        // Advisors
        advisors: company.advisors || [
          { firstName: '', lastName: '', email: '', phone: '', firm: '' }
        ]
      });
    }
  }, [company]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
        setSaveSuccess(false);
        setShowDeleteConfirm(false);
        setDeleteConfirmInput('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHrContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      hrContact: {
        ...prev.hrContact,
        [field]: value
      }
    }));
  };

  const handleAdminChange = (index, field, value) => {
    const newAdmins = [...formData.admins];
    newAdmins[index] = {
      ...newAdmins[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      admins: newAdmins
    }));
  };

  const handleEnrollmentPeriodChange = (index, field, value) => {
    const newPeriods = [...formData.enrollmentPeriods];
    newPeriods[index] = {
      ...newPeriods[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      enrollmentPeriods: newPeriods
    }));
  };

  const handleAdvisorChange = (index, field, value) => {
    const newAdvisors = [...formData.advisors];
    newAdvisors[index] = {
      ...newAdvisors[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      advisors: newAdvisors
    }));
  };

  const handleAddEnrollmentPeriod = () => {
    setFormData(prev => ({
      ...prev,
      enrollmentPeriods: [
        ...prev.enrollmentPeriods,
        { 
          id: '',
          year: new Date().getFullYear().toString(),
          name: 'Open Enrollment', 
          openDate: '',
          openTime: '',
          closeDate: '', 
          closeTime: '',
          effectiveDate: '',
          lossOfCoverageDate: '',
          currentGroupCarrier: '',
          status: 'Scheduled' 
        }
      ]
    }));
  };

  const handleAddAdvisor = () => {
    setFormData(prev => ({
      ...prev,
      advisors: [
        ...prev.advisors,
        { firstName: '', lastName: '', email: '', phone: '', firm: '' }
      ]
    }));
  };

  const handleRemoveEnrollmentPeriod = (index) => {
    if (formData.enrollmentPeriods.length > 1) {
      const newPeriods = [...formData.enrollmentPeriods];
      newPeriods.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        enrollmentPeriods: newPeriods
      }));
    }
  };

  const handleRemoveAdvisor = (index) => {
    if (formData.advisors.length > 1) {
      const newAdvisors = [...formData.advisors];
      newAdvisors.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        advisors: newAdvisors
      }));
    }
  };

  const handleSubmit = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      if (onSave) {
        onSave(formData);
      }
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmInput === formData.name) {
      setIsDeleting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Employer deleted:', formData.name);
        setIsDeleting(false);
        onClose();
      }, 1500);
    }
  };

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 
    'Education', 'Hospitality', 'Construction', 'Transportation', 'Energy',
    'Agriculture', 'Professional Services', 'Entertainment', 'Non-profit', 
    'Sports & Recreation', 'Food & Beverage', 'Other'
  ];
  
  const organizationSizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', 
    '501-1000 employees', '1001-5000 employees', '5000+ employees'
  ];

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const carriers = [
    'Aetna', 'Anthem', 'Blue Cross Blue Shield', 'Cigna', 'Health Partners', 
    'Humana', 'Kaiser Permanente', 'UnitedHealthcare', 'None', 'Other'
  ];

  // Section rendering
  const renderSectionHeader = (title, icon, section) => (
    <div 
      className={`flex items-center justify-between py-3 border-b border-gray-200 cursor-pointer`}
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center">
        {icon}
        <h3 className="text-base font-medium text-gray-700 ml-2">{title}</h3>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        {expandedSections[section] ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );

  const renderBasicInfoSection = () => (
    <div className="mb-6">
      {renderSectionHeader("Basic Information", <Building2 className="h-5 w-5 text-gray-500" />, "basicInfo")}
      
      {expandedSections.basicInfo && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employer ID
              </label>
              <input
                type="text"
                value={formData.employerId}
                onChange={(e) => handleChange('employerId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
                disabled
                placeholder="Auto-generated UUID"
              />
              <p className="text-xs text-gray-500 mt-1">System generated ID</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                EIN / Tax ID
              </label>
              <input
                type="text"
                value={formData.ein || formData.taxId}
                onChange={(e) => {
                  handleChange('ein', e.target.value);
                  handleChange('taxId', e.target.value);
                }}
                placeholder="XX-XXXXXXX"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="">Select an industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={formData.size}
                onChange={(e) => handleChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="">Select employee count</option>
                {organizationSizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Street address, suite, etc."
            />
          </div>
          
          <div className="grid grid-cols-6 gap-3">
            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="">Select</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => handleChange('zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="(XXX) XXX-XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://www.example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderHrContactSection = () => (
    <div className="mb-6">
      {renderSectionHeader("HR Contact", <User className="h-5 w-5 text-gray-500" />, "hrContact")}
      
      {expandedSections.hrContact && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.hrContact.firstName}
                onChange={(e) => handleHrContactChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.hrContact.lastName}
                onChange={(e) => handleHrContactChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              value={formData.hrContact.position}
              onChange={(e) => handleHrContactChange('position', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="HR Manager, Benefits Administrator, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.hrContact.email}
              onChange={(e) => handleHrContactChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.hrContact.phone}
              onChange={(e) => handleHrContactChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderAdministratorsSection = () => (
    <div className="mb-6">
      {renderSectionHeader("Administrators", <Users className="h-5 w-5 text-gray-500" />, "administrators")}
      
      {expandedSections.administrators && (
        <div className="space-y-6 mt-4">
          {formData.admins.map((admin, index) => (
            <div key={index} className="space-y-4 pb-6 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700">
                {index === 0 ? 'Primary Administrator' : 'Secondary Administrator'}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={admin.firstName}
                    onChange={(e) => handleAdminChange(index, 'firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={admin.lastName}
                    onChange={(e) => handleAdminChange(index, 'lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  Email
                </label>
                <input
                  type="email"
                  value={admin.email}
                  onChange={(e) => handleAdminChange(index, 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1 flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={admin.phone}
                  onChange={(e) => handleAdminChange(index, 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="(XXX) XXX-XXXX"
                />
              </div>
            </div>
          ))}

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Info className="w-4 h-4 text-blue-500 mr-2" />
              <p className="text-xs text-gray-600">
                Administrators have full access to manage this employer account.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderEnrollmentsSection = () => (
    <div className="mb-6">
      {renderSectionHeader("Employer Enrollments", <Calendar className="h-5 w-5 text-gray-500" />, "enrollments")}
      
      {expandedSections.enrollments && (
        <div className="space-y-6 mt-4">
          {formData.enrollmentPeriods.map((period, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
              {formData.enrollmentPeriods.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEnrollmentPeriod(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Period Name
                    </label>
                    <input
                      type="text"
                      value={period.name}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      placeholder="e.g., Open Enrollment 2024"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Enrollment ID
                    </label>
                    <input
                      type="text"
                      value={period.id}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                      disabled
                      placeholder="Auto-generated UUID"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={period.year}
                    onChange={(e) => handleEnrollmentPeriodChange(index, 'year', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="YYYY"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Open Date
                    </label>
                    <input
                      type="date"
                      value={period.openDate}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'openDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <input
                      type="time"
                      value={period.openTime}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'openTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-2"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Close Date
                    </label>
                    <input
                      type="date"
                      value={period.closeDate}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'closeDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                    <input
                      type="time"
                      value={period.closeTime}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'closeTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Effective Date
                    </label>
                    <input
                      type="date"
                      value={period.effectiveDate}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'effectiveDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Loss of Coverage Date
                    </label>
                    <input
                      type="date"
                      value={period.lossOfCoverageDate}
                      onChange={(e) => handleEnrollmentPeriodChange(index, 'lossOfCoverageDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Current Group Carrier
                  </label>
                  <select
                    value={period.currentGroupCarrier}
                    onChange={(e) => handleEnrollmentPeriodChange(index, 'currentGroupCarrier', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="">Select carrier</option>
                    {carriers.map((carrier) => (
                      <option key={carrier} value={carrier}>{carrier}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Status
                  </label>
                  <select
                    value={period.status}
                    onChange={(e) => handleEnrollmentPeriodChange(index, 'status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddEnrollmentPeriod}
            className="w-full py-2 px-4 border border-gray-300 border-dashed rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            + Add Another Enrollment Period
          </button>
        </div>
      )}
    </div>
  );

  const renderAdvisorsSection = () => (
    <div className="mb-6">
      {renderSectionHeader("Advisors", <Briefcase className="h-5 w-5 text-gray-500" />, "advisors")}
      
      {expandedSections.advisors && (
        <div className="space-y-6 mt-4">
          {formData.advisors.map((advisor, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 relative">
              {formData.advisors.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAdvisor(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={advisor.firstName}
                      onChange={(e) => handleAdvisorChange(index, 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={advisor.lastName}
                      onChange={(e) => handleAdvisorChange(index, 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Firm/Agency
                  </label>
                  <input
                    type="text"
                    value={advisor.firm}
                    onChange={(e) => handleAdvisorChange(index, 'firm', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1 flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={advisor.email}
                    onChange={(e) => handleAdvisorChange(index, 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1 flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={advisor.phone}
                    onChange={(e) => handleAdvisorChange(index, 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="(XXX) XXX-XXXX"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddAdvisor}
            className="w-full py-2 px-4 border border-gray-300 border-dashed rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50"
          >
            + Add Another Advisor
          </button>
        </div>
      )}
    </div>
  );

  // Delete Confirmation Modal
  const renderDeleteConfirmation = () => (
    <div className="fixed inset-0 overflow-y-auto z-[60]">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <Archive className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Archive Employer</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-4">
                    This action will archive the employer <strong>{formData.name}</strong> and all associated data including employee records, enrollment data, and documents.
                  </p>
                  
                  <p className="text-sm text-gray-500 mb-2">
                    Please type <strong>{formData.name}</strong> to confirm archiving:
                  </p>
                  
                  <input
                    type="text"
                    value={deleteConfirmInput}
                    onChange={(e) => setDeleteConfirmInput(e.target.value)}
                    className="w-full px-3 py-2 border border-yellow-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500 text-sm"
                    placeholder={`Type "${formData.name}" to confirm`}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleteConfirmInput !== formData.name || isDeleting}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${
                deleteConfirmInput === formData.name ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-gray-400 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm`}
            >
              {isDeleting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Archiving...
                </>
              ) : (
                "Archive"
              )}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
            className={`relative w-screen max-w-lg transform transition-all duration-300 ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">{company ? `${company.name}` : 'Company Details'}</h2>
                  <p className="text-sm text-gray-500">
                    View and edit company information
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
                {saveSuccess && (
                  <div className="mb-4 p-4 bg-green-50 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Company information saved successfully!
                      </p>
                    </div>
                  </div>
                )}

                {/* Vertically stacked sections */}
                {renderBasicInfoSection()}
                {renderHrContactSection()}
                {renderAdministratorsSection()}
                {renderEnrollmentsSection()}
                {renderAdvisorsSection()}
                
                {/* Archive Employer Button */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Archive Employer
                  </button>
                  <p className="mt-2 text-xs text-center text-gray-500">
                    This will archive this employer and all associated data
                  </p>
                </div>
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
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render Delete Confirmation Modal */}
      {showDeleteConfirm && renderDeleteConfirmation()}
    </div>
  );
}