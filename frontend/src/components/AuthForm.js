import { Link } from 'react-router-dom';

function AuthForm({ formName, buttonText, name, title, onSubmit, ...props }) {
  return (
    <section className="authpage">
      <h2 className="popup__title popup__title_auth">{title}</h2>
      <form
        name={name}
        className="popup__form popup__form_auth"
        onSubmit={onSubmit}
      >
        {props.children}
        <button
          className="popup__submit-button popup__submit-button_auth"
          type="submit"
        >
          {buttonText}
        </button>
      </form>
      {formName === 'register' && (
        <p className="authpage__text">
          Уже зарегистрированы?
          <Link className="authpage__link" to="/sign-in">
            Войти
          </Link>
        </p>
      )}
    </section>
  );
}

export default AuthForm;
