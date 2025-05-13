import { FileText, Download, Search, Filter, Upload, FileSpreadsheet, Database } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SideNav from '../components/SideNav';
import DocumentsHeader from '../components/DocumentsHeader';

const documents = [
  {
    id: 1,
    name: 'ICHRA Plan Document',
    type: 'PDF',
    size: '3.2 MB',
    lastModified: '2024-03-15',
    category: 'Benefits'
  },
  {
    id: 2,
    name: 'Compliance Guidelines 2024',
    type: 'PDF',
    size: '1.8 MB',
    lastModified: '2024-03-10',
    category: 'Compliance'
  },
  {
    id: 3,
    name: 'Employee Handbook Template',
    type: 'DOCX',
    size: '1.5 MB',
    lastModified: '2024-03-05',
    category: 'Templates'
  },
  {
    id: 4,
    name: 'Benefits Administration Guide',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-03-01',
    category: 'Benefits'
  },
  {
    id: 5,
    name: 'Employee Census Template',
    type: 'CSV',
    size: '128 KB',
    lastModified: '2024-04-01',
    category: 'Data',
    icon: Database
  }
];

export default function Documents() {
  const location = useLocation();
  // Extract role from the path
  const path = location.pathname;
  const role = path.split('/')[1]; // e.g., /advisor/documents -> advisor

  let title = "Documents";
  let subtitle = "Access and manage your documents";
  
  if (role === 'advisor') {
    title = "Advisor Documents";
    subtitle = "Access and manage documents for your clients";
  } else if (role === 'admin') {
    title = "System Documents";
    subtitle = "Access and manage system-wide documents";
  }

  return (
    <div className="flex h-screen">
      <SideNav role={role} currentPath={location.pathname} />
      <div className="flex-1 ml-[200px] pt-[132px]">
        <DocumentsHeader
          title={title}
          subtitle={subtitle}
        />

        <div className="p-4">
          <div className="mb-4">
            <div className="mt-4 flex space-x-2">
              {['All', 'Benefits', 'Compliance', 'Templates', 'Data'].map((category) => (
                <button
                  key={category}
                  className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {category}
                </button>
              ))}
            </div>
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
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {doc.icon ? (
                            <doc.icon className="w-5 h-5 text-indigo-500 mr-3" />
                          ) : (
                            <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          )}
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