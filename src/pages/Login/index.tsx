import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/authContext';

import logo from '../../assets/images/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import './styles.css';

interface SignInFormData {
  email: string;
  password: string;
}

const Login:React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { signIn, error } = useAuth();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      await signIn({
        email: data.email,
        password: data.password
      });

      history.push('/home');
    } catch (err) {
      throw new Error(err);
    }
  }, [signIn, history]);

  return (
    <section className="login-container">
      <Form onSubmit={handleSubmit} ref={formRef}>
        <img src={logo} alt="Logo"/>

        <Input 
          label="E-mail"
          placeholder="E-mail"
          name="email"
          type="email"
        />
        <Input 
          label="Senha"
          placeholder="Senha"
          name="password"
          type="password"
        />

        {error && (
          <p className="field-error login-field">E-mail ou senha inválidos.</p>
        )}

        <Button type="submit">
          Enviar
        </Button>
      </Form>
    </section>
  );
}

export default Login;