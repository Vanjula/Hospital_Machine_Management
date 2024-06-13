import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/header';
import Footer from './component/footer';
import LandingPage from './component/landing';
import Machine from './component/machine';
import Login from './component/login'
import Register from './component/register';

function App() {
  return (
    <div className="">
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
           <Route path="/" element={<LandingPage />} />
            <Route path="/add-machine" element={<Machine />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
