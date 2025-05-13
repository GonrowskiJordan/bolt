import { useState, useEffect } from 'react';
import { User, Mail, Phone, Calendar, Shield, Settings, DollarSign, ArrowDownRight, ArrowUpRight, X } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'credit',
    amount: 450.00,
    description: 'Monthly ICHRA Stipend',
    date: '2024-03-01'
  },
  {
    id: 2,
    type: 'debit',
    amount: 350.00,
    description: 'Premium Payment - BCBS PPO',
    date: '2024-03-01'
  },
  {
    id: 3,
    type: 'credit',
    amount: 450.00,
    description: 'Monthly ICHRA Stipend',
    date: '2024-02-01'
  },
  {
    id: 4,
    type: 'debit',
    amount: 350.00,
    description: 'Premium Payment - BCBS PPO',
    date: '2024-02-01'
  }
];

export default function ProfileDrawer({ isOpen, onClose }) {
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
      className={`fixed inset-0 overflow-hidden transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ zIndex: 9999 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute inset-0 bg-gray-500 transition-all duration-300 ${
            isOpen ? 'opacity-75' : 'opacity-0'
          }`}
          onClick={onClose}
        />
        
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div
            className={`relative w-screen max-w-md transform transition-all duration-300 ${
              isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            <div className="h-full flex flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Profile</h2>
                  <p className="text-sm text-gray-500">View and manage your profile</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-semibold">
                    TL
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">Thalia Lorne</h3>
                    <p className="text-sm text-gray-500">Employee</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Personal Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-900">Thalia Lorne</p>
                          <p className="text-xs text-gray-500">Full name</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-900">thalia.lorne@example.com</p>
                          <p className="text-xs text-gray-500">Email</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-900">(208) 994-4625</p>
                          <p className="text-xs text-gray-500">Phone</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm text-gray-900">November 10, 1963</p>
                          <p className="text-xs text-gray-500">Date of birth</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Payment History</h4>
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                            }`}>
                              {transaction.type === 'credit' ? (
                                <ArrowDownRight className={`w-4 h-4 text-green-600`} />
                              ) : (
                                <ArrowUpRight className={`w-4 h-4 text-red-600`} />
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                              <p className="text-xs text-gray-500">{transaction.date}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-medium ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}