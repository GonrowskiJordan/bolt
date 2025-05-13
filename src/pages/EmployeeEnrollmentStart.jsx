import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Frown } from 'lucide-react';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import OptOutModal from '../components/enrollment/OptOutModal';

export default function EmployeeEnrollmentStart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOptOutModalOpen, setIsOptOutModalOpen] = useState(false);
  const optedOut = location.state?.optedOut;
  
  // If the user navigates back after opting out, show the opted-out view
  if (optedOut) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, Thalia Lorne</h1>
            <p className="text-gray-600 mb-12">
              Open enrollment period: Jan 4, 2025 13:00 PM - Dec 31, 2025 00:59 AM
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-12 mb-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Frown className="w-10 h-10 text-gray-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">You've opted-out of the HRA your employer is offering.</h2>
              <p className="text-gray-600 mb-8">Want to reconsider? Simply click down below to change your choice.</p>
              <button
                onClick={() => navigate('/employee', { state: {} })}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Enroll for coverage
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = 0;

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-purple-600" />
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Make Your Choice</h2>
          <p className="text-gray-600 mb-8">
            Your employer is offering you a health benefits package. Please choose whether you'd like to explore your insurance options or decline coverage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <button
              onClick={() => navigate('/employee/dashboard')}
              className="flex-1 px-6 py-4 bg-purple-600 text-white rounded-lg transform transition-all duration-200 shadow-sm hover:bg-purple-700 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] font-medium"
            >
              I want to explore health insurance options
            </button>

            <button
              onClick={() => setIsOptOutModalOpen(true)}
              className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-lg transform transition-all duration-200 hover:bg-gray-50 hover:border-gray-400 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] font-medium"
            >
              I do not want insurance
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Note: Declining coverage means you won't be able to enroll until the next open enrollment period unless you experience a qualifying life event.
          </p>
        </div>
      </div>

      <OptOutModal
        isOpen={isOptOutModalOpen}
        onClose={() => setIsOptOutModalOpen(false)}
      />
    </EnrollmentLayout>
  );
}