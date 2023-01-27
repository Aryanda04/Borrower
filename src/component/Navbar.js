import { useContext } from "react";
import { Context } from "../contex/AppContext";
import logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";
import { auth } from "../firebase";
const Nav = () => {
  const route = useLocation();
  const { state } = useContext(Context);

  let { dataUser, user } = state;
  return (
    <>
      <nav>
        <a className="leftContainer" href="/">
          <img className="logo" src={logo} alt="logo" />
          <h2>Borrower</h2>
        </a>
        {route.pathname === "/" || route.pathname === "/admin" ? (
          <></>
        ) : (
          <>
            {dataUser.nama === "-" ? (
              <h2>Hello, {dataUser.uid}</h2>
            ) : (
              <h2>Hello, {dataUser.nama}</h2>
            )}
          </>
        )}
        {user ? (
          <button className="logOutButton" onClick={() => auth.signOut()}>
            Logout
          </button>
        ) : (
          <div></div>
        )}
      </nav>
    </>
  );
};

export default Nav;
