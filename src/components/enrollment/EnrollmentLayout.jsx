import { Menu, HelpCircle, LogOut, FileText, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../Logo';
import FamilyMembersList from '../FamilyMembersList';
import AddMemberDrawer from '../AddMemberDrawer';
import EmptyModal from '../EmptyModal';
import { useFamilyMembers } from '../../context/FamilyMembersContext';
import ProfileDrawer from '../ProfileDrawer';

export default function EnrollmentLayout({ children, steps, currentStep }) {
  const { isAddMemberDrawerOpen, setIsAddMemberDrawerOpen, memberToEdit, setMemberToEdit } = useFamilyMembers();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Header - z-index 50 */}
      <div className="fixed top-0 left-0 right-0 lg:hidden bg-white border-b border-gray-200 z-50">
        <div className="h-16 flex items-center justify-between px-4 shadow-sm">
          <Logo className="w-24" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
        
        {/* Mobile Step Indicator (moved out of header, now part of content) */}
        <div className="bg-purple-50 py-3 px-4 text-sm text-purple-800 border-b border-purple-200 block lg:hidden">
          <span className="font-medium">Step {currentStep + 1} of {steps.length}:</span> {steps[currentStep]}
        </div>
      </div>
      
      <div className="flex min-h-screen pt-32 lg:pt-0">
        {/* Sidebar - z-index 40 */}
        <div 
          className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 lg:w-[200px] flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:h-screen z-40`}
        >
          <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden pt-32 lg:pt-4">
            <div className="mb-8 hidden lg:block">
              <Logo />
            </div>
          
            <div className="px-4 mb-6">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>Available balance</span>
                <button 
                  onClick={() => document.getElementById('balance-info').open = !document.getElementById('balance-info').open}
                  className="hover:text-gray-800"
                >
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <p className="text-xl font-semibold text-green-600">${useFamilyMembers().getTotalStipend().toFixed(2)}</p>
              <details id="balance-info" className="mt-2">
                <summary className="sr-only">Balance information</summary>
                <p className="mt-2 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-md">
                  This is your employer's contribution to help you pay for health coverage. It may change based on who you choose to cover.
                </p>
              </details>
            </div>
          
            <FamilyMembersList />
          </div>
          <div className="border-t border-gray-200 p-4 mt-auto">
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="w-full flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop"
                alt="Thalia Lorne"
                className="w-8 h-8 rounded-full"
              />
              <div className="ml-3 text-left">
                <p className="text-sm font-medium text-gray-900">Thalia Lorne</p>
              </div>
            </button>
            <div className="mt-4 space-y-2">
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help & Support
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                <FileText className="w-4 h-4 mr-3" />
                Documents
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content area - z-index 10 */}
        <div className="flex-1 lg:ml-[200px]">
          {/* Overlay when mobile menu is open */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden z-30"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
          )}
          
          {/* Desktop Welcome Header */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-0 lg:pt-8">
            <div className="mb-6 lg:mb-10">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Welcome, Thalia Lorne</h1>
              <p className="text-sm lg:text-base text-gray-600">
                Open enrollment period: Jan 4, 2025 13:00 PM - Dec 31, 2025 00:59 AM
              </p>
            </div>
          </div>
          
          {/* Desktop Progress Steps - ONLY visible on desktop, moved OUT of header */}
          <div className="hidden lg:block mx-auto max-w-5xl px-4 sm:px-6 mb-12 z-5">
            <div className="relative">
              {/* Background line */}
              <div className="absolute top-4 left-0 w-full h-[2px] bg-gray-200"></div>
              
              {/* Filled progress line */}
              <div 
                className="absolute top-4 left-0 h-[2px] bg-purple-600 transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>
              
              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className={`flex items-center justify-center w-8 h-8 rounded-full relative z-10 transition-all duration-200 ${
                        i < currentStep 
                          ? 'bg-purple-600 text-white' 
                          : i === currentStep 
                          ? 'bg-purple-600 text-white transform scale-110 shadow-md' 
                          : 'bg-white text-gray-400 border-2 border-gray-200'
                      }`}
                    >
                      {i < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <span 
                      className={`mt-3 text-sm font-medium transition-colors duration-200 text-center ${
                        i === currentStep 
                          ? 'text-purple-600' 
                          : i < currentStep 
                          ? 'text-gray-600' 
                          : 'text-gray-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Page Content */}
          <div className="mx-auto max-w-5xl w-full px-4 sm:px-6 lg:px-8 pb-12 z-10">
            {children}
          </div>
        </div>
      </div>
      
      {/* Modals - highest z-index */}
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <AddMemberDrawer
        isOpen={isAddMemberDrawerOpen}
        onClose={() => {
          setIsAddMemberDrawerOpen(false);
          setMemberToEdit(null);
        }}
        memberToEdit={memberToEdit}
        onSubmit={() => {
          setIsAddMemberDrawerOpen(false);
          setMemberToEdit(null);
        }}
      />
      <EmptyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}