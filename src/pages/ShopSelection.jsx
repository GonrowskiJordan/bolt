import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import HealthSherpaEmbed from '../components/enrollment/HealthSherpaEmbed';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import CalendlyModal from '../components/enrollment/CalendlyModal';

export default function ShopSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHealthSherpa, setShowHealthSherpa] = useState(location?.state?.showHealthSherpa || false);
  const [showCalendly, setShowCalendly] = useState(false);
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = 5;

  const handlePlanSelect = (plan) => {
    console.log('Selected plan:', plan);
    navigate('/employee/coverage');
  };

  if (showHealthSherpa) {
    return (
      <HealthSherpaEmbed
        onBack={() => setShowHealthSherpa(false)}
        onPlanSelect={handlePlanSelect}
      />
    );
  }

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Choose How to Shop for Health Insurance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1: Shop Myself */}
          <div className="border-2 border-indigo-100 rounded-xl p-6 hover:border-indigo-500 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Shop Myself</h3>
            <p className="text-gray-600 mb-4">Browse and compare health plans on your own</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span className="text-sm text-gray-600">Compare plans side-by-side</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span className="text-sm text-gray-600">Filter by price, coverage, and network</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 font-bold mr-2">•</span>
                <span className="text-sm text-gray-600">Enroll directly online</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowHealthSherpa(true)}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Continue to Marketplace
            </button>
          </div>
          
          {/* Option 2: Get Help */}
          <div className="border-2 border-purple-100 rounded-xl p-6 hover:border-purple-500 hover:shadow-md transition-all">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Get Help from an Advisor</h3>
            <p className="text-gray-600 mb-4">Schedule a call with a licensed benefits advisor</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-2">•</span>
                <span className="text-sm text-gray-600">Get personalized recommendations</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-2">•</span>
                <span className="text-sm text-gray-600">Ask questions about coverage options</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 font-bold mr-2">•</span>
                <span className="text-sm text-gray-600">Receive help with enrollment process</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowCalendly(true)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Schedule a Call
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button 
              onClick={() => navigate('/employee/enrollment/authorization')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </div>
      
      <CalendlyModal 
        isOpen={showCalendly} 
        onClose={() => setShowCalendly(false)} 
        onSchedule={() => {
          setShowCalendly(false);
          setTimeout(() => navigate('/employee/coverage'), 500);
        }}
      />
    </EnrollmentLayout>
  );
}