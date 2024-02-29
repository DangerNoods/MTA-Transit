import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';

const LoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
    },
  });

  return <button onClick={() => login()}>Sign in with Google</button>;
};

export default LoginButton;
