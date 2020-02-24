import React from 'react';

import MoniLogo from '../assets/img/moni.png';

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="login-box">
          
          <img className="login-logo" src={MoniLogo} alt="Moni | Server Monitoring"/>

          <h2 className="login-title">Moni. | Login</h2>

          <div className="form-group">
            <span>Username</span>
            <input type="text"/>
          </div>

          <div className="form-group">
            <span>Password</span>
            <input type="password"/>
          </div>

          <div className="btn-login-wrapper">
            <button className="btn-login">Login</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;