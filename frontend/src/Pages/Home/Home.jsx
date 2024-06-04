import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import AppAppBar from '../../Components/HomeComponents/AppAppBar';
import Hero from '../../Components/HomeComponents/Hero';
import LogoCollection from '../../Components/HomeComponents/LogoCollection';
import Highlights from '../../Components/HomeComponents/Highlights';
import Pricing from '../../Components/HomeComponents/Pricing';
import Features from '../../Components/HomeComponents/Features';
import Testimonials from '../../Components/HomeComponents/Testimonials';
import FAQ from '../../Components/HomeComponents/FAQ';
import Footer from '../../Components/HomeComponents/Footer';

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
