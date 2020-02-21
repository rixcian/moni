import React from 'react';

import moniLogo from './assets/img/moni.png';

const App: React.FC = () => {

  const socket = new WebSocket(`ws://${window.location.hostname}:8080`);

  socket.onmessage = (e: MessageEvent) => {
    console.log(e.data);
  };

  const sendMsg = (): void => {
    socket.send('Hello back!');
  }
  
  return (
    <div>
      <img src={moniLogo} alt="Moni | Server Monitor"/>
      <button onClick={sendMsg}>Send msg</button>
    </div>
  );

}

export default App;
