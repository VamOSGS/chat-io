const  express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const path = require('path');
app.use(express.static( __dirname + '/../dist'));
let users = [];
app.get('/', function (req, res) {
      res.sendFile(path.resolve('../dist/index.html'))
});

http.listen(process.env.PORT || 3000, function(){
    console.log('listening on', http.address().port);
});

io.on('connection', function (socket) {
    // console.log('connected');
    io.emit('get-users', users);
    socket.on('new-user', function (username) {
        users = [...users, {
            name: username,
            id: '1'
        }];
        io.emit('receive-user', users);
        console.log(users)
    });
    socket.on('new-message', function (data) {
        io.emit('receive-message', data);
    });

    socket.on('disconnect', function(){
        console.log(io);
    });
});