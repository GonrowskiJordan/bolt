import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';

export default function Agreements({ onNext, onBack, step = 'terms' }) {
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [agentConsent, setAgentConsent] = useState(true);
  const [effectUntilRevoked, setEffectUntilRevoked] = useState(true);
  const [informationAccuracy, setInformationAccuracy] = useState(true);
  const [signature] = useState({ 
    firstName: 'Thalia',
    lastName: 'Lorne'
  });

  const canContinue = step === 'terms' ? termsAccepted : (agentConsent && effectUntilRevoked && informationAccuracy);

  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 mt-8">
      {step === 'terms' ? (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Terms and Conditions</h2>
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4 h-48 sm:h-64 overflow-y-auto mb-4 text-sm text-gray-600">
            <h3 className="font-medium mb-2">TERMS OF USE</h3>
            <p className="mb-4">
              Savii Co., a Delaware corporation, welcomes you to our website (the "Site") and the applications and services available from us, through the Site or other platforms (collectively with the Site, the "Services"). Your use of the Site and the Services are governed by these Terms of Use (these "Terms").
            </p>
            <p className="mb-4">
              Any time you browse the Site or use the Services in any way, you agree to be bound by these Terms. If you don't agree to these Terms, do not use the Site or the Services.
            </p>
            <p>
              Your use of the Services is also subject to our Privacy Notice, which is located on the Site, as well as any policies and procedures we publish from time to time.
            </p>
          </div>
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onChange={setTermsAccepted}
            label="I have read and accepted the terms and conditions"
          />
        </div>
      ) : (

        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Employee Consent and Advisor Authorization</h2>
          <div className="space-y-4">
            <Checkbox
              id="agentConsent"
              checked={agentConsent}
              onChange={setAgentConsent}
              label="I have given consent to my licensed advisor to serve as the agent for myself and my entire household if applicable, for purposes of enrollment in a Qualified Health Plan on or off exchange, and have authorized my agent to complete the application process and apply my electronic signature. Your advisor helps you choose and enroll in a health plan. You're authorizing them to act on your behalf during the process."
            />

            <Checkbox
              id="effectUntilRevoked"
              checked={effectUntilRevoked}
              onChange={setEffectUntilRevoked}
              label="I understand that my consent remains in effect until I revoke it."
            />

            <Checkbox
              id="informationAccuracy"
              checked={informationAccuracy}
              onChange={setInformationAccuracy}
              label="I confirm that the information I provided in writing, electronically, or via telephone for entry is true to the best of my knowledge."
            />

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Signature</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={signature.firstName}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm text-gray-600 mb-1">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={signature.lastName}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Signature collected at: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="relative flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
        <button
          onClick={onBack}
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={onNext}
          disabled={!canContinue}
        >
          Save and continue
        </Button>
      </div>
    </div>
  );
}