import { useNavigate } from 'react-router-dom';
import EnrollmentLayout from '../components/enrollment/EnrollmentLayout';
import FamilyMembersComponent from '../components/enrollment/FamilyMembers';

export default function FamilyEnrollment() {
  const navigate = useNavigate();
  const steps = ['Opt In/Out', 'Verify Personal Info', 'Family Status', 'Terms & Conditions', 'Authorization', 'Select a plan', 'Summary'];
  const currentStep = 2;

  return (
    <EnrollmentLayout steps={steps} currentStep={currentStep}>
      <FamilyMembersComponent
        onNext={() => navigate('/employee/enrollment/terms')}
        onBack={() => navigate('/employee/dashboard')}
      />
    </EnrollmentLayout>
  );
}