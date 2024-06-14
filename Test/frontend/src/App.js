import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Machine from './components/machine';

function App() {
  return (
    <div className="app">
      {/* <Router>
        <Header />
        <Machine />
        <Routes>
            <Route path="/add-machine" element={<Machine />} />
        </Routes>
        <Footer/>
      </Router> */}
      <Machine />
    </div>
  );
}

export default App;
