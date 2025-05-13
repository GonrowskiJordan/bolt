import { useNavigate } from 'react-router-dom';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import AgreementsComponent from '../components/enrollment/Agreements';

export default function Agreements({ step = 'terms' }) {
  const navigate = useNavigate();
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = step === 'terms' ? 3 : 4;

  const handleNext = () => {
    if (step === 'terms') {
      navigate('/employee/enrollment/authorization');
    } else {
      navigate('/employee/enrollment/shop');
    }
  };

  const handleBack = () => {
    if (step === 'terms') {
      navigate('/employee/enrollment/family');
    } else {
      navigate('/employee/enrollment/terms');
    }
  };

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <AgreementsComponent
        step={step}
        onNext={handleNext}
        onBack={handleBack}
      />
    </EnrollmentLayout>
  );
}