/* --- DEPENDENCIES --- */
import React, { useState } from 'react';
import cn from 'classnames';
import { LoginFormFields, validateBasicFields, ValidationError } from '@validators/loginFormValidator';
import { isEmpty } from '@utils/utils';
import { useAuth, ErrorCode } from '@contexts/AuthContext';
import {
  Button,
  ButtonSize,
  ButtonType,
  Divider,
  DividerColor,
  DividerSpacing,
  Logo,
  LogoColor,
  LogoSize,
  LogoType,
  TextInput,
  TextInputSize,
  TextInputType,
  useForm,
} from '@arleneio/editors-common-ui';
/* -------------------- */

type Props = {
  readonly onSuccess?: () => void;
  readonly className?: string;
};

const LoginForm: React.FC<Props> = ({ className, onSuccess }) => {
  /*------------------*/
  /*  INIT VARIABLES  */
  /*------------------*/
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  /*------------------*/
  /* CLASS ASSIGNMENT */
  /*------------------*/
  const loginFormClass = cn('ase-login-form', className);

  /*------------------*/
  /*    FORM LOGIC    */
  /*------------------*/
  const formFields: LoginFormFields = {
    email: '',
    password: '',
  };

  const onSubmit = async (values, errors): Promise<void> => {
    if (!isEmpty(errors)) return;

    setLoading(true);
    const response = await login(values.email, values.password);
    if (!response) {
      setLoading(false);
      return;
    }

    if (response === ErrorCode.notFound) {
      setErrorMessage("We couldn't find a user with these credentials");
      setLoading(false);
      return;
    }

    if (response === ErrorCode.wrongPassword) {
      setErrorMessage('Your email and password are not quite right');
      setLoading(false);
      return;
    }

    if (onSuccess) onSuccess();
  };

  const { errors, handleChange, handleSubmit } = useForm<LoginFormFields, ValidationError>(
    formFields,
    onSubmit,
    validateBasicFields,
  );

  /*------------------*/
  /*    RENDER JSX    */
  /*------------------*/
  return (
    <form className={loginFormClass} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <Logo size={LogoSize.md} color={LogoColor.default} type={LogoType.complete}></Logo>
        <Divider className="mb-8" spacing={DividerSpacing.sm} color={DividerColor.darkSnow} />
        <h1 className="text-3xl font-semi-bold">Welcome.</h1>
        <p className="text-lg font-regular">Log in to continue</p>
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Email</label>
        <TextInput
          name="email"
          size={TextInputSize.sm}
          onChange={handleChange}
          placeholder="e.g. richard@company.com"
          block
        />
        {errors?.email && <p className="text-default-negative text-sm">{errors?.email}</p>}
      </div>

      <div className="flex flex-col mb-10">
        <label className="text-base font-semi-bold text-medium-slate mb-2">Password</label>
        <TextInput
          name="password"
          type={TextInputType.password}
          size={TextInputSize.sm}
          onChange={handleChange}
          block
        />
        {errors?.password && <p className="text-default-negative text-sm">{errors?.password}</p>}
      </div>

      {errorMessage && (
        <div className="flex flex-col items-center justify-center border border-default-negative p-2 w-full mb-4">
          <p className="text-sm text-default-negative font-regular">{errorMessage}</p>
        </div>
      )}

      <div className="flex mb-2">
        <Button type={ButtonType.submit} size={ButtonSize.sm} block isDisabled={loading}>
          {loading ? 'Loading...' : 'Log in'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
