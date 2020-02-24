const express = require('express');
const app = express();
const WebSocket = require('ws');
const spawn = require('child_process').spawn;
const fs = require('fs');
const PORT = process.env.PORT || 8081;

let server;
let wss;


if (process.env.NODE_ENVIRONMENT === 'production') {
  const https = require('https');
  server = https.createServer({
    cert: fs.readFileSync('/etc/nginx/certs/moni.rixcian.dev/cert.pem'),
    key: fs.readFileSync('/etc/nginx/certs/moni.rixcian.dev/key.pem')
  });
  
  wss = new WebSocket.Server({ server });
} else {
  wss = new WebSocket.Server({ port: 8080 });
}


wss.on('connection', ws => {

  const monScript = spawn('python3', ['./mon.py', '5']);

  monScript.stdout.on('data', data => {
    const outputData = JSON.parse(data.toString());
    ws.send(JSON.stringify(outputData));
  });

  ws.on('close', () => {
    monScript.kill();
  });

});


if (process.env.NODE_ENVIRONMENT === 'production') {
  server.listen(8080);
}


app.use(express.static(`${__dirname}/../client/build/`));


app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/../client/index.html`);
});


app.listen(PORT, () => {
  console.clear();
  console.log(`🚀 Server is running on port ${PORT}!`);
});