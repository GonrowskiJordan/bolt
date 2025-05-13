import { useState, useEffect } from 'react';
import { X, FileText, Download } from 'lucide-react';

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
  }
];

export default function EmptyModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => {
        setMounted(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div className={`fixed inset-0 overflow-y-auto transition-opacity duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-0'
    }`} 
    style={{ zIndex: 9999 }}>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-5xl w-full mx-auto shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
                <p className="text-sm text-gray-500">View and manage your documents</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-12 py-4 whitespace-nowrap min-w-[300px]">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                        </div>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                      <td className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                      <td className="px-12 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 inline-flex items-center">
                          <Download className="w-4 h-4 mr-1" />
                          Download
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
    </div>
  );
}