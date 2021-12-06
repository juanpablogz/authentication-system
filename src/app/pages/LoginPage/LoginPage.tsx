/* --- DEPENDENCIES --- */
import React from 'react';
import cn from 'classnames';
import LoginForm from '@organisms/Forms/LoginForm/LoginForm';
import './LoginPage.scss';
/* -------------------- */

type Props = {
  readonly className?: string;
};

const LoginPage: React.FC<Props> = ({ className }) => {
  /*--------------------*/
  /*  CLASS ASSIGNMENT  */
  /*--------------------*/
  const loginPageClass = cn('login-page bg-default-snow w-full h-screen', className);

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <div className={loginPageClass}>
      <div className="flex items-center justify-center h-full">
        <div
          style={{ width: '600px' }}
          className="bg-white shadow rounded-lg flex flex-col items-center pt-6 pb-16 px-32"
        >
          <LoginForm className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
