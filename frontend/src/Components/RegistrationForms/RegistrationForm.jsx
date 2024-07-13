import React from 'react';
import './RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
  let navigate = useNavigate();

  return (
    <div className="registrationcontainer">
      <h1 className="registrationtitle">Register Your Account</h1>
      <div className="registrationbuttons"> {/* Container for buttons */}
        <button className="registrationbutton" onClick={() => navigate('/market/distributor-registration')}>
          Register as Distributor
        </button>
        <button className="registrationbutton" onClick={() => navigate('/market/restaurant-registration')}>
          Register as Restaurant
        </button>
      </div>
    </div>
  );
}

export default RegistrationForm;
