
import React, { useRef, useEffect, useState, useContext } from 'react';
import { Container, Row, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink, useNavigate, Link, BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import logo from '../../assets/images/logo.png';
import './header.css';
import { AuthContext } from "../../context/AuthContext";

const navLinks = [
  // {
  //   path: '/home',
  //   display: 'Home',
  // },
  // {
  //   path: '/about',
  //   display: 'About',
  // },
  {
    path: '/tours',
    display: 'Tours',
  },
  {
    path: '',
    display: 'Nepal',
    dropdown: [
      {
        path: '',
        display: 'Trekking in Nepal'
      },
      {
        path: '',
        display: 'Climbing and Expedition'
      },
      {
        path: '',
        display: 'Cultural Tour and Sightseeing'
      },
      {
        path: '/tours/cycling-and-mountain-biking',
        display: 'Cycling and Mountain Biking'
      },
      {
        path: '/tours/luxury-treks',
        display: 'Luxury Treks'
      },
      {
        path: '/tours/luxury-tours',
        display: 'Luxury Tours'
      },
      {
        path: '/tours/day-trips',
        display: 'Day Trips'
      },
      {
        path: '/tours/multi-country-tours',
        display: 'Multi Country Tours'
      },
      {
        path: '/tours/voluntourism-trips',
        display: 'Voluntourism Trips'
      },
      {
        path: '/tours/extend-your-trip',
        display: 'Extend Your Trip'
      },
    ]
  },

  {
    path: '',
    display: 'Bhutan',
    dropdown: [
      {
        path: '/tours/trekking-in-nepal',
        display: 'Trekking in Nepal'
      }
    ]
  },

  {
    path: '',
    display: 'Tibet',
    dropdown: [
      {
        path: '/tours/trekking-in-nepal',
        display: 'Trekking in Nepal'
      }
    ]
  },

  {
    path: '',
    display: 'Company',
    dropdown: [
      {
        path: '/about',
        display: 'About Us'
      }
    ]
  },


];

const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // This might be causing the error
  const { user, dispatch } = useContext(AuthContext);
  
  const [dropdownOpen, setDropdownOpen] = useState({
    Nepal: false,
    Bhutan: false,
    Tibet: false,
    Company: false,
  });

  const toggle = (item) => {
    setDropdownOpen((prevState) => ({ ...prevState, [item]: !prevState[item] }));
  };

  const logout = () => { 
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', ()=>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");


  return (
    // <Router>
    <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className='nav__wrapper d-flex align-items-center justify-content-between'>
          {/* ========== logo ========= */}

        <Link to="/"><div className="logo">
            <img src={logo} alt="" />
          </div></Link>
          {/* ========== logo  end ========= */}

          {/* ========== menu start ========= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu d-flex align-items-center gap-5">
              {navLinks.map((item, index) => (
                <li className="nav__item" key={index}>
                  {item.dropdown ? (
                    <Dropdown isOpen={dropdownOpen[item.display]} toggle={() => toggle(item.display)}>
                      <DropdownToggle nav caret>
                        {item.display}
                      </DropdownToggle>
                      <DropdownMenu>
                        {item.dropdown.map((subItem, subIndex) => (
                          <DropdownItem key={subIndex}>
                            <Link to={subItem.path}>{subItem.display}</Link>
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Link to={item.path}>{item.display}</Link>
                  )}
                </li>
              ))}
              {/* {user && (
                <li className="nav__item">
                  <Button onClick={logout}>Logout</Button>
                </li>
              )} */}
            </ul>
          </div>
          {/* ========== menu  end ========= */}



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
    // </Router>
  );
};

export default Header;