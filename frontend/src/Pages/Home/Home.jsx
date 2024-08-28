import * as React from 'react';

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');

  // const theme = createTheme({
  //   palette: {
  //     mode: mode,
  //   },
  // });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <h1></h1>
  );
}
