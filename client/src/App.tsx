import React from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Sidebar from './components/_layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CPU from './pages/CPU';
import Login from './pages/Login';
import Memory from './pages/Memory';
import Docker from './pages/Docker';

import './App.scss';
import Drives from './pages/Drives';
import Network from './pages/Network';

const App: React.FC = () => {
  
  return (
    <div className="app">
        <Router>
          <Sidebar />
          <div className="main">

            <div className="tob-bar">
              <div className="searchbar">
                <input type="text" placeholder="Search" />
                <div className="btn-search">
                  <FontAwesomeIcon icon="search" />
                </div>
              </div>
              <button className="btn-logout">
                <FontAwesomeIcon icon="sign-out-alt" />
              </button>
            </div>

            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cpu" component={CPU} />
              <Route exact path="/memory" component={Memory} />
              <Route exact path="/drives" component={Drives} />
              <Route exact path="/network" component={Network} />
              <Route exact path="/docker" component={Docker} />
            </Switch>
          </div>
        </Router>
    </div>
  );

}

export default App;
