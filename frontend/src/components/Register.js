import React, { useState } from 'react';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    e.target.name === 'Email' ? setEmail(value) : setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ password, email });
  };

  return (
    <AuthForm
      formName="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <div className="popup__input-wrapper">
        <input
          id="email"
          name="Email"
          type="email"
          className="popup__input popup__input_email"
          placeholder="Email"
          minLength="8"
          maxLength="40"
          required
          value={email}
          onChange={handleChange}
        />
        <span className="popup__input-error email-input-error"></span>
      </div>
      <div className="popup__input-wrapper">
        <input
          id="password"
          name="Password"
          type="password"
          className="popup__input popup__input_password"
          placeholder="Password"
          minLength="4"
          maxLength="40"
          required
          value={password}
          onChange={handleChange}
        />
        <span className="popup__input-error passwod-input-error"></span>
      </div>
    </AuthForm>
  );
}

export default Register;
