import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../Button';

const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Family Medicine', location: 'Minneapolis, MN', network: 'In-Network' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Internal Medicine', location: 'St. Paul, MN', network: 'In-Network' },
  { id: 3, name: 'Dr. James Anderson', specialty: 'Family Medicine', location: 'Eden Prairie, MN', network: 'Out-of-Network' },
  { id: 4, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', location: 'Bloomington, MN', network: 'In-Network' },
  { id: 5, name: 'Dr. David Kim', specialty: 'Internal Medicine', location: 'Minneapolis, MN', network: 'In-Network' }
];

export default function DoctorSearch({ onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([
    {
      id: 1,
      name: 'CHARLES EDWARD SMITH',
      specialty: 'Family Medicine'
    }
  ]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const filtered = mockDoctors.filter(doctor =>
        doctor.name.toLowerCase().includes(value.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddDoctor = (doctor) => {
    if (!selectedDoctors.find(d => d.id === doctor.id)) {
      setSelectedDoctors([...selectedDoctors, doctor]);
    }
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleRemoveDoctor = (doctorId) => {
    setSelectedDoctors(selectedDoctors.filter(doctor => doctor.id !== doctorId));
  };

  return (
    <div className="bg-white rounded-lg shadow mt-8 overflow-hidden">
      <div className="border-b border-gray-200 p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Find Your Doctors</h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Tell us which doctors you'd like to continue seeing so we can help you find a matching health plan.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Search Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Search for your doctors
            </label>
            <p className="text-xs text-gray-500 italic sm:text-right">
              Note: Provider information may not be up to date. Please verify with your doctor's office.
            </p>
          </div>
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter doctor name or specialty"
                className="pl-9 sm:pl-10 w-full border border-gray-300 rounded-md py-2 sm:py-3 px-3 sm:px-4 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
                <ul className="py-1">
                  {searchResults.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="px-3 sm:px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAddDoctor(doctor)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.specialty}</p>
                          <p className="text-xs text-gray-400 hidden sm:block">{doctor.location}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          doctor.network === 'In-Network'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {doctor.network}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Selected Doctors */}
        <div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4">Selected Doctors</h3>
          {selectedDoctors.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {selectedDoctors.map((doctor) => (
                <div 
                  key={doctor.id}
                  className="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200"
                >
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">{doctor.name}</h4>
                    <p className="text-xs text-gray-500">{doctor.specialty}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveDoctor(doctor.id)}
                    className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">
                No doctors selected yet. Use the search above to add your doctors.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={onBack}
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <Button variant="primary" size="sm" onClick={onNext}>
          Save and continue
        </Button>
      </div>
    </div>
  );
}