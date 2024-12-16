import React, { Component } from 'react';

import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';

import TentangKami from "../../pages/tentang_kami/tentang_kami";
import './style.css';

class Header extends Component {
  // componentDidMount() {
  //   let headroom = new Headroom(document.getElementById("navbar-main"));
  //   // initialise
  //   headroom.init();
  // }
  state = {
    collapseClasses: "",
    collapseOpen: false,
  };

  onExiting = () => {
    this.setState({
      collapseClasses: "collapsing-out",
    });
  };

  onExited = () => {
    this.setState({
      collapseClasses: "",
    });
  };
  render() {
    return (
      <header className="bg-white">
        <nav className="navbar navbar-expand-lg navbar-light" style={{ height: '100%' }}>
          <div className="container justify-content-between" style={{ height: '100%' }}>
            <a className="navbar-brand" href="#" style={{ height: '100%' }}>
              <img src={require("../../image/logo.png")} alt="Agrera Logo" style={{ height: '100%' }} />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    <span>
                      Home
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/artikel" className="nav-link">
                    <span>
                      Artikel
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/edukasi" className="nav-link">
                    <span>
                      Edukasi
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/forum" className="nav-link">
                    <span>
                      Komunitas & Forum
                    </span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/tentang-kami" className="nav-link">
                    <span>
                      Tentang Kami
                    </span>
                  </NavLink>
                </li>
              </ul>
              <Link to="/login">
                <button className="btn px-5 ms-auto rounded-4" style={{ backgroundColor: '#1E7C6A', color: '#fff' }}>
                  Login
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header;