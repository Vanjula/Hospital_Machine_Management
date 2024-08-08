import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Machine from './components/machine';
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";
import Records from "./components/records"
import Updation from "./components/updation"
import Land from "./components/landing";
function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          <Route path="/add-machine" element={<Machine />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/records" element={<Records />} />
           <Route path="/update" element={<Updation />} />
                      <Route path="/" element={<Land />} />

        </Routes>
        <Footer/>
      </Router>
      {/* <Machine /> */}
    </div>
  );
}

export default App;
