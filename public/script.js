let socket = io("https://mmg-server.onrender.com"); // رابط السيرفر الجديد

let streak = 0;

function register() {
  const username = document.getElementById('usernameInput').value;
  fetch('/register', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username})
  }).then(res => res.json())
    .then(data => {
      document.getElementById('loginMsg').textContent = data.error || 'تم التسجيل!';
    });
}

function login() {
  const username = document.getElementById('usernameInput').value;
  fetch('/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username})
  }).then(res => res.json())
    .then(data => {
      if(data.error){
        document.getElementById('loginMsg').textContent = data.error;
      } else {
        streak = data.streak;
        document.getElementById('streakCount').textContent = streak;
        document.getElementById('loginDiv').style.display = 'none';
        document.getElementById('chatDiv').style.display = 'block';
      }
    });
}

socket.on('chat message', function(msg){
  const li = document.createElement('li');
  li.textContent = msg;
  document.getElementById('messages').appendChild(li);
});

function sendMessage() {
  const input = document.getElementById('messageInput');
  socket.emit('chat message', input.value);
  input.value = '';
}
