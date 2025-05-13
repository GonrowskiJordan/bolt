import { forwardRef } from 'react';

export function Checkbox({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  className = ''
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
      className={`flex items-start space-x-2 select-none ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => {}}
        disabled={disabled}
        className={`
          mt-0.5 h-4 w-4
          rounded
          border-gray-300
          text-purple-600
          focus:ring-purple-500
          pointer-events-none
        `}
      />
      <div className={`flex-1 text-sm text-gray-600 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        {label}
      </div>
    </div>
  );
}