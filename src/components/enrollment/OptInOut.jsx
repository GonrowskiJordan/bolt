import { Calendar } from 'lucide-react';
import { Button } from '../Button';

const BENEFITS_FEATURES = [
  'Choose your own individual health insurance plan',
  'Receive tax-free reimbursements for qualified expenses',
  'Maintain coverage that best fits your needs'
];

export default function OptInOut({ onOptIn, onOptOut }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Calendar className="w-10 h-10 text-purple-600" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Would you like to enroll in health benefits?</h2>
        <p className="text-gray-600 mb-6">
          Your employer is offering an Individual Coverage Health Reimbursement Arrangement (ICHRA) benefit that allows you to:
        </p>
        
        <ul className="mb-8 space-y-2">
          {BENEFITS_FEATURES.map((feature, index) => (
            <li key={index} className="text-gray-600 flex items-center justify-center">
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Button
            variant="primary"
            size="xl"
            fullWidth
            onClick={onOptIn}
            className="group relative"
          >
            Yes, show me options
            <span className="absolute inset-0 flex items-center justify-center bg-purple-700 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-lg">
              Let's get started →
            </span>
          </Button>

          <Button
            variant="secondary"
            size="xl"
            fullWidth
            onClick={onOptOut}
          >
            No, I want to decline
          </Button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
          <strong className="block mb-1">Important Note:</strong>
          Note: Declining coverage means you won't be able to enroll until the next open enrollment period unless you experience a qualifying life event.
        </div>
      </div>
    </div>
  );
}