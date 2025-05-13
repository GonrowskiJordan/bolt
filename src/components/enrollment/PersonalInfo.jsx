import { useState } from 'react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

export default function PersonalInfo({ onNext, onBack }) {
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [formData, setFormData] = useState({
    firstName: 'Thalia',
    lastName: 'Lorne',
    email: 'thalia.lorne@example.com',
    phone: '(208) 994-4625',
    ssn: '123456789',
    dateOfBirth: '1963-11-10',
    address: {
      street: '1234 Maple Avenue',
      unit: 'Apt 11',
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55401'
    }
  });

  const handleChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isConfirmed) {
      onNext();
    }
  };

  return (
    <form className="relative bg-white rounded-lg shadow-sm p-6 mt-8" onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
          <p className="text-sm text-gray-500 mt-1">Please verify and update your information below</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm text-gray-600 mb-1">
                First Name<span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                disabled
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm text-gray-600 mb-1">
                Last Name<span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                disabled
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                disabled
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                Phone Number<span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm text-gray-600 mb-1">
                Date of Birth<span className="text-red-500">*</span>
              </label>
              <input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 bg-gray-50"
                disabled
                required
              />
            </div>
          </div>
        </div>

        {/* SSN */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Social Security Number</h3>
          <div className="max-w-md">
            <input
              id="ssn"
              type="text"
              value={formData.ssn}
              onChange={(e) => handleChange('ssn', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your SSN"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Required for insurance enrollment</p>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Address</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="street" className="block text-sm text-gray-600 mb-1">
                Street Address<span className="text-red-500">*</span>
              </label>
              <input
                id="street"
                type="text"
                value={formData.address.street}
                onChange={(e) => handleChange('address.street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="unit" className="block text-sm text-gray-600 mb-1">
                Apartment/Suite/Unit
              </label>
              <input
                id="unit"
                type="text"
                value={formData.address.unit}
                onChange={(e) => handleChange('address.unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 sm:col-span-6">
                <label htmlFor="city" className="block text-sm text-gray-600 mb-1">
                  City<span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => handleChange('address.city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label htmlFor="state" className="block text-sm text-gray-600 mb-1">
                  State<span className="text-red-500">*</span>
                </label>
                <input
                  id="state"
                  type="text"
                  value={formData.address.state}
                  onChange={(e) => handleChange('address.state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div className="col-span-8 sm:col-span-4">
                <label htmlFor="zipCode" className="block text-sm text-gray-600 mb-1">
                  ZIP Code<span className="text-red-500">*</span>
                </label>
                <input
                  id="zipCode"
                  type="text"
                  value={formData.address.zipCode}
                  onChange={(e) => handleChange('address.zipCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Incorrect Information Section */}
      <div className="mt-8 pt-6 border-t">
        <Checkbox
          id="confirm-info"
          checked={isConfirmed}
          onChange={setIsConfirmed}
          label="I confirm that all the information above is accurate and up to date"
        />
      </div>

      <div className="relative flex justify-between mt-8 pt-6 border-t">
        <button
          onClick={onBack}
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <Button type="submit" variant="primary" disabled={!isConfirmed}>
          Save and continue
        </Button>
      </div>
    </form>
  );
}