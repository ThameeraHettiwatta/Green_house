var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
// var port = process.env.PORT || 5000


app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')

app.use('/users', Users)

// app.listen(port, function() {
//   console.log('Server is running on port: ' + port)
// })

//chat
const socketio = require('socket.io');
const http = require('http'); 
const server = http.createServer(app);
const io = socketio(server);

const router = require('./router');
app.use(router);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to green house chat.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});





server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));