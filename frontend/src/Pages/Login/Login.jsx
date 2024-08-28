import * as React from 'react';

function Copyright(props) {
  return (
    // <Typography variant="body2" color="text.secondary" align="center" {...props}>
      // {'Copyright © '}
      // <Link color="inherit" href="https://mui.com/">
      //   Your Website
      // </Link>{' '}
      // {new Date().getFullYear()}
      // {'.'}
    {/* </Typography> */}
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <h1>Login
    </h1>
  );
}