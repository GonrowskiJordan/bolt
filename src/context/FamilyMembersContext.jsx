import { createContext, useContext, useState } from 'react';

const FamilyMembersContext = createContext(null);

const initialMembers = [
  {
    id: 'employee',
    firstName: 'Thalia',
    lastName: 'Lorne',
    type: 'Employee',
    initials: 'TL',
    isActive: true,
    stipend: 450
  },
  {
    id: 'spouse',
    firstName: 'Michael',
    lastName: 'Lorne',
    type: 'Spouse',
    initials: 'ML',
    isActive: true,
    stipend: 440.35
  }
];

export function FamilyMembersProvider({ children }) {
  const [members, setMembers] = useState(initialMembers);
  const [isAddMemberDrawerOpen, setIsAddMemberDrawerOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  const toggleMember = (id) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id && member.type !== 'Employee'
          ? { ...member, isActive: !member.isActive }
          : member
      )
    );
  };

  const getTotalStipend = () => {
    return members
      .filter(member => member.isActive)
      .reduce((total, member) => total + member.stipend, 0);
  };

  return (
    <FamilyMembersContext.Provider value={{ 
      members, 
      toggleMember, 
      getTotalStipend,
      isAddMemberDrawerOpen,
      setIsAddMemberDrawerOpen,
      memberToEdit,
      setMemberToEdit
    }}>
      {children}
    </FamilyMembersContext.Provider>
  );
}

export function useFamilyMembers() {
  const context = useContext(FamilyMembersContext);
  if (!context) {
    throw new Error('useFamilyMembers must be used within a FamilyMembersProvider');
  }
  return context;
}