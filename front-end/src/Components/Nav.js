import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png"

const Nav = () => {
  const [showList, setShowList] = useState(false);
  const toggleList = () => {
    setShowList(!showList);
  };

  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="logo">
            <Link to="/"><img className="logo-img" src={logo} alt="logo"/></Link>
          </div>
          <div className={`main_list ${showList ? "show_list" : ""}`}>
            {auth ? (
              <ul className="ul-auth">
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/add">Add Products</Link>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/update">Update Products</Link>
                </li>
                <li>
                  <Link to="/signup" onClick={logout}>
                    Logout ({JSON.parse(auth).name})
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="ul-noauth">
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </div>
          <div className="media_button">
            <button
              className={`main_media_button ${showList ? "active" : ""}`}
              onClick={toggleList}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
