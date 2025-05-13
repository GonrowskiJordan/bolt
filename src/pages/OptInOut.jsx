import { useNavigate } from 'react-router-dom';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import OptInOutComponent from '../components/enrollment/OptInOut';

export default function OptInOut() {
  const navigate = useNavigate();
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Agreements', 'Select a plan', 'Summary'];
  const currentStep = 0;

  const handleDecline = () => {
    // TODO: Implement decline flow
    alert('You have declined coverage. You will not be able to enroll until the next open enrollment period unless you experience a qualifying life event.');
  };

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <OptInOutComponent
        onOptIn={() => navigate('/employee/dashboard')}
        onOptOut={handleDecline}
      />
    </EnrollmentLayout>
  );
}