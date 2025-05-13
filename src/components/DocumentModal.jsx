import { useEffect, useState } from 'react';
import { X, FileText, Download } from 'lucide-react';
import { Button } from './Button';

export default function DocumentModal({ isOpen, onClose, document }) {
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
    <div 
      className={`fixed inset-0 z-50 overflow-y-auto transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        />
        
        {/* Modal Panel */}
        <div className={`relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Close</span>
            <X className="h-6 w-6" />
          </button>

          <div className="p-6">
            {/* Header */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                  {document?.name}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                  {document?.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Type</span>
                <span className="text-sm font-medium text-gray-900">{document?.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Size</span>
                <span className="text-sm font-medium text-gray-900">{document?.size}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Last Modified</span>
                <span className="text-sm font-medium text-gray-900">{document?.lastModified}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}