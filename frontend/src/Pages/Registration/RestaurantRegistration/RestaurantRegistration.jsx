import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import RestaurantRegistrationForm from '../../../Components/RegistrationForms/RestaurantRegistration/RestaurantRegistrationForm'
function RestaurantRegistration() {
  return (
    <div>
        <RestaurantRegistrationForm></RestaurantRegistrationForm>
    </div>
  );
}

export default RestaurantRegistration;