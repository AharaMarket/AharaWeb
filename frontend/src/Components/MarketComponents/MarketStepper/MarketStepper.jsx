import * as React from 'react';
// import { Box, Stepper, Step, StepButton, Button, Typography } from '@mui/material';
import { Redirect, Route, Routes } from 'react-router-dom';
import './MarketStepper.css';

const steps = [
  { label: 'Import Order (Optional)', path: '/market/importorder', optional: true },
  { label: 'Ingredient Selection', path: '/market/ingredientmarketplace' },
  { label: 'Vendor Selection', path: '/market/vendorselection' },
  { label: 'Order Confirmation', path: '/market/orderconfirmation' }
];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const navigate = Redirect();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    navigate(steps[step].path);
  };

  const handleNext = () => {
    const newCompleted = completed;
    // Mark the current step as completed if it's not optional
    if (!steps[activeStep].optional) {
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
    }
    const nextStep = isLastStep() && !allStepsCompleted() ? 
      steps.findIndex((step, i) => !(i in newCompleted)) : activeStep + 1;
    setActiveStep(nextStep);
    navigate(steps[nextStep].path);
  };

  const handleBack = () => {
    const prevStep = activeStep - 1 >= 0 ? activeStep - 1 : 0;
    setActiveStep(prevStep);
    navigate(steps[prevStep].path);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    navigate(steps[0].path);
  };

  return (
    <h1></h1>
    // <Box className="stepperContainer">
    //   <Stepper nonLinear activeStep={activeStep}>
    //     {steps.map((step, index) => (
    //       <Step key={step.label} completed={completed[index]} optional={step.optional}>
    //         <StepButton color="inherit" onClick={handleStep(index)}>
    //           {step.label}
    //         </StepButton>
    //       </Step>
    //     ))}
    //   </Stepper>
    //   <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
    //     <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
    //       Back
    //     </Button>
    //     <Box sx={{ flex: '1 1 auto' }} />
    //     <Button onClick={handleNext}>
    //       {isLastStep() ? 'Finish' : 'Next'}
    //     </Button>
    //   </Box>
    //   <Routes>
    //     {steps.map((step, index) => (
    //       <Route path={step.path} element={<Typography>Content for {step.label}</Typography>} key={index} />
    //     ))}
    //   </Routes>
    // </Box>
  );
}
