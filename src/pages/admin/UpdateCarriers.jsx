import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import PlatformAdminSideNav from '../../components/admin/PlatformAdminSideNav';

export default function UpdateCarriers() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([
    { id: 1, filename: 'carriers-2024-03-15.csv', uploadedBy: 'Admin User', date: '2024-03-15 09:24 AM', status: 'Success', carriers: 152 },
    { id: 2, filename: 'carriers-2024-02-01.csv', uploadedBy: 'System Admin', date: '2024-02-01 10:30 AM', status: 'Success', carriers: 148 },
    { id: 3, filename: 'carriers-2023-12-10.csv', uploadedBy: 'Admin User', date: '2023-12-10 02:15 PM', status: 'Success', carriers: 145 }
  ]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    
    setIsUploading(true);
    setUploadStatus({ type: 'progress', message: 'Uploading carrier list...' });
    
    // Simulate file upload and processing
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus({ type: 'success', message: 'Carrier list successfully imported!' });
      
      // Add the new upload to history
      const newUpload = {
        id: Date.now(),
        filename: file.name,
        uploadedBy: 'Admin User',
        date: new Date().toLocaleString(),
        status: 'Success',
        carriers: Math.floor(Math.random() * 20) + 140 // Random number between 140-160
      };
      
      setUploadHistory([newUpload, ...uploadHistory]);
      setFile(null);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setUploadStatus(null);
      }, 5000);
    }, 2000);
  };

  return (
    <div className="flex h-screen">
      <PlatformAdminSideNav currentPath="/admin/update-carriers" />
      <div className="flex-1 ml-[200px] p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Update carrier list</h1>

          {/* Upload form */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="carrierFile" className="block text-lg font-medium text-gray-700 mb-2">
                  Carrier List:
                </label>
                <div className="flex items-center">
                  <div className="relative flex-grow mr-4">
                    <label
                      htmlFor="carrier-file"
                      className="cursor-pointer bg-white border border-gray-300 rounded-md py-2 px-3 inline-flex items-center text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Choose File
                      <input
                        id="carrier-file"
                        name="carrier-file"
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="ml-3 text-gray-500">
                      {file ? file.name : 'No file chosen'}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Upload a CSV or Excel file containing carrier information. 
                  The file should include carrier name, carrier code, and carrier contact information.
                </p>
              </div>

              <button
                type="submit"
                disabled={!file || isUploading}
                className="inline-flex items-center px-5 py-2.5 text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-5 w-5" />
                    Import Carriers
                  </>
                )}
              </button>
            </form>

            {/* Upload Status Messages */}
            {uploadStatus && (
              <div className={`mt-4 p-4 rounded-md ${
                uploadStatus.type === 'progress' ? 'bg-blue-50 text-blue-700' : 
                uploadStatus.type === 'success' ? 'bg-green-50 text-green-700' : 
                'bg-red-50 text-red-700'
              }`}>
                {uploadStatus.message}
              </div>
            )}
          </div>

          {/* Upload History */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Upload History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Filename
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded By
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Carriers
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uploadHistory.map((upload) => (
                    <tr key={upload.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {upload.filename}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {upload.uploadedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {upload.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          upload.status === 'Success' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {upload.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {upload.carriers}
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