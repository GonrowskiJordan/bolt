import { useState, useEffect } from 'react';
import { X, Mail, Phone, Calendar, Save, CheckCircle, Link, Trash2 } from 'lucide-react';

export default function AdvisorDetailsDrawer({ advisor, isOpen, onClose, onSave, onDelete }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    calendlyLink: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Add state for delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (advisor) {
      setFormData({
        firstName: advisor.firstName || '',
        lastName: advisor.lastName || '',
        email: advisor.email || '',
        phone: advisor.phone || '',
        calendlyLink: advisor.calendlyLink || '',
      });
    }
  }, [advisor]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
        setSaveSuccess(false);
        // Reset delete confirmation when drawer closes
        setShowDeleteConfirm(false);
        setDeleteConfirmInput('');
        setIsDeleting(false);
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

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      if (onSave) {
        onSave({
          ...advisor,
          ...formData
        });
      }
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 800);
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
          onDelete(advisor.id);
        }
        onClose();
      }, 1000);
    }
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
                    {advisor ? `Edit Advisor` : 'Advisor Details'}
                  </h2>
                  {advisor && (
                    <p className="text-sm text-gray-500">
                      Update advisor information
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

              <div className="flex-1 overflow-y-auto p-6">
                {saveSuccess && (
                  <div className="mb-4 p-4 bg-green-50 rounded-md flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Advisor information saved successfully!
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-700 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-700 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-700 mb-1 flex items-center">
                          <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" />
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-700 mb-1 flex items-center">
                          <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" />
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                          placeholder="(XXX) XXX-XXXX"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Scheduling Information */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Scheduling Information</h3>
                    <div>
                      <label className="block text-xs text-gray-700 mb-1 flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        Calendly Link
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          <Link className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          value={formData.calendlyLink}
                          onChange={(e) => handleChange('calendlyLink', e.target.value)}
                          className="w-full border border-gray-300 rounded-r-md px-3 py-2 text-sm"
                          placeholder="calendly.com/username"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the full Calendly link for scheduling appointments.
                      </p>
                    </div>
                  </div>
                  
                  {/* Delete Advisor Button */}
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Advisor
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-500">
                      This will permanently remove this advisor and all associated data
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
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
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
                      Delete Advisor
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this advisor? This action cannot be undone.
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