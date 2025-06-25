import React from 'react';

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { key: 'branch', label: 'สาขา' },
    { key: 'datetime', label: 'วันเวลา' },
    { key: 'guests', label: 'จำนวนคน' },
    { key: 'table', label: 'โต๊ะ' },
    { key: 'details', label: 'ข้อมูล' },
    { key: 'confirmation', label: 'ยืนยัน' }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  if (currentStep === 'success' || currentStep === 'history') {
    return null; // Don't show progress bar on success or history page
  }

  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    index <= currentStepIndex
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`mt-2 text-xs font-medium transition-colors ${
                    index <= currentStepIndex
                      ? 'text-primary-600'
                      : 'text-gray-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      index < currentStepIndex
                        ? 'bg-primary-500'
                        : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar; 