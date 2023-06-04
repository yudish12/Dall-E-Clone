import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import Dropdown from "./Dropdown";

const Header = () => {
  const { userDispatch } = useGlobalContext();
  const { user } = useAuth0();
  const { logout } = useAuth0();

  const [loggedIn, setLoggedIn] = useState();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [setLoggedIn, user]);

  return (
    <>
      <nav className="nav flex flex-row justify-around gap-x-96 align-middle">
        <Link to={"/"} className="logo flex align-middle">
          <img src={logo} className="w-40" alt="logo" />
        </Link>
        <>
          {loggedIn ? (
            <div className="login flex align-middle p-4">
              <Link
                to={"/"}
                className="Btn"
                onClick={() => {
                  userDispatch({ type: "LOGOUT" });
                  setLoggedIn(false);
                  localStorage.clear();
                  logout({
                    logoutParams: {
                      returnTo: `${window.location.origin}`,
                    },
                  });
                }}
              >
                Logout
              </Link>
              <Link to={"/posts"} className="Btn ml-10">
                View Posts
              </Link>
              <Dropdown />
            </div>
          ) : (
            <div className="login flex align-middle p-4">
              <Link to={"/login"} className="Btn">
                Login
              </Link>
              <Link to={"/posts"} className="Btn ml-10">
                View Posts
              </Link>
            </div>
          )}
        </>
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
