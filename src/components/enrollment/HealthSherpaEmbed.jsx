import { Menu, HelpCircle, LogOut, FileText, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from '../Logo';
import FamilyMembersList from '../FamilyMembersList';
import AddMemberDrawer from '../AddMemberDrawer';
import EmptyModal from '../EmptyModal';
import { useFamilyMembers } from '../../context/FamilyMembersContext';
import ProfileDrawer from '../ProfileDrawer';

const Z_INDEX = {
  MOBILE_HEADER: 30,
  SIDEBAR: 20, 
  OVERLAY: 15,
  MODALS: 40
};

export default function HealthSherpaEmbed({ onBack, onPlanSelect }) {
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
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 lg:hidden bg-white border-b border-gray-200 z-30">
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
      </div>
      
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 flex">
        {/* Mobile sidebar - slides in from left */}
        <div 
          className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 lg:w-[200px] flex-shrink-0 flex flex-col transform transition-transform duration-300 ease-in-out z-20 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:static lg:h-screen`}
        >
          <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden pt-16 lg:pt-4">
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
        
        {/* Main content area with HealthSherpa Embed */}
        <div className="flex-1 flex flex-col min-h-screen lg:ml-[200px]">
          {/* Overlay when mobile menu is open */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden"
              style={{ zIndex: Z_INDEX.OVERLAY }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
          )}
          
          {/* HealthSherpa Embed */}
          <div className="flex-1 mt-16 lg:mt-0">
            <div className="h-full flex flex-col">
              <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
                <button
                  onClick={onBack}
                  className="flex items-center px-3 py-1 bg-indigo-700 hover:bg-indigo-800 rounded text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Options
                </button>
                <h1 className="text-lg font-medium">Select Your Health Plan</h1>
                <div></div> {/* Empty div for layout balance */}
              </div>
              
              <div className="flex-1 overflow-hidden">
                <iframe 
                  src="https://healthsherpa.com/" 
                  className="w-full h-full border-0"
                  title="HealthSherpa Marketplace"
                  id="health-sherpa-embed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modals */}
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