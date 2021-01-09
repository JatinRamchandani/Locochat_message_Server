var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


var connected_users={} 
var user_ids={}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

i=1;

io.on('connection', (socket) => {
    console.log('a user connected');
    connected_users[i]=socket;
    user_ids[i]=socket.id;

    const current_user=i;

    console.log(user_ids);
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    socket.on('chat message', (msg) => {
        connected_users[current_user].emit('chat message', msg);
        connected_users[2].emit('chat message', msg); 
      });  

    i++;
  });

http.listen(3000, () => {
  console.log('listening on *:3000');
});