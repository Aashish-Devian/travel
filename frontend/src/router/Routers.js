import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Make sure to import BrowserRouter as Router
import Header from "../components/Header/Header"
import Home from './../Pages/Home';
import Tours from './../Pages/Tours';
import TourDetails from './../Pages/TourDetails';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import SearchResultList from './../Pages/SearchResultList';
import ThankYou from '../Pages/ThankYou';
import Footer from "../components/Footer/Footer"

const Routers = () => {
  return (
    <Router> {/* Wrap your Routes in a Router component */}
    <Header />
      <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/tours' element={<Tours />} />
          <Route path='/tours/:id' element={<TourDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/thank-you' element={<ThankYou />} />
          <Route path='/tours/search' element={<SearchResultList />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Routers;

