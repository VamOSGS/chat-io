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
    console.log("Connected Socket  " + socket.id)
    socket.on('new-user', function (username) {
        users = [...users, {
            name: username,
            i: users.length,
            id:  socket.id
        }];
        io.emit('receive-user', users);
    });

    socket.on('new-message', function (data) {
        function getUser(base) {
            return base.id === socket.id;
        }
        let messages = {
            message: data,
            users: users.find(getUser)
        };
        io.emit('receive-message', messages);
    });

    socket.on('disconnect', function() {
        users.map( (oldUser, i) => { console.log(oldUser.id, socket.id);
            if (oldUser.id == socket.id) {
            users.splice(oldUser.i, 1)
        }} );
        console.log(users)
        // console.log("Disconnected Socket  " + socket.id)
        io.emit('receive-user', users);
    });
});