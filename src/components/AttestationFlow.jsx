import { useState, useCallback } from 'react';
import { Check, X, AlertCircle } from 'lucide-react';
import { submitAttestation } from '../utils/supabase';

export default function AttestationFlow({ onClose, onSubmit, employeeData }) {
  const [choice, setChoice] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!choice || !confirmed) return;
    
    setError(null);
    setIsSubmitting(true);
    
    try {
      const attestationData = {
        status: choice,
        planYear: new Date().getFullYear().toString(),
        metadata: {
          employeeId: employeeData.id,
          timestamp: new Date().toISOString()
        }
      };
      
      const result = await submitAttestation(attestationData);
      onSubmit(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [choice, confirmed, employeeData.id, onSubmit]);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Important Information
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Your employer is offering an Individual Coverage Health Reimbursement
                Arrangement (ICHRA) benefit. This allows you to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Choose your own individual health insurance plan</li>
                <li>Receive tax-free reimbursements for qualified expenses</li>
                <li>Maintain coverage that best fits your needs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Make Your Choice</h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setChoice('opt-in')}
            className={`p-4 rounded-lg border-2 text-left ${
              choice === 'opt-in'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start">
              <div className={`rounded-full p-1 ${
                choice === 'opt-in' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Check className={`w-4 h-4 ${
                  choice === 'opt-in' ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Opt In</p>
                <p className="text-sm text-gray-500">
                  I want to participate in the ICHRA benefit
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setChoice('opt-out')}
            className={`p-4 rounded-lg border-2 text-left ${
              choice === 'opt-out'
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start">
              <div className={`rounded-full p-1 ${
                choice === 'opt-out' ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <X className={`w-4 h-4 ${
                  choice === 'opt-out' ? 'text-red-600' : 'text-gray-400'
                }`} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">Opt Out</p>
                <p className="text-sm text-gray-500">
                  I decline to participate in the ICHRA benefit
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border-t border-gray-200 pt-4">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="ml-3 text-sm text-gray-500">
              I understand that this decision is binding for the current plan year unless
              I experience a qualifying life event. I confirm that I have reviewed all
              relevant benefit information and understand my choice.
            </span>
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!choice || !confirmed || isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm ${
              choice && confirmed && !isSubmitting
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Decision'}
          </button>
        </div>
      </div>
    </div>
  );
}