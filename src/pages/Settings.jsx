import { Settings as SettingsIcon } from 'lucide-react';
import SideNav from '../components/SideNav';

export default function Settings({ role }) {
  return (
    <div className="flex h-screen">
      <SideNav role={role} currentPath={`/${role}/settings`} />
      <div className="flex-1 ml-[200px] p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center space-x-4 mb-6">
                <SettingsIcon className="w-8 h-8 text-gray-400" />
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your account preferences and settings
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <dl className="divide-y divide-gray-200">
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">John Doe</span>
                        <button className="text-indigo-600 hover:text-indigo-900">Update</button>
                      </dd>
                    </div>

                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">john.doe@example.com</span>
                        <button className="text-indigo-600 hover:text-indigo-900">Update</button>
                      </dd>
                    </div>

                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Password</dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">••••••••</span>
                        <button className="text-indigo-600 hover:text-indigo-900">Change</button>
                      </dd>
                    </div>

                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                      <dt className="text-sm font-medium text-gray-500">Notifications</dt>
                      <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span className="flex-grow">Email notifications enabled</span>
                        <button className="text-indigo-600 hover:text-indigo-900">Configure</button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}