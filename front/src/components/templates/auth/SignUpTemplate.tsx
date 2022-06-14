import React from 'react';
import SignUp from 'components/modules/auth/SignUp';
import Image from 'components/atoms/image/Image';
import { Template } from './AuthTemplate.style';
import { IMAGE } from 'components/utils/image';
function SignInTemplate() {
  return (
    <Template>
      <Image src={IMAGE.AUTH_LOGO.url} alt={IMAGE.AUTH_LOGO.alt} />
      <SignUp />
    </Template>
  );
}

export default SignInTemplate;
