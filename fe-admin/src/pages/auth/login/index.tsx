import { AuthPage } from '@refinedev/antd';

export const Login = () => {
  return (
    <AuthPage
      type="login"
      rememberMe={false}
      formProps={{
        initialValues: { email: 'demo@refine.dev', password: 'demodemo' },
      }}
    />
  );
};
