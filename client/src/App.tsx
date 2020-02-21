import React from 'react';

import './App.scss';
import MoniLogo from './assets/img/moni.png';

const App: React.FC = () => {

  const socket = new WebSocket(`ws://${window.location.hostname}:8080`);

  socket.onmessage = (e: MessageEvent) => {
    console.log(JSON.parse(e.data));
  };

  const sendMsg = (): void => {
    socket.send('Hello back!');
  }
  
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

export default App;
