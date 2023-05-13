import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/sign-in' ? (
        <></>
      ) : location.pathname === '/sign-up' ? (
        <></>
      ) : (
        <footer className="footer">
          <p className="footer__text">&copy; 2023 Mesto Russia</p>
        </footer>
      )}
    </>
  );
}

export default Footer;
