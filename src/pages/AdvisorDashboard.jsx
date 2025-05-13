import { Activity, Building2, Users } from 'lucide-react';
import SideNav from '../components/SideNav';

const stats = [
  { name: 'Total Clients', value: '12', icon: Building2, change: '+2', changeType: 'increase' },
  { name: 'Active Employees', value: '847', icon: Users, change: '+124', changeType: 'increase' }
];

const clientList = [
  { id: 1, name: 'Acme Corp', employees: 234, status: 'Active', lastActivity: '2 hours ago' },
  { id: 2, name: 'Globex Inc', employees: 156, status: 'Active', lastActivity: '1 day ago' },
  { id: 3, name: 'TechStart', employees: 89, status: 'Pending', lastActivity: '3 days ago' },
  { id: 4, name: 'InnoSys', employees: 368, status: 'Active', lastActivity: '5 days ago' }
];

export default function AdvisorDashboard() {
  return (
    <div className="flex h-screen">
      <SideNav role="advisor" currentPath="/advisor/dashboard" />
      <div className="flex-1 ml-[200px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Advisor Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Client Overview</h2>
            </div>
            <div className="border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employees
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clientList.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {client.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.employees}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          client.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {client.lastActivity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}