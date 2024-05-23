import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import AllEmp from './Components/AllEmp';
import CurrentSalary from './Components/CurrentSalary';
import Login from './Components/Login';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>SetlloAI</h1>
          <nav className='navClass'>
            <Link className='linkClass' to="/">All Employees</Link>
            <Link className='linkClass' to="/current-salary">Current Salary</Link>
            <Link className='linkClass' to="/login">Login</Link>

          </nav>
        </header>

        <Routes>
          <Route path="/" element={<AllEmp />} />
          <Route path="/current-salary" element={<CurrentSalary />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
