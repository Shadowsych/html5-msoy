import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import theme, { errorTheme } from '../../shared/styles/theme';
import { FlexColumn } from '../../shared/styles/flex';
import { signup } from './actions';

const Container = styled(FlexColumn)`
  padding: 8px;
  height: 100%;
  background-color: ${theme.primary};
`;

const SignupTitle = styled.div`
  margin-bottom: 8px;
  color: ${theme.secondary};
  font-size: 24px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  margin-right: 8px;
  padding: 8px;
`;

const SignupButton = styled.div`
  margin: 4px;
  padding: 6px;
  color: ${theme.secondary};
  background-color: ${theme.teritary};
  cursor: pointer;
`;

const Error = styled.div`
  color: ${errorTheme.secondary};
  font-weight: bold;
`;

export const Signup = React.memo(() => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error>();

  const onChangeUsername = (event: React.FormEvent<EventTarget>) => {
    const { value } = event.target as HTMLInputElement;
    setUsername(value);
  };

  const onChangeEmail = (event: React.FormEvent<EventTarget>) => {
    const { value } = event.target as HTMLInputElement;
    setEmail(value);
  };

  const onChangePassword = (event: React.FormEvent<EventTarget>) => {
    const { value } = event.target as HTMLInputElement;
    setPassword(value);
  };

  const onSignup = async () => {
    try {
      const user = await signup(username, email, password).promise;
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Container>
      <SignupTitle>Don&apos;t have an account? Signup</SignupTitle>
      <SignupForm>
        <InputField placeholder="Type your username here" onChange={onChangeUsername} type="text" value={username} />
        <InputField placeholder="Type your email here" onChange={onChangeEmail} type="email" value={email} />
        <InputField
          placeholder="Type your password here"
          onChange={onChangePassword}
          type="password"
          value={password}
        />
        <SignupButton onClick={onSignup}>Signup</SignupButton>
      </SignupForm>
      {error && <Error>{error.message}</Error>}
    </Container>
  );
});
