import React, { useRef, useEffect, useContext, useState } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  { path: '/tours', display: 'Tours' },
  {
    display: 'Nepal',
    subLinks: [
      {
        display: 'Trekking in Nepal',
        subLinks: [
          { path: '#', display: '1 Everest Panorama Trek – 9 Days' },
          { path: '#', display: '1 EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: '1 Everest Base Camp Trek – 14 Days' },
          { path: '#', display: '1 Gokyo Lake Trek – 13 Days' },
          { path: '#', display: '1 Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
      {
        display: 'Climbing and Expedition',
        subLinks: [
          { path: '#', display: '2Everest Panorama Trek – 9 Days' },
          { path: '#', display: '2EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: '2Everest Base Camp Trek – 14 Days' },
          { path: '#', display: '2Gokyo Lake Trek – 13 Days' },
          { path: '#', display: 'G22okyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
      {
        display: 'Cultural Tour and Sightseeing',
        subLinks: [
          { path: '#', display: '3Everest Panorama Trek – 9 Days' },
          { path: '#', display: '3EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: '3Everest Base Camp Trek – 14 Days' },
          { path: '#', display: '3Gokyo Lake Trek – 13 Days' },
          { path: '#', display: '3Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
      {
        display: 'Cycling and Mountain Biking',
        subLinks: [
          { path: '#', display: '4 Everest Panorama Trek – 9 Days' },
          { path: '#', display: '4 EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: '4 Everest Base Camp Trek – 14 Days' },
          { path: '#', display: '4 Gokyo Lake Trek – 13 Days' },
          { path: '#', display: '4 Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
    ],
  },
  {
    display: 'Bhutan',
    subLinks: [
      {
        display: 'Tour 1',
        subLinks: [
          { path: '#', display: 'Everest Panorama Trek – 9 Days' },
          { path: '#', display: 'EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: 'Everest Base Camp Trek – 14 Days' },
          { path: '#', display: 'Gokyo Lake Trek – 13 Days' },
          { path: '#', display: 'Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
      {
        display: 'Tour 2',
        subLinks: [
          { path: '#', display: 'Everest Panorama Trek – 9 Days' },
          { path: '#', display: 'EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: 'Everest Base Camp Trek – 14 Days' },
          { path: '#', display: 'Gokyo Lake Trek – 13 Days' },
          { path: '#', display: 'Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
    ],
  },
  {
    display: 'Tibet',
    subLinks: [
      {
        display: 'Tour 1',
        subLinks: [
          { path: '#', display: 'Everest Panorama Trek – 9 Days' },
          { path: '#', display: 'EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: 'Everest Base Camp Trek – 14 Days' },
          { path: '#', display: 'Gokyo Lake Trek – 13 Days' },
          { path: '#', display: 'Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
      {
        display: 'Tour 2',
        subLinks: [
          { path: '#', display: 'Everest Panorama Trek – 9 Days' },
          { path: '#', display: 'EBC Trek with Helicopter Return – 12 Days' },
          { path: '#', display: 'Everest Base Camp Trek – 14 Days' },
          { path: '#', display: 'Gokyo Lake Trek – 13 Days' },
          { path: '#', display: 'Gokyo and Renjo La Pass Trek – 14 Days' },
        ],
      },
    ],
  },
  {
    display: 'Company',
    subLinks: [
      { path: '/about', display: 'About' },
      { path: '#', display: 'Tour 2' },
    ],
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, dispatch } = useContext(AuthContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeNestedDropdown, setActiveNestedDropdown] = useState(null);
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener('scroll', stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show__menu');

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
    setActiveNestedDropdown(null); // Close nested dropdowns when toggling main dropdown
  };

  const handleNestedDropdownToggle = (index) => {
    setActiveNestedDropdown(activeNestedDropdown === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setActiveDropdown(null);
      setActiveNestedDropdown(null);
      menuRef.current.classList.remove('show__menu');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    menuRef.current.classList.remove('show__menu');
    setActiveDropdown(null);
    setActiveNestedDropdown(null);
  }, [location]);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <Link to="/">
              <div className="logo">
                <img src={logo} alt="Logo" />
              </div>
            </Link>

            <div className="navigation" ref={menuRef}>
              <ul className="menu d-flex align-items-center">
                {navLinks.map((navLink, index) => (
                  <li key={index} className="nav__item">
                    {navLink.path ? (
                      <NavLink to={navLink.path} className={({ isActive }) => (isActive ? 'active__link' : '')}>
                        {navLink.display}
                      </NavLink>
                    ) : (
                      <div className="dropdown">
                        <span className="dropdown-toggles" onClick={() => handleDropdownToggle(index)}>
                          {navLink.display}
                          <span className={`arrow ${activeDropdown === index ? 'open' : ''}`}>
                            <i className="ri-arrow-down-s-line"></i>
                          </span>
                        </span>
                        <ul className={`dropdown-menu ${activeDropdown === index ? 'show' : ''}`}>
                          {navLink.subLinks.map((subLink, subIndex) => (
                            <li key={subIndex} className="dropdown-item">
                              {subLink.subLinks ? (
                                <div className="nested-dropdown">
                                  <span className="dropdown-toggles" onClick={() => handleNestedDropdownToggle(subIndex)}>
                                    {subLink.display}
                                    <span className={`arrow ${activeNestedDropdown === subIndex ? 'open' : ''}`}>
                                      <i className="ri-arrow-right-s-line"></i>
                                    </span>
                                  </span>
                                  <ul className={`dropdown-menu nested ${activeNestedDropdown === subIndex ? 'show' : ''}`}>
                                    {subLink.subLinks.map((nestedSubLink, nestedSubIndex) => (
                                      <li key={nestedSubIndex} className="dropdown-item">
                                        <NavLink to={nestedSubLink.path}>{nestedSubLink.display}</NavLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ) : (
                                <NavLink to={subLink.path}>{subLink.display}</NavLink>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
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
