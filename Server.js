const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000; // 환경 변수에 포트가 지정되어 있지 않으면 기본값으로 3000 사용
const app = express();
const server = http.createServer(app); // Express 애플리케이션을 기반으로 HTTP 서버 생성
const io = socketIo(server); // HTTP 서버를 기반으로 소켓 서버 생성

// 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
  console.log('사용자(소켓) 연결');

  socket.on('userLocation', (location) => {
    console.log('User location:', location);
    const { identifier, latitude, longitude } = location;
    // 위치 정보를 보낸 클라이언트를 제외한 모든 클라이언트에게 해당 위치 정보를 브로드캐스팅
    socket.broadcast.emit('broadcastLocation', {
      identifier,
      latitude,
      longitude,
    });
  });

  // 사용자 연결 종료 시
  socket.on('disconnectUser', (userId) => {
    console.log(`사용자 ${userId} 연결 종료`);
    // 클라이언트에게 해당 사용자의 식별자를 전송하여 마커 제거 요청 -> apk 만들어서 테스트 해봐야 함
    io.emit('removeMarker', userId);
  });

  socket.on('disconnect', () => {
    console.log('사용자 연결 종료');
  });
});

// 서버를 지정한 포트로 실행
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
