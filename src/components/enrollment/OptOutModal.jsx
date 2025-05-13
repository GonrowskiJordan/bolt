import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { useNavigate } from 'react-router-dom';

export default function OptOutModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    termsAccepted: false,
    optOutConfirmed: false,
    acknowledgementOne: false,
    acknowledgementTwo: false
  });

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

  const canProceed = formData.firstName && 
                    formData.lastName && 
                    formData.termsAccepted && 
                    formData.optOutConfirmed && 
                    formData.acknowledgementOne && 
                    formData.acknowledgementTwo;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (canProceed) {
      // Close the modal first to avoid z-index issues during navigation
      onClose();
      navigate('/employee', { 
        state: { 
          optedOut: true
        }
      });
    }
  };

  return (
    <div className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 bg-gray-500 bg-opacity-75 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`} 
    style={{ zIndex: 9999 }}>
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
        <div className="fixed inset-0 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-2xl w-full mx-auto shadow-xl m-2">
          <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Opt Out of Coverage</h2>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm">
              Please review and acknowledge the following statements to opt out of ICHRA coverage.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked }))}
                  label="I have read and accepted the terms and conditions"
                />

                <Checkbox
                  id="opt-out"
                  checked={formData.optOutConfirmed}
                  onChange={(checked) => setFormData(prev => ({ ...prev, optOutConfirmed: checked }))}
                  label="I hereby elect to opt out of coverage under the ICHRA for the 2024 plan year."
                />

                <Checkbox
                  id="acknowledgement-1"
                  checked={formData.acknowledgementOne}
                  onChange={(checked) => setFormData(prev => ({ ...prev, acknowledgementOne: checked }))}
                  label="I acknowledge that if I have elected to opt out of participation in the ICHRA that my election to opt out is irrevocable until the beginning of the following plan year, at which time my election will automatically expire."
                />

                <Checkbox
                  id="acknowledgement-2"
                  checked={formData.acknowledgementTwo}
                  onChange={(checked) => setFormData(prev => ({ ...prev, acknowledgementTwo: checked }))}
                  label="I further acknowledge any otherwise eligible expenses I incur during the plan year for which my opt out election is effective will not be reimbursed by the ICHRA even if I become a participant in the ICHRA in the future."
                />
              </div>

              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Signature</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm text-gray-600 mb-1">
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    />
                  </div>
                </div>
                {formData.firstName && formData.lastName && (
                  <p className="mt-2 text-xs sm:text-sm text-gray-500">
                    Signature Must Match Your Name on Record: {formData.firstName} {formData.lastName}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-2 sm:space-x-3">
                <Button variant="secondary" size="sm" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={!canProceed}
                >
                  Proceed
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}