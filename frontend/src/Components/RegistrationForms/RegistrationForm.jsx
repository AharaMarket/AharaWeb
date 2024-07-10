import React from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  let navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Register Your Account</h1>
      <div className="buttons"> {/* Container for buttons */}
        <button className="button" onClick={() => navigate('/market/distributor-registration')}>
          Register as Distributor
        </button>
        <button className="button" onClick={() => navigate('/market/restaurant-registration')}>
          Register as Restaurant
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
