import { Routes, Route, Navigate } from 'react-router-dom';
import Overview from './pages/Overview';
import AdminDashboard from './pages/AdminDashboard';
import Employee from './pages/admin/Employee';
import FeasibilityTool from './pages/admin/FeasibilityTool';
import UpdateCarriers from './pages/admin/UpdateCarriers';
import Reports from './pages/admin/Reports';
import EmployeeDashboard from './pages/EmployeeDashboard';
import EmployeeEnrollmentStart from './pages/EmployeeEnrollmentStart';
import EmployerDashboard from './pages/EmployerDashboard';
import EmployerOnboarding from './pages/employer/EmployerOnboarding';
import AdvisorDashboard from './pages/AdvisorDashboard';
import AdvisorBlankView from './pages/advisor/AdvisorBlankView';
import Settings from './pages/Settings';
import EmployerSettings from './pages/EmployerSettings';
import Coverage from './pages/Coverage';
import Agreements from './pages/Agreements';
import ShopSelection from './pages/ShopSelection';
import FamilyEnrollment from './pages/FamilyEnrollment';
import Organizations from './pages/Organizations';
import EmployerDocuments from './pages/EmployerDocuments';
import Documents from './pages/Documents';
import DoctorSearch from './pages/DoctorSearch';
import EmployerReports from './pages/employer/Reports';
import ActivityLogs from './pages/employer/ActivityLogs';
import BrokerDashboard from './pages/broker/BrokerDashboard';
import BrokerClients from './pages/broker/BrokerClients';
import BrokerEmployees from './pages/broker/BrokerEmployees';
import BrokerDocuments from './pages/broker/BrokerDocuments';
import BrokerReports from './pages/broker/BrokerReports';
import BrokerActivity from './pages/broker/BrokerActivity';

// Read-only broker views
import BrokerReadOnlyView from './pages/broker/BrokerReadOnlyView';
import BrokerDashboardReadOnly from './pages/broker/BrokerDashboardReadOnly';
import BrokerClientsReadOnly from './pages/broker/BrokerClientsReadOnly';
import BrokerEmployeesReadOnly from './pages/broker/BrokerEmployeesReadOnly';
import BrokerDocumentsReadOnly from './pages/broker/BrokerDocumentsReadOnly';
import BrokerReportsReadOnly from './pages/broker/BrokerReportsReadOnly';
import BrokerActivityReadOnly from './pages/broker/BrokerActivityReadOnly';

function App() {
  return (
    <Routes>
      <Route index element={<Overview />} />
      
      {/* Admin routes */}
      <Route path="/admin">
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employee" element={<Employee />} />
        <Route path="settings" element={<Settings role="admin" />} />
        <Route path="documents" element={<Documents />} />
        <Route path="utility" element={<FeasibilityTool />} />
        <Route path="email-campaigns" element={<Reports />} />
        <Route path="update-carriers" element={<UpdateCarriers />} />
      </Route>
      
      {/* Advisor routes */}
      <Route path="/advisor">
        <Route path="dashboard" element={<AdvisorBlankView />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="settings" element={<Settings role="advisor" />} />
        <Route path="documents" element={<Documents />} />
      </Route>
      
      {/* Broker routes - Full Edit Access */}
      <Route path="/broker">
        <Route path="dashboard" element={<BrokerDashboard />} />
        <Route path="clients" element={<BrokerClients />} />
        <Route path="employees" element={<BrokerEmployees />} />
        <Route path="documents" element={<BrokerDocuments />} />
        <Route path="reports" element={<BrokerReports />} />
        <Route path="activity" element={<BrokerActivity />} />
        
        {/* Broker Read-Only Routes */}
        <Route path="dashboard-readonly" element={<BrokerDashboardReadOnly />} />
        <Route path="clients-readonly" element={<BrokerClientsReadOnly />} />
        <Route path="employees-readonly" element={<BrokerEmployeesReadOnly />} />
        <Route path="documents-readonly" element={<BrokerDocumentsReadOnly />} />
        <Route path="reports-readonly" element={<BrokerReportsReadOnly />} />
        <Route path="activity-readonly" element={<BrokerActivityReadOnly />} />
        <Route path="client" element={<BrokerReadOnlyView />} />
      </Route>
      
      {/* Employer routes */}
      <Route path="/employer">
        <Route path="dashboard" element={<EmployerDashboard />} />
        <Route path="documents" element={<EmployerDocuments />} />
        <Route path="settings" element={<EmployerSettings />} />
        <Route path="reports" element={<EmployerReports />} />
        <Route path="activity" element={<ActivityLogs />} />
        <Route path="onboarding" element={<EmployerOnboarding />} />
      </Route>
      
      {/* Employee routes */}
      <Route path="/employee">
        <Route path="" element={<EmployeeEnrollmentStart />} />
        <Route path="enrollment/start" element={<EmployeeEnrollmentStart />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="enrollment/family" element={<FamilyEnrollment />} />
        <Route path="enrollment/terms" element={<Agreements step="terms" />} />
        <Route path="enrollment/authorization" element={<Agreements step="authorization" />} />
        <Route path="enrollment/shop" element={<ShopSelection />} />
        <Route path="enrollment/doctor-search" element={<DoctorSearch />} />
        <Route path="enrollment/confirmation" element={<Navigate to="/employee/coverage" replace />} />
        <Route path="coverage" element={<Coverage />} />
        <Route path="settings" element={<Settings role="employee" />} />
      </Route>
      
      {/* Catch all redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;