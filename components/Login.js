import Image from 'next/image';
import React from 'react';
import facebookLogo from '../public/facebook-logo.png';
import { signIn } from 'next-auth/react';

function Login() {
  return (
    <div className='grid place-items-center mt-20'>
      <Image src={facebookLogo} height={200} width={200} objectFit='contain' />
      <h1
        className='p-5 mt-10 bg-blue-500 rounded-full text-white  text-center cursor-pointer'
        onClick={signIn}
      >
        Login with Facebook
      </h1>
    </div>
  );
}

export default Login;
