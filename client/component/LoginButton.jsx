import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginButton = () => {
  const handleLogin = async (res) => {
    console.log(res);
  };
  return (
    <>
      <GoogleLogin
        clientId="201959444032-a940k1h8ha9gq25hsc9j0uvf62ooe9fa.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={handleLogin}
        onError={(error) => console.error(error)}
      />
    </>
  );
};

export default LoginButton;
