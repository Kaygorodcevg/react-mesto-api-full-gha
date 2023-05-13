import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ loggedIn, email, logout }) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={headerLogo} alt="Заголовок" className="header__logo"></img>
      <div className="header__info-wrapper">
        <>
          {loggedIn ? (
            <>
              <p className="header__email">{email}</p>
              <Link
                to="sign-up"
                className={`header__button ${
                  loggedIn && 'header__button_active'
                }`}
                onClick={logout}
              >
                Выйти
              </Link>
            </>
          ) : (
            <>
              {location.pathname === '/sign-up' ? (
                <Link to="/sign-in" className="header__button">
                  Войти
                </Link>
              ) : (
                <Link to="/sign-up" className="header__button">
                  Регистрация
                </Link>
              )}
            </>
          )}
        </>
      </div>
    </header>
  );
}

export default Header;
