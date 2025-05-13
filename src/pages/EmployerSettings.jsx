import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Menu } from 'lucide-react';
import SideNav from '../components/SideNav';
import Logo from '../components/Logo';

export default function EmployerSettings() {
  const [activeTab, setActiveTab] = useState('organization');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle window resize to close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Header - z-index 50 */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="h-16 flex items-center justify-between px-4 shadow-sm">
          <Logo className="w-24" />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - z-index 40 */}
        <div className="lg:relative">
          <div 
            className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 lg:w-[200px] flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:h-screen z-40`}
          >
            <SideNav role="employer" currentPath="/employer/settings" />
          </div>
          
          {/* Overlay when mobile menu is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden z-30"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Main content - z-index 10 */}
        <div className="flex-1 pt-20 lg:pt-6 px-4 sm:px-6">
          <div className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <SettingsIcon className="h-6 w-6 text-gray-400 mr-2" />
              <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            </div>

            {/* Tab navigation - horizontally scrollable on mobile */}
            <div className="border-b border-gray-200 mb-6 overflow-x-auto">
              <div className="flex space-x-8 min-w-max">
                <button
                  onClick={() => setActiveTab('organization')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'organization'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Organization
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Users & Permissions
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Your Profile
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'notifications'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Notifications
                </button>
              </div>
            </div>

            {/* Tab content */}
            {activeTab === 'organization' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 sm:p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organization Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="Acme Corporation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                          <option>Technology</option>
                          <option>Healthcare</option>
                          <option>Finance</option>
                          <option>Manufacturing</option>
                          <option>Retail</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="123 Corporate Drive"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="San Francisco"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white">
                          <option>California</option>
                          <option>New York</option>
                          <option>Texas</option>
                          <option>Florida</option>
                          <option>Illinois</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="contact@acmecorp.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          defaultValue="(415) 555-1234"
                        />
                      </div>
                    </div>

                    <div className="pt-5 flex justify-end">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">User Management & Permissions</h3>
                  <p className="text-gray-500">Manage users and their access levels</p>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Profile Information</h3>
                  <p className="text-gray-500">Manage your personal information and preferences</p>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Settings</h3>
                  <p className="text-gray-500">Manage how and when you receive notifications</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}