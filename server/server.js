const  express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const path = require('path');
app.use(express.static( __dirname + '/../dist'));


app.get('/', function (req, res) {
      res.sendFile(path.resolve('../dist/index.html'))
});

http.listen(3000, function () {
    console.log('listening on 3000')
});
io.on('connection', function (socket) {
    console.log('connected');
    socket.on('new-message', function (data) {
        console.log(data);
        io.emit('receive-message', data);
    })
});

















