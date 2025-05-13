import React, { useState } from 'react';
import { Search, BadgeHelp, Mail, Phone, ChevronRight } from 'lucide-react';

const advisorData = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@savii.com',
    phone: '(612) 555-0123',
    specialty: 'Health Insurance',
    clients: 28,
    status: 'Available'
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@savii.com',
    phone: '(612) 555-0124',
    specialty: 'Retirement Planning',
    clients: 34,
    status: 'Available'
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@savii.com',
    phone: '(612) 555-0125',
    specialty: 'Benefits Administration',
    clients: 22,
    status: 'Busy'
  },
  {
    id: 4,
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james.wilson@savii.com',
    phone: '(612) 555-0126',
    specialty: 'Group Coverage',
    clients: 19,
    status: 'Available'
  },
  {
    id: 5,
    firstName: 'Jennifer',
    lastName: 'Taylor',
    email: 'jennifer.taylor@savii.com',
    phone: '(612) 555-0127',
    specialty: 'ICHRA Implementation',
    clients: 31,
    status: 'Busy'
  }
];

export default function AdvisorList({ onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAdvisors = advisorData.filter(advisor => {
    const fullName = `${advisor.firstName} ${advisor.lastName}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase()) || 
           advisor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
           advisor.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">Available Advisors</h3>
            <p className="mt-1 text-sm text-gray-500">
              Select an advisor to help with your benefits selection
            </p>
          </div>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="Search advisors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
        {filteredAdvisors.length > 0 ? (
          filteredAdvisors.map((advisor) => (
            <li 
              key={advisor.id}
              className="px-4 py-5 sm:px-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect && onSelect(advisor)}
            >
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                      {advisor.firstName.charAt(0)}{advisor.lastName.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      {advisor.firstName} {advisor.lastName}
                    </h4>
                    <div className="flex items-center mt-1">
                      <BadgeHelp className="h-4 w-4 text-gray-400 mr-1.5" />
                      <p className="text-sm text-gray-500">{advisor.specialty}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    advisor.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {advisor.status}
                  </span>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">{advisor.clients} clients</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1.5" />
                    <span>{advisor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1.5" />
                    <span>{advisor.phone}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-8 text-center">
            <p className="text-gray-500">No advisors found matching your search.</p>
          </li>
        )}
      </ul>
    </div>
  );
}