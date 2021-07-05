const { Server } = require("socket.io");
const io = new Server(require('../bin/server'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = io
