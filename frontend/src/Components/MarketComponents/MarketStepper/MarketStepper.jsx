import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MarketStepper.css';

const steps = [
  { name: 'Select Ingredients', path: '/market/ingredients', label: '1' },
  { name: 'Select Vendor', path: '/market/ranking', label: '2' },
  { name: 'Order Confirmation', path: '/market/orderconfirmation', label: '3' }
];

function MarketStepper() {
  const location = useLocation();
  const currentStepIndex = steps.findIndex(step => location.pathname.startsWith(step.path));

  return (
    <div className="stepper-container">
      <div className="steps">
        {steps.map((step, index) => (
          <div key={step.name} className={`step-container ${index === currentStepIndex ? 'active' : ''}`}>
            <Link to={step.path} className={`step ${index === currentStepIndex ? 'active' : ''}`}>
              {step.label}
            </Link>
            <div className="step-title">{step.name}</div>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketStepper;
