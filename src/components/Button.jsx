import { forwardRef } from 'react';

const variants = {
  primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizes = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
  xl: 'px-6 py-4',
};

export const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-lg
        font-medium
        transform
        transition-all
        duration-200
        shadow-sm
        hover:scale-[1.02]
        hover:shadow-md
        active:scale-[0.98]
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});