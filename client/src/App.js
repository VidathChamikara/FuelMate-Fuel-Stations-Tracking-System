import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


import FuelStationSignUp from './components/FuelStationSignUp'
import FuelDetailForm from './components/FuelDetailForm'
function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
                Fuel Mate
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Fuel Station Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign'}>
                   Fuel
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    User Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
            
              <Route path="/sign-up" element={<FuelStationSignUp />} />
              <Route path="/sign" element={<FuelDetailForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
