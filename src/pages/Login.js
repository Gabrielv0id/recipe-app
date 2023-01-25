import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const validateButton = () => {
    const { email, password } = formData;
    const minCharName = 6;
    const verifyEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email);
    const verifyName = password.length > minCharName;
    return verifyEmail && verifyName;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = formData;
    const user = { email };
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const { email, password } = formData;

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email
          <input
            type="email"
            value={ email }
            onChange={ handleChange }
            data-testid="email-input"
            name="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !validateButton() }
        >
          Enviar
        </button>
      </form>
    </main>
  );
}

export default Login;
