import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link 
      to="/" 
      className={`flex items-center space-x-3 hover:opacity-80 transition-opacity ${className}`}
    >
      <span className="text-3xl lg:text-4xl font-bold">
        <span className="text-[#4F46E5]">S</span>
        <span className="bg-gradient-to-r from-[#4F46E5] to-[#E935C1] bg-clip-text text-transparent">avii</span>
      </span>
    </Link>
  );
}