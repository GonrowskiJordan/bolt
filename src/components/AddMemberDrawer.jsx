import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AddMemberDrawer({ isOpen, onClose, onSubmit, memberToEdit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    state: '',
    zipCode: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    isTobaccoUser: '',
    ssn: '',
    relationship: ''
  });

  useEffect(() => {
    if (memberToEdit) {
      setFormData({
        firstName: memberToEdit.firstName || '',
        middleName: memberToEdit.middleName || '',
        lastName: memberToEdit.lastName || '',
        address: memberToEdit.address || '',
        state: memberToEdit.state || '',
        zipCode: memberToEdit.zipCode || '',
        phone: memberToEdit.phone || '',
        gender: memberToEdit.gender || '',
        dateOfBirth: memberToEdit.dateOfBirth || '',
        isTobaccoUser: memberToEdit.isTobaccoUser || '',
        ssn: memberToEdit.ssn || '',
        relationship: memberToEdit.type === 'Spouse' ? 'spouse' : 'dependent'
      });
    }
  }, [memberToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.relationship) {
      onSubmit(memberToEdit ? { ...formData, id: memberToEdit.id } : formData);
      setFormData({
        firstName: '', middleName: '', lastName: '', address: '',
        state: '', zipCode: '', phone: '', gender: '',
        dateOfBirth: '', isTobaccoUser: '', ssn: '',
        relationship: ''
      });
    }
  };

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
      className={`fixed inset-0 overflow-hidden transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`} 
      style={{ zIndex: 9999 }}
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
                  <h2 className="text-lg font-medium text-gray-900">{memberToEdit ? 'Edit member' : 'New member'}</h2>
                  <p className="text-sm text-gray-500">
                    {memberToEdit 
                      ? 'Edit family member details' 
                      : 'Add a new family member that you\'ll cover with your plan.'}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Legal Name<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="First"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <span className="text-xs text-gray-500">First</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Middle"
                          value={formData.middleName}
                          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <span className="text-xs text-gray-500">Middle</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <span className="text-xs text-gray-500">Last</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-3">
                        <input
                          type="text"
                          placeholder="Address"
                          disabled
                          className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <span className="text-xs text-gray-500">Address</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="State"
                          disabled
                          className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <span className="text-xs text-gray-500">State</span>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Zip Code"
                          disabled
                          className="w-full bg-gray-50 border border-gray-300 rounded-md px-3 py-2 text-sm"
                        />
                        <span className="text-xs text-gray-500">Zip Code</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Biological Gender<span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          className="h-4 w-4 text-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          className="h-4 w-4 text-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Female</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tobacco User<span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="tobacco"
                          value="yes"
                          className="h-4 w-4 text-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="tobacco"
                          value="no"
                          className="h-4 w-4 text-purple-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Social Security Number<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship<span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="relationship"
                          value="spouse"
                          className="h-4 w-4 text-purple-600"
                          onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Spouse</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="relationship"
                          value="dependent"
                          className="h-4 w-4 text-purple-600"
                          onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                        />
                        <span className="ml-2 text-sm text-gray-700">Dependent</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4">
                    <button
                      type="submit"
                      disabled={!formData.firstName || !formData.lastName || !formData.relationship}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 rounded-md"
                    >
                      Add Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}