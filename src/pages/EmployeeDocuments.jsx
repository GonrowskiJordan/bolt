import { FileText, Download } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import EmployeeSideNav from '../components/EmployeeSideNav';
import { useState, useCallback } from 'react';
import DocumentModal from '../components/DocumentModal';

const documents = [
  {
    id: 1,
    name: 'Benefits Guide 2024',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-03-20',
    category: 'Benefits'
  },
  {
    id: 2,
    name: 'Insurance Card',
    type: 'PDF',
    size: '156 KB',
    lastModified: '2024-03-15',
    category: 'Personal'
  },
  {
    id: 3,
    name: 'ICHRA Attestation',
    type: 'PDF',
    size: '245 KB',
    lastModified: '2024-03-10',
    category: 'Forms'
  },
  {
    id: 4,
    name: 'Employee Handbook',
    type: 'PDF',
    size: '1.8 MB',
    lastModified: '2024-03-05',
    category: 'Policies'
  },
  {
    id: 5,
    name: 'Plan Summary',
    type: 'PDF',
    size: '890 KB',
    lastModified: '2024-03-01',
    category: 'Benefits'
  }
];

export default function EmployeeDocuments() {
  const location = useLocation();
  const [selectedDocument, setSelectedDocument] = useState(null);

  return (
    <div className="flex h-screen">
      <EmployeeSideNav />
      <div className="flex-1 ml-[200px] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">My Documents</h1>
            <p className="text-sm text-gray-500">Access your personal documents and forms</p>
          </div>

          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr 
                      key={doc.id} 
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.lastModified}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          onClick={() => setSelectedDocument(doc)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <DocumentModal
        isOpen={!!selectedDocument}
        onClose={() => setSelectedDocument(null)}
        document={selectedDocument}
      />
    </div>
  );
}