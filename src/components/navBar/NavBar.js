import React from "react";
import { Container, Row } from "reactstrap";
import style from "./NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {} from "react-router-dom";
const NavBar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const isAdminFromRedux = useSelector((state) => state.isAdmin);
  const logout = () => {
    removeCookie("token", { path: "/" });
    console.log(location);
    navigate("/");
    window.location.reload();
  };
  return (
    <div className={style.contenar}>
      <nav className={style.nav}>
        <div className={style.logo}>
          <img src={require("../images/logo.svg").default} alt="logo" />
          {isAdminFromRedux.allow ? (
            <Link to="/" className={style.link}>
              Go Home
            </Link>
          ) : (
            <a href="https://www.focal-x.com" className={style.link}>
              Go Home
            </a>
          )}
          <span>
            {isAdminFromRedux.allow && (
              <Link to="add" className={style.linkAdd}>
                add member
              </Link>
            )}
          </span>
          <span>
            {isAdminFromRedux.allow && (
              <Link to="user" className={style.linkEdit}>
                Members
              </Link>
            )}
          </span>
          <span>
            {isAdminFromRedux.allow && (
              <p className={style.logout} onClick={logout}>
                Logout
              </p>
            )}
          </span>
        </div>
        <div className={style.contact}>
          <p>
            <span>
              <b>Sales :</b> contact@focal-x.com{" "}
            </span>{" "}
            | <span className={style.spans}> +963 935 033 139</span>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
