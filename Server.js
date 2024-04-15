const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Express 애플리케이션을 생성
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 루트 경로에 대한 GET 요청을 처리하여 서버가 실행 중임을 표시
app.get('/', (req, res) => {
  res.send('서버가 실행 중입니다.');
});

// 연결된 클라이언트를 저장할 객체를 선언
const connectedClients = {};

// Socket.IO 연결을 처리하는 이벤트 핸들러를 정의
io.on('connection', (socket) => {
  console.log('클라이언트가 연결되었습니다.');

  // 클라이언트 고유한 식별자를 생성하고 연결된 클라이언트 객체를 저장
  const clientId = socket.id;
  connectedClients[clientId] = socket;

  // 클라이언트로부터 위치 데이터를 수신하는 이벤트 핸들러를 정의
  socket.on('sendLocation', (locationData) => {
    console.log('클라이언트로부터 위치 데이터를 수신했습니다:', locationData);

    // 위치 데이터를 처리한 후 해당 클라이언트에게 위치 정보를 다시 전송
    io.to(socket.id).emit('locationUpdate', locationData);
    console.log('locationUpdate 이벤트가 발생했습니다:', locationData);
  });

  // 클라이언트 연결이 해제될 때 실행되는 이벤트 핸들러를 정의
  socket.on('disconnect', () => {
    console.log('클라이언트가 연결 해제되었습니다.');
    // 연결 해제된 클라이언트를 connectedClients 객체에서 제거
    delete connectedClients[clientId];
  });
});

// 서버를 시작하고 지정된 포트에서 대기
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행중입니다.`);
});