import { Plus, ArrowLeft } from 'lucide-react';
import { useFamilyMembers } from '../../context/FamilyMembersContext';
import FamilyMemberCard from './FamilyMemberCard';
import { Button } from '../Button';

export default function FamilyMembers({ onNext, onBack }) {
  const { members, setIsAddMemberDrawerOpen } = useFamilyMembers();

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 mt-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Who would you like to cover under your health plan?</h2>

      {/* Family Members */}
      <div className="relative space-y-4 mb-8">
        {members.map((member) => (
          <FamilyMemberCard key={member.id} member={member} />
        ))}

        {/* Add Member Button */}
        <button
          onClick={() => setIsAddMemberDrawerOpen(true)}
          className="relative w-full border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 hover:border-purple-400 hover:bg-purple-50 transition-all group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <div className="flex flex-col items-center text-gray-500 group-hover:text-purple-600 py-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-sm sm:text-base font-medium">New Member</span>
            <span className="text-xs text-center">If you're unsure, include them — you can make changes later.</span>
          </div>
        </button>
      </div>
      
      {/* Navigation Buttons */}
      <div className="relative flex justify-between mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
        <button
          onClick={onBack}
          className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Back
        </button>
        <Button variant="primary" size="sm" onClick={onNext}>
          Save and continue
        </Button>
      </div>
    </div>
  );
}