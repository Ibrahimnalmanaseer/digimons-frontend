import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';


function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <Button id="ButtonDesign" style={{ width: "200px", height: "50px",fontSize:"25px"}} variant="primary" onClick={loginWithRedirect}>Log in</Button>
  );
}

export default LoginButton;