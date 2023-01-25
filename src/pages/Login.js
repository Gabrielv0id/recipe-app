function Login() {
  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">
          Email
          <input type="email" data-testid="email-input" name="email" />
        </label>
        <label htmlFor="password">
          Password
          <input type="password" data-testid="password-input" name="password" />
        </label>
        <button type="submit" data-testid="login-submit-button">Enviar</button>
      </form>
    </main>
  );
}

export default Login;
