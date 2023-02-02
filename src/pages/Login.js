import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DataContext from '../context/DataContext';
import logo from '../images/logoRecipes.svg';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();
  const { setUser } = useContext(DataContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  // Valida se o email é válido e se a senha tem mais de 6 caracteres
  const validateButton = () => {
    const { email, password } = formData;
    const minCharName = 6;
    const verifyEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email);
    const verifyName = password.length > minCharName;
    return verifyEmail && verifyName;
  };

  // Ao clicar no botão, o usuário é redirecionado para a página de receitas, seu email é salvo no localStorage e no context
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = formData;
    const user = { email };
    history.push('/meals');
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const { email, password } = formData;

  return (
    <main className="flex flex-col justify-between items-center w-screen h-screen">
      <div className="flex justify-center items-center bg-purple-800 w-full h-1/2">
        <img src={ logo } alt="logo" className="m-auto" />
      </div>
      <h1 className="text-2xl uppercase text-purple-700 text-center">Login</h1>
      <form onSubmit={ handleSubmit } className="flex flex-col gap-2 p-2">
        <input
          type="email"
          value={ email }
          onChange={ handleChange }
          placeholder="Email"
          data-testid="email-input"
          className="input input-bordered input-primary w-full max-w-xs"
          name="email"
        />
        <input
          type="password"
          data-testid="password-input"
          name="password"
          placeholder="Senha"
          className="input input-bordered input-primary w-full max-w-xs"
          value={ password }
          onChange={ handleChange }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          className="
          bg-purple-600
          text-white
          text-lg
          rounded-lg
          p-2
          duration-200
          enabled:hover:bg-purple-800
          disabled:bg-gray-500
          disabled:cursor-not-allowed"
          disabled={ !validateButton() }
        >
          Enviar
        </button>
      </form>
    </main>
  );
}

export default Login;
