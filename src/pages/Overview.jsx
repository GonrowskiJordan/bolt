import { Building2, Users2, UserCog, BadgeHelp, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import Logo from '../components/Logo';

const roles = [
  { 
    id: 'employer',
    name: 'Employer Admin',
    icon: Building2,
    color: 'blue',
    description: 'Manage your organization\'s benefits'
  },
  { 
    id: 'admin',
    name: 'Platform Admin',
    icon: UserCog,
    color: 'indigo',
    description: 'Full system access and configuration'
  },
  { 
    id: 'advisor',
    name: 'Advisor',
    icon: BadgeHelp,
    color: 'green',
    description: 'Support and manage clients'
  }
];

const employeeStates = [
  {
    id: 'new',
    name: 'New Employee',
    description: 'Start enrollment process',
    path: '/employee'
  },
  {
    id: 'mid-process',
    name: 'Mid Process',
    description: 'Continue from personal info',
    path: '/employee/dashboard'
  },
  {
    id: 'completed',
    name: 'Completed',
    description: 'View coverage details',
    path: '/employee/coverage'
  }
];

const employerStates = [
  {
    id: 'new',
    name: 'New Employer',
    description: 'Set up a new employer account',
    path: '/employer/onboarding'
  },
  {
    id: 'completed',
    name: 'Completed',
    description: 'View existing employer account',
    path: '/employer/dashboard'
  }
];

const brokerRoles = [
  {
    id: 'full-access',
    name: 'Full Edit Access',
    description: 'Complete access to manage clients and employees',
    path: '/broker/dashboard'
  },
  {
    id: 'read-only',
    name: 'Read Only',
    description: 'View-only access to client information',
    path: '/broker/dashboard-readonly?access=readonly'
  }
];

export default function Overview() {
  const navigate = useNavigate();
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const [isEmployerDropdownOpen, setIsEmployerDropdownOpen] = useState(false);
  const [isBrokerDropdownOpen, setIsBrokerDropdownOpen] = useState(false);
  const employeeDropdownRef = useRef(null);
  const employerDropdownRef = useRef(null);
  const brokerDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target)) {
        setIsEmployeeDropdownOpen(false);
      }
      if (employerDropdownRef.current && !employerDropdownRef.current.contains(event.target)) {
        setIsEmployerDropdownOpen(false);
      }
      if (brokerDropdownRef.current && !brokerDropdownRef.current.contains(event.target)) {
        setIsBrokerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (roleId) => {
    switch (roleId) {
      case 'employer':
        setIsEmployerDropdownOpen(!isEmployerDropdownOpen);
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'advisor':
        navigate('/advisor/dashboard');
        break;
      default:
        // No default navigation - broker dropdown handled separately
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="flex justify-center mb-12">
          <Logo className="justify-center mb-6" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Demo Role Selection Overview</h2>
          <p className="mt-2 text-lg text-gray-600">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Employee Dropdown Button */}
          <div className="relative" ref={employeeDropdownRef}>
            <button
              onClick={() => setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen)}
              className="w-full h-[116px] rounded-xl border-2 border-purple-200 bg-white hover:border-purple-400 hover:bg-purple-50 
                transition-all duration-200 text-left group hover:shadow-lg p-6 flex items-start"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Users2 className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 mb-1">
                    Employee
                  </h3>
                  <p className="text-sm text-gray-500">
                    View and manage your personal benefits
                  </p>
                </div>
              </div>
            </button>

            {/* Employee Dropdown Menu */}
            {isEmployeeDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                {employeeStates.map((state) => (
                  <button
                    key={state.id}
                    onClick={() => {
                      setIsEmployeeDropdownOpen(false);
                      navigate(state.path);
                    }}
                    className="w-full p-4 text-left hover:bg-purple-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <h4 className="text-base font-medium text-gray-900">{state.name}</h4>
                    <p className="text-sm text-gray-500">{state.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Employer Dropdown Button */}
          <div className="relative" ref={employerDropdownRef}>
            <button
              onClick={() => setIsEmployerDropdownOpen(!isEmployerDropdownOpen)}
              className="w-full h-[116px] rounded-xl border-2 border-blue-200 bg-white hover:border-blue-400 hover:bg-blue-50 
                transition-all duration-200 text-left group hover:shadow-lg p-6 flex items-start"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 mb-1">
                    Employer Admin
                  </h3>
                  <p className="text-sm text-gray-500">
                    Manage your organization's benefits
                  </p>
                </div>
              </div>
            </button>

            {/* Employer Dropdown Menu */}
            {isEmployerDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                {employerStates.map((state) => (
                  <button
                    key={state.id}
                    onClick={() => {
                      setIsEmployerDropdownOpen(false);
                      navigate(state.path);
                    }}
                    className="w-full p-4 text-left hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <h4 className="text-base font-medium text-gray-900">{state.name}</h4>
                    <p className="text-sm text-gray-500">{state.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Broker Dropdown Button */}
          <div className="relative" ref={brokerDropdownRef}>
            <button
              onClick={() => setIsBrokerDropdownOpen(!isBrokerDropdownOpen)}
              className="w-full h-[116px] rounded-xl border-2 border-teal-200 bg-white hover:border-teal-400 hover:bg-teal-50 
                transition-all duration-200 text-left group hover:shadow-lg p-6 flex items-start"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Briefcase className="w-8 h-8 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 mb-1 truncate">
                    Broker
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    Manage benefits for multiple clients
                  </p>
                </div>
              </div>
            </button>

            {/* Broker Dropdown Menu */}
            {isBrokerDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                {brokerRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setIsBrokerDropdownOpen(false);
                      navigate(role.path);
                    }}
                    className="w-full p-4 text-left hover:bg-teal-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <h4 className="text-base font-medium text-gray-900">{role.name}</h4>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Other roles */}
          {roles.filter(role => role.id !== 'employer').map((role) => {
            const Icon = role.icon;
            const colorClasses = {
              blue: 'hover:border-blue-400 hover:bg-blue-50 text-blue-600',
              indigo: 'hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600',
              green: 'hover:border-green-400 hover:bg-green-50 text-green-600'
            };

            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`p-6 rounded-xl border-2 border-gray-200 bg-white hover:shadow-lg 
                  transition-all duration-200 text-left group h-[116px] ${colorClasses[role.color]}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 mb-1 truncate">
                      {role.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p></p>
        </div>
      </div>
    </div>
  );
}