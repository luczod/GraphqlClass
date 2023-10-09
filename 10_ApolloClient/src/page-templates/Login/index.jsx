// @ts-nocheck
import { useMutation } from '@apollo/client';
import { AuthForm } from 'components/AuthForm';
import { Loading } from 'components/Loading';
import { GQL_LOGIN } from 'graphql/mutations/auth';
import { authDataManager } from 'graphql/reactve-var/auth';
import { loginFormVar } from 'graphql/reactve-var/login-form';
import { Helmet } from 'react-helmet';

/* { userName: "sultao", password: "aB12387" } */

export const Login = () => {
  loginFormVar.use();
  const [login, { loading, error }] = useMutation(GQL_LOGIN, {
    onError() {},
    onCompleted(data) {
      authDataManager.setVar({
        username: loginFormVar.get().userName,
        userId: data.login.userId,
        isLoggedIn: true,
      });

      window.location.href = '/';
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userNameInput = form.username.value;
    const passwordInput = form.password.value;

    const variables = {
      userName: userNameInput,
      password: passwordInput,
    };

    loginFormVar.set({ ...variables });

    await login({ variables });
  };

  if (loading) return <Loading loading={loading} />;
  // if (error) return <DefaultError error={error} />;

  return (
    <>
      <Helmet title="Login - GraphQL + Apollo-Client" />

      <AuthForm
        handleLogin={handleLogin}
        formDisabled={loading}
        formError={error?.message}
      />
    </>
  );
};
