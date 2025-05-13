import { useState } from 'react';
import { Calculator, Upload, Calendar, DollarSign, MapPin, Users } from 'lucide-react';
import PlatformAdminSideNav from '../../components/admin/PlatformAdminSideNav';

export default function FeasibilityTool() {
  const [formData, setFormData] = useState({
    zipCode: '',
    effectiveDate: '',
    bronzeCost: '',
    silverCost: '',
    goldCost: '',
    ageRangeSize: '',
    censusFile: null
  });

  const [fileSelected, setFileSelected] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      censusFile: file
    }));
    setFileSelected(!!file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate API call/calculation
    setTimeout(() => {
      setIsCalculating(false);
      setResults({
        feasible: Math.random() > 0.3, // Random result for demo purposes
        monthlySavings: (Math.random() * 10000 + 5000).toFixed(2),
        annualSavings: (Math.random() * 120000 + 60000).toFixed(2),
        affordablePercentage: (Math.random() * 30 + 70).toFixed(1) + '%',
        recommendations: [
          'Implement standard ICHRA with $400 monthly contribution',
          'Consider age-based contribution strategy',
          'Offer enrollment assistance through broker network'
        ]
      });
    }, 1500);
  };

  return (
    <div className="flex h-screen">
      <PlatformAdminSideNav currentPath="/admin/utility" />
      <div className="flex-1 ml-[200px] p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">ICHRA Feasibility Tool</h1>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Inputs</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    Employer's Zip Code:
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="effectiveDate" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    Enrollment Effective Date:
                  </label>
                  <input
                    type="date"
                    id="effectiveDate"
                    name="effectiveDate"
                    value={formData.effectiveDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="bronzeCost" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    Lowest Cost Bronze Plan Available (14yo) - Monthly Cost:
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      id="bronzeCost"
                      name="bronzeCost"
                      value={formData.bronzeCost}
                      onChange={handleInputChange}
                      className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="silverCost" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    Lowest Cost Silver Plan Available (14yo) - Monthly Cost:
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      id="silverCost"
                      name="silverCost"
                      value={formData.silverCost}
                      onChange={handleInputChange}
                      className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="goldCost" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                    Lowest Cost Gold Plan Available (14yo) - Monthly Cost:
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      id="goldCost"
                      name="goldCost"
                      value={formData.goldCost}
                      onChange={handleInputChange}
                      className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ageRangeSize" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Users className="w-4 h-4 mr-1 text-gray-400" />
                    Age Range Size:
                  </label>
                  <input
                    type="number"
                    id="ageRangeSize"
                    name="ageRangeSize"
                    value={formData.ageRangeSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="censusFile" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Upload className="w-4 h-4 mr-1 text-gray-400" />
                    Census Spreadsheet:
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">{fileSelected ? 'File selected' : 'or drag and drop'}</p>
                      </div>
                      <p className="text-xs text-gray-500">Excel or CSV up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-5 w-5" />
                        Calculate Feasibility
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {results && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-indigo-600" />
                Feasibility Results
              </h2>
              
              <div className="mb-6 p-4 rounded-lg border-l-4 border-l-solid border-l-gray-300 bg-gray-50">
                <div className="text-lg font-semibold mb-2">
                  {results.feasible ? (
                    <span className="text-green-600">✓ ICHRA is feasible for this employer</span>
                  ) : (
                    <span className="text-red-600">✗ ICHRA may not be optimal for this employer</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Based on the input data, our analysis indicates {results.feasible ? 
                    "an ICHRA would be beneficial for this employer and their employees." : 
                    "a traditional group health plan may be more suitable for this employer."}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-900 mb-2">Estimated Monthly Savings</h3>
                  <p className="text-2xl font-bold text-indigo-700">${results.monthlySavings}</p>
                  <p className="text-xs text-indigo-600 mt-1">vs. traditional group plan</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-900 mb-2">Estimated Annual Savings</h3>
                  <p className="text-2xl font-bold text-indigo-700">${results.annualSavings}</p>
                  <p className="text-xs text-indigo-600 mt-1">projected over 12 months</p>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-900 mb-2">Affordable Coverage Rate</h3>
                  <p className="text-2xl font-bold text-indigo-700">{results.affordablePercentage}</p>
                  <p className="text-xs text-indigo-600 mt-1">of employees have affordable options</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {results.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 font-bold mr-2">•</span>
                      <span className="text-gray-700">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Download Full Report (PDF)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}