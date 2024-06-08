import React, { useRef, useEffect, useState, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, BrowserRouter as Router } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/about', display: 'About' },
  { path: '/tours', display: 'Tours' },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    // Implement the navigation logic if needed
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
      <header className="header" ref={headerRef}>
        <Container>
          <Row>
            <div className='nav__wrapper d-flex align-items-center justify-content-between'>
              <Link to="/"><div className="logo"><img src={logo} alt="" /></div></Link>

              <div className="navigation" ref={menuRef}>
                <ul className="menu d-flex align-items-center gap-5">
                  <li className="nav__item">
                    <NavLink to="/home" className={({ isActive }) => isActive ? "active__link" : ""}>Home</NavLink>
                  </li>
                  <li className="nav__item">
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active__link" : ""}>About</NavLink>
                  </li>
                  <li className="nav__item">
                    <div className="dropdown">
                      <button className="dropdown-toggle">Nepal</button>
                      <ul className="dropdown-menu">
                        <li className="nested-dropdown">
                          <button className="dropdown-toggle">Trekking in Nepal</button>
                          <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="#">Everest Panorama Trek – 9 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">EBC Trek with Helicopter Return – 12 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">Everest Base Camp Trek – 14 Days</Link></li>
                            {/* Add more items here */}
                          </ul>
                        </li>

                        <li className="nested-dropdown">
                          <button className="dropdown-toggle">Climbing and Expedition</button>
                          <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="#">Everest Panorama Trek – 9 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">EBC Trek with Helicopter Return – 12 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">Everest Base Camp Trek – 14 Days</Link></li>
                            {/* Add more items here */}
                          </ul>

                          <li className="nested-dropdown">
                          <button className="dropdown-toggle">Cultural Tour and Sightseeing</button>
                          <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="#">Everest Panorama Trek – 9 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">EBC Trek with Helicopter Return – 12 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">Everest Base Camp Trek – 14 Days</Link></li>
                            {/* Add more items here */}
                          </ul>
                        </li>

                        <li className="nested-dropdown">
                          <button className="dropdown-toggle">Cycling and Mountain Biking</button>
                          <ul className="dropdown-menu">
                            <li className="dropdown-item"><Link to="#">Everest Panorama Trek – 9 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">EBC Trek with Helicopter Return – 12 Days</Link></li>
                            <li className="dropdown-item"><Link to="#">Everest Base Camp Trek – 14 Days</Link></li>
                            {/* Add more items here */}
                          </ul>
                        </li>

                        </li>
                        {/* <li className="dropdown-item"><Link to="#">Climbing and Expedition</Link></li>
                        <li className="dropdown-item"><Link to="#">Cultural Tour and Sightseeing</Link></li>
                        <li className="dropdown-item"><Link to="#">Cycling and Mountain Biking</Link></li> */}
                        {/* Add more items here */}
                      </ul>
                    </div>
                  </li>
                  <li className="nav__item">
                    <div className="dropdown">
                      <button className="dropdown-toggle">Bhutan</button>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item"><Link to="#">Tour 1</Link></li>
                        <li className="dropdown-item"><Link to="#">Tour 2</Link></li>
                        {/* Add more items here */}
                      </ul>
                    </div>
                  </li>
                  <li className="nav__item">
                    <div className="dropdown">
                      <button className="dropdown-toggle">Tibet</button>
                      <ul className="dropdown-menu">
                        <li className="dropdown-item"><Link to="#">Tour 1</Link></li>
                        <li className="dropdown-item"><Link to="#">Tour 2</Link></li>
                        {/* Add more items here */}
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="nav__right d-flex align-items-center gap-4">
                <div className="nav__btns d-flex align-items-center gap-4">
                  {user ? (
                    <>
                      <h5 className="mb-0">{user.username}</h5>
                      <Button className="btn btn-dark" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn secondary__btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary__btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
                <span className="mobile__menu" onClick={toggleMenu}>
                  <i className="ri-menu-fold-line"></i>
                </span>
              </div>
            </div>
          </Row>
        </Container>
      </header>
   
  );
};

export default Header;
