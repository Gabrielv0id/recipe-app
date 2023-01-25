import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import App from '../App';

describe('Farewell, front-end', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
  });

  const email = 'trybe@gmail.com';
  const password = '1234567';
  const wrongEmail = 'trybegmail.com';
  const wrongPassword = '12345';

  test('se esta na pagina de login', () => {
    const heading = screen.getByRole('heading', { name: /login/i });
    expect(heading).toBeInTheDocument();
  });

  test('se o botão de login está comeca desabilitado e apos inputs, habilita', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(loginButton).toBeEnabled();
  });

  test('se o botão de login está desabilitado se passar email ou senha errado', async () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(passwordInput, password);

    expect(loginButton).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, email);
    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, wrongPassword);

    expect(loginButton).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, email);
    userEvent.clear(passwordInput);
    userEvent.type(passwordInput, password);

    userEvent.click(loginButton);

    await wait(async () => {
      const heading = await screen.findByRole('heading', { name: /recipe/i });
      expect(heading).toBeInTheDocument();
    });
  });
});
