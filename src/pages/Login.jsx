import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Building2, Users2, UserCog, BadgeHelp } from 'lucide-react';

const roles = [
  { id: 'admin', name: 'Platform Admin', icon: UserCog, color: 'indigo' },
  { id: 'employer', name: 'Employer Admin', icon: Building2, color: 'blue' },
  { id: 'advisor', name: 'Advisor / Broker', icon: BadgeHelp, color: 'green' },
  { id: 'employee', name: 'Employee', icon: Users2, color: 'purple' }
];

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    setShowRoleSelect(true);
  };

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({ ...prev, role: roleId }));
    navigate(`/${roleId}/overview`);
  };

  if (showRoleSelect) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-8">Select Your Role</h2>
        <div className="grid grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`p-6 rounded-lg border-2 border-${role.color}-200 hover:border-${role.color}-400 
                  hover:bg-${role.color}-50 transition-all flex flex-col items-center space-y-4`}
              >
                <Icon className={`w-12 h-12 text-${role.color}-600`} />
                <span className="text-lg font-medium text-gray-900">{role.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center mb-8">
        <LogIn className="w-12 h-12 text-indigo-600" />
      </div>
      <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}