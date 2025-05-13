import React from 'react';

export default function ProgressSteps({ currentStep, steps }) {
  // Base styles for the step number circle
  const baseCircleStyles = `w-8 h-8 rounded-full flex items-center justify-center relative z-10 transition-all duration-200 shadow-sm`;
  
  // Base styles for the step text
  const baseTextStyles = `mt-3 text-sm font-medium transition-colors duration-200 text-center`;
  
  const renderStep = (step, index) => {
    // Determine circle styles based on step state
    const getCircleStyles = () => {
      if (index === currentStep) {
        return `${baseCircleStyles} bg-blue-600 text-white border-2 border-blue-600 scale-110 shadow-md`;
      }
      if (index < currentStep) {
        return `${baseCircleStyles} bg-blue-600 text-white`;
      }
      return `${baseCircleStyles} bg-white text-gray-400 border-2 border-gray-200`;
    };

    // Determine text styles based on step state
    const getTextStyles = () => {
      if (index === currentStep) {
        return `${baseTextStyles} text-blue-600`;
      }
      if (index < currentStep) {
        return `${baseTextStyles} text-gray-600`;
      }
      return `${baseTextStyles} text-gray-400`;
    };

    return (
      <div key={step} className="flex flex-col items-center flex-1">
        <div className={getCircleStyles()}>
          {index + 1}
        </div>
        <span className={getTextStyles()}>
          {step}
        </span>
      </div>
    );
  };

  // Calculate the progress percentage based on current step
  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="relative mb-12">
      {/* Background track */}
      <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 rounded-full" />
      
      {/* Filled progress bar */}
      <div 
        className="absolute top-4 left-0 h-[2px] bg-blue-600 transition-all duration-500 ease-in-out rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
      
      {/* Steps container */}
      <div className="relative flex justify-between">
        {steps.map((step, index) => renderStep(step, index))}
      </div>
    </div>
  );
}