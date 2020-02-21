const express = require('express');
const app = express();
const WebSocket = require('ws');
const PORT = process.env.PORT || 8081;

const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', ws => {

  ws.send('Hello World');

  ws.on('message', msg => {
    console.log(`Message: ${msg}`);
    ws.send('Im sending this respond...');
  });

});


app.use(express.static(`${__dirname}/../client/build/`));


app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../client/index.html`);
});


app.listen(PORT, () => {
  console.clear();
  console.log(`🚀 Server is running on port ${PORT}!`);
});
