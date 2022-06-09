import React from 'react';
import SignIn from 'components/molecule/signIn/SignIn';
import Image from 'components/atoms/image/Image';
import { Template } from './AuthTemplate.style';
import { IMAGE } from 'components/utils/image';
function SignInTemplate() {
  return (
    <Template>
      <Image src={IMAGE.AUTH_LOGO.url} alt={IMAGE.AUTH_LOGO.alt} />
      <SignIn />
    </Template>
  );
}

export default SignInTemplate;
