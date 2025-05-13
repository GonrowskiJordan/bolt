import { Users } from 'lucide-react';
import { useFamilyMembers } from '../context/FamilyMembersContext';

const MemberToggle = ({ isActive, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent
      transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      ${isActive ? 'bg-purple-600' : 'bg-gray-200'}
    `}
    role="switch"
    aria-checked={isActive}
  >
    <span
      className={`
        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0
        transition duration-200 ease-in-out
        ${isActive ? 'translate-x-5' : 'translate-x-0'}
      `}
    />
  </button>
);

export default function FamilyMembersList() {
  const { members, toggleMember, getTotalStipend } = useFamilyMembers();
  const isShoppingRoute = window.location.pathname.includes('/employee/enrollment/doctor-search');

  return (
    <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4 relative z-10">
      <div className="px-3 sm:px-4 mb-2">
        <div className="text-xs sm:text-sm font-medium text-gray-600">Covered Family Members</div>
      </div>
      <div className="space-y-1">
        {members.map((member) => (
          <div
            key={member.id}
            className={`px-3 sm:px-4 py-2 sm:py-3 ${
              isShoppingRoute && !member.isActive ? 'opacity-50' : ''
            }`}
          >
            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                {member.firstName} {member.lastName}
              </p>
              <p className="text-xs text-gray-500">{member.type}</p>
              {isShoppingRoute && member.type !== 'Employee' && (
                <MemberToggle
                  isActive={member.isActive}
                  onClick={() => toggleMember(member.id)}
                  disabled={member.type === 'Employee'}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}