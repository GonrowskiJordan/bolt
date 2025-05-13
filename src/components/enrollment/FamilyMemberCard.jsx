import { Pencil } from 'lucide-react'; 
import { useFamilyMembers } from '../../context/FamilyMembersContext';

export default function FamilyMemberCard({ member }) {
  const { setIsAddMemberDrawerOpen, setMemberToEdit } = useFamilyMembers();

  const handleEdit = (e) => {
    e?.stopPropagation();
    if (member.type !== 'Employee') {
      setMemberToEdit(member);
      setIsAddMemberDrawerOpen(true);
    }
  };

  return (
    <div
      className={`relative border border-gray-200 rounded-lg p-3 sm:p-4 group ${
        member.type !== 'Employee'
          ? 'hover:border-purple-400 hover:bg-purple-50 transition-all'
          : ''
      }`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 group-hover:bg-purple-200 text-sm">
          {member.initials}
        </div>
        <div className="ml-3 sm:ml-4">
          <h3 className="font-medium text-sm sm:text-base">{`${member.firstName} ${member.lastName}`}</h3>
          <p className="text-sm text-gray-500">{member.type}</p>
        </div>
        {member.type !== 'Employee' && (
          <button
            onClick={handleEdit}
            className="relative z-1 ml-auto p-1.5 sm:p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Edit member"
          >
            <Pencil className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}