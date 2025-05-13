import { useNavigate } from 'react-router-dom';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import PersonalInfo from '../components/enrollment/PersonalInfo';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = 1;

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <PersonalInfo 
        onNext={() => navigate('/employee/enrollment/family')} 
        onBack={() => navigate('/employee')}
      />
    </EnrollmentLayout>
  );
}