const http = require('http');
const path = require('path');
const fs = require('fs');

let htmlPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(htmlPath).toString();

const server = http.createServer((req, res) => {
  res.write(html);
  res.end();
});
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  //   console.log(socket.id);
  //   console.log('a user connected!');

  socket.on('chat message', (msg) => {
    // console.log(typeof msg);
    fs.writeFile(path.join(__dirname, 'data', 'image.png'), msg, (err) => {
      //   console.log(err);
    });
    // console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    // console.log('a user disconected');
  });
});
server.listen(3000);
