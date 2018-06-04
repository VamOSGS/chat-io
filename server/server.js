const express = require('express');
const https = require('https');
const path = require('path');
const cors = require('cors')
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
app.use(express.static(__dirname + '/../dist'));
let users = [];

nosleep();
setInterval(() => {
  nosleep();
}, 90000);
app.use(cors())
app.get('/', (req, res) => {
  res.sendFile(path.resolve('../dist/index.html'));
});

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on', http.address().port);
});

io.on('connection', socket => {
  socket.on('new-user', username => {
    users = [
      ...users,
      {
        name: username,
        i: users.length,
        id: socket.id
      }
    ];
    io.emit('receive-user', users);
  });

  socket.on('new-message', data => {
    function getUser(base) {
      return base.id === socket.id;
    }
    let messages = {
      message: data,
      users: users.find(getUser)
    };
    io.emit('receive-message', messages);
  });

  socket.on('disconnect', () => {
    users.map((oldUser, i) => {
      if (oldUser.id == socket.id) {
        users.splice(oldUser.i, 1);
      }
    });
    io.emit('receive-user', users);
  });
});

function nosleep() {
  https.get(`https://nosleep-server.herokuapp.com/`);
}
