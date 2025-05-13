import { Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';

const coverageDetails = {
  plan: 'Premium Health Plan',
  type: 'Individual',
  status: 'Active',
  startDate: 'Jan 1, 2024',
  premium: '$350/month',
  deductible: '$1,500',
  outOfPocket: '$4,000'
};

const contactInfo = {
  advisor: {
    name: 'Sarah Johnson',
    title: 'Licensed Benefits Advisor',
    phone: '(612) 555-0123',
    email: 'sarah.johnson@savii.com',
    availability: 'Mon-Fri, 9am-5pm CT'
  },
  hr: {
    name: 'Michael Chen',
    title: 'HR Benefits Specialist',
    phone: '(612) 555-0456',
    email: 'mchen@company.com',
    availability: 'Mon-Fri, 8am-4pm CT'
  },
  concierge: {
    name: 'Savii Concierge Team',
    phone: '(800) 555-7890',
    email: 'concierge@savii.com',
    availability: '24/7 Support',
    response: 'Typical response time: 15 minutes'
  }
};

export default function Coverage() {
  const navigate = useNavigate();
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = 6;

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-8">
          <div className="mb-4 sm:mb-6 relative">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Coverage Details</h1>
                <p className="text-xs sm:text-sm text-gray-500">View and manage your health coverage</p>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(coverageDetails).map(([key, value]) => (
                <div key={key} className="px-3 sm:px-4 py-3 sm:py-5 bg-gray-50 rounded-lg overflow-hidden">
                  <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </dt>
                  <dd className="mt-1 text-base sm:text-lg font-semibold text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
            
            {/* Contact Information */}
            <div className="mt-8 sm:mt-12 space-y-6 sm:space-y-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Support Contacts</h2>
              
              {/* Advisor Contact */}
              <div className="bg-purple-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-purple-900 mb-3 sm:mb-4">Your Benefits Advisor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm sm:text-base font-medium text-purple-900">{contactInfo.advisor.name}</p>
                    <p className="text-xs sm:text-sm text-purple-700">{contactInfo.advisor.title}</p>
                    <div className="mt-1 sm:mt-2 space-y-1">
                      <p className="text-xs sm:text-sm text-purple-700">{contactInfo.advisor.phone}</p>
                      <p className="text-xs sm:text-sm text-purple-700">{contactInfo.advisor.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-purple-700">Available:</p>
                    <p className="text-xs sm:text-sm font-medium text-purple-900">{contactInfo.advisor.availability}</p>
                  </div>
                </div>
              </div>

              {/* HR Contact */}
              <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-blue-900 mb-3 sm:mb-4">HR Benefits Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm sm:text-base font-medium text-blue-900">{contactInfo.hr.name}</p>
                    <p className="text-xs sm:text-sm text-blue-700">{contactInfo.hr.title}</p>
                    <div className="mt-1 sm:mt-2 space-y-1">
                      <p className="text-xs sm:text-sm text-blue-700">{contactInfo.hr.phone}</p>
                      <p className="text-xs sm:text-sm text-blue-700">{contactInfo.hr.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-blue-700">Available:</p>
                    <p className="text-xs sm:text-sm font-medium text-blue-900">{contactInfo.hr.availability}</p>
                  </div>
                </div>
              </div>

              {/* Savii Concierge */}
              <div className="bg-green-50 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-green-900 mb-3 sm:mb-4">Savii Concierge Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-sm sm:text-base font-medium text-green-900">{contactInfo.concierge.name}</p>
                    <div className="mt-1 sm:mt-2 space-y-1">
                      <p className="text-xs sm:text-sm text-green-700">{contactInfo.concierge.phone}</p>
                      <p className="text-xs sm:text-sm text-green-700">{contactInfo.concierge.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-green-700">Available:</p>
                    <p className="text-xs sm:text-sm font-medium text-green-900">{contactInfo.concierge.availability}</p>
                    <p className="text-xs sm:text-sm text-green-700 mt-1">{contactInfo.concierge.response}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
              <button 
                onClick={() => navigate('/employee/enrollment/shop', { state: { showHealthSherpa: true } })}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </EnrollmentLayout>
  );
}