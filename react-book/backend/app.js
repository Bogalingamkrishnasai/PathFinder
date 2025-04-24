const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const webSocketServer = require('./webSocketServer');

const app = express();
const { port } = config;

app.use(cors({
  origin: 'https://pathfinder-2-ugde.onrender.com',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`Accessing ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'Hi!' });
});

app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {

  webSocketServer.handleUpgrade(request, socket, head, (ws) => {
    webSocketServer.emit('connection', ws, request);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening on http://localhost:${port}`);
});
