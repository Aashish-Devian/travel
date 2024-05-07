import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Make sure to import BrowserRouter as Router

import Home from './../Pages/Home';
import Tours from './../Pages/Tours';
import TourDetails from './../Pages/TourDetails';
import Login from './../Pages/Login';
import Register from './../Pages/Register';
import SearchResultList from './../Pages/SearchResultList';

const Routers = () => {
  return (
    <Router> {/* Wrap your Routes in a Router component */}
      <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/tours' element={<Tours />} />
          <Route path='/tours/:id' element={<TourDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tours/search' element={<SearchResultList />} />
      </Routes>
    </Router>
  );
};

export default Routers;

