import { useState } from 'react';
import { Building2, Mail, ChevronRight } from 'lucide-react';
import { StatusBadge } from '../../pages/broker/BrokerEmployees';
import BrokerEmployeeDetailsEditable from './BrokerEmployeeDetailsEditable';
import BrokerEmployeeDetailsReadOnly from './BrokerEmployeeDetailsReadOnly';

export default function BrokerEmployeesTable({ 
  employees, 
  isReadOnly, 
  filteredEmployees,
  paginatedEmployees,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
  rowsPerPageOptions,
  onEmployeeSave
}) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  const handleSaveEmployee = (updatedEmployee) => {
    if (onEmployeeSave) {
      onEmployeeSave(updatedEmployee);
    }
    setShowEmployeeDetails(false);
  };

  if (filteredEmployees.length === 0) {
    return (
      <div className="py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 3 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stipend</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coverage Start</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Opened</th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedEmployees.map((employee) => (
              <tr 
                key={employee.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEmployeeClick(employee)}
              >
                <td className="px-3 py-4 whitespace-nowrap">
                  <StatusBadge status={employee.employmentStatus} />
                </td>
                <td className="px-3 py-4 whitespace-nowrap">
                  <StatusBadge status={employee.enrollmentStatus} />
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.email}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-900">{employee.organization}</span>
                  </div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.stipend}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.premium}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">{employee.coverageStartDate}</td>
                <td className="px-3 py-4 whitespace-nowrap text-sm">
                  <span className={`flex items-center ${employee.emailOpened === 'Yes' ? 'text-green-600' : 'text-gray-500'}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    {employee.emailOpened}
                  </span>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-indigo-600">
                  <button 
                    className="flex items-center hover:text-indigo-900"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEmployeeClick(employee);
                    }}
                  >
                    {isReadOnly ? 'View Details' : 'Edit Details'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200">
        <div className="flex items-center">
          <label className="mr-2 text-sm text-gray-600">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-md text-sm p-1"
          >
            {rowsPerPageOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded-md ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          {totalPages > 5 && (
            <>
              <span>...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-1 text-sm rounded-md ${
                  currentPage === totalPages
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      
      {/* Use the appropriate detail drawer component based on isReadOnly status */}
      {isReadOnly ? (
        <BrokerEmployeeDetailsReadOnly
          employee={selectedEmployee} 
          isOpen={showEmployeeDetails} 
          onClose={() => setShowEmployeeDetails(false)}
        />
      ) : (
        <BrokerEmployeeDetailsEditable
          employee={selectedEmployee} 
          isOpen={showEmployeeDetails} 
          onClose={() => setShowEmployeeDetails(false)}
          onSave={handleSaveEmployee}
        />
      )}
    </>
  );
}