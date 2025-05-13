import { useNavigate } from 'react-router-dom';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import DoctorSearchComponent from '../components/enrollment/DoctorSearch';

export default function DoctorSearch() {
  const navigate = useNavigate();
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = 5;

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <DoctorSearchComponent
        onNext={() => navigate('/employee/coverage')}
        onBack={() => navigate('/employee/enrollment/shop')} 
      />
    </EnrollmentLayout>
  );
}