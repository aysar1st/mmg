const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');
if(!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));

app.post('/register', (req, res) => {
  const { username } = req.body;
  let users = JSON.parse(fs.readFileSync(USERS_FILE));
  if(users.find(u => u.username === username)){
    return res.status(400).json({error: 'Username already exists'});
  }
  users.push({username, streak: 0, lastLogin: null});
  fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  res.json({success: true});
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  let users = JSON.parse(fs.readFileSync(USERS_FILE));
  let user = users.find(u => u.username === username);
  if(!user) return res.status(400).json({error: 'User not found'});

  const today = new Date().toISOString().split('T')[0];
  if(user.lastLogin !== today){
    if(user.lastLogin === new Date(Date.now() - 86400000).toISOString().split('T')[0]){
      user.streak += 1;
    } else {
      user.streak = 1;
    }
    user.lastLogin = today;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users));
  }
  res.json({success: true, streak: user.streak});
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
