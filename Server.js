const ranges = require('./src/dataset.js');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const port = process.env.PORT || 3000; // 환경 변수에 포트가 지정되어 있지 않으면 기본값으로 3000 사용
const app = express();
const server = http.createServer(app); // Express 애플리케이션을 기반으로 HTTP 서버 생성
const io = socketIo(server); // HTTP 서버를 기반으로 소켓 서버 생성

const admin = require('firebase-admin');
// 서비스 계정 키를 다운로드하고 이를 서버에서 사용할 수 있도록 환경 변수로 설정
const serviceAccount = require('./login-943f1-firebase-adminsdk-fou33-3f4f87aa6b.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const userPoints = {}; // 사용자별 포인트를 추적하기 위한 객체

// 받아온 좌표가 범위 안에 있는지 확인하는 함수
function isInRange(latitude, longitude, range) {
  const point1 = range.points[0];
  const point2 = range.points[1];
  if (
    latitude < point1.latitude ||
    latitude > point2.latitude ||
    longitude < point1.longitude ||
    longitude > point2.longitude
  ) {
    return 'null';
  }
  return range.id;
}

const addPointLog = async (email, date, content, points) => {
  try {
    const pointLog = {
      date,
      content,
      points,
    };
    await db
      .collection('users')
      .where('email', '==', email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.collection('pointLogs').add(pointLog);
        });
      });
    console.log('포인트 지급 내역 추가 성공');
  } catch (error) {
    console.error('Error adding point log:', error);
  }
};

// 사용자 연결 추적을 위한 객체
const userConnections = {};
// 최대 연결 시간 (밀리초 단위, 예시로 2시간으로 설정)
// 1분 = 60초 * 1000밀리초 = 6000밀리초, 1시간 = 60분 * 6000밀리초
const MAX_CONNECTION_TIME = 120 * 60 * 1000; //분,초,밀리초

// 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
  console.log('사용자(소켓) 연결');

  // 사용자의 초기 포인트 설정
  userPoints[socket.id] = 0;

  // 사용자 연결 시간 추적 시작
  userConnections[socket.id] = Date.now();
  let key_on = 0;

  // 최대 연결 시간이 지나면 연결 종료
  const disconnectTimeout = setTimeout(() => {
    console.log('Timeout');
    socket.emit('connectionTimeout'); // 클라이언트에게 타임아웃 이벤트 전송
  }, MAX_CONNECTION_TIME);

  // 사용자가 스위치를 킬 때 버스 탑승 위치에 있는지 확인
  socket.on('userLocation', (location) => {
    // 데이터셋을 반대로 돌려 on_bus를 먼저 찾을 수 있게 함
    for (let i = ranges.length - 1; i >= 0; i--) {
      const range = ranges[i];
      const key = isInRange(location.latitude, location.longitude, range);
      if (key.startsWith('on_bus')) {
        var bus_stop = key[7];
        if(bus_stop == 'a') {bus_stop = 1}
        else if(bus_stop == 'b') {bus_stop = 2}
        else if(bus_stop == 'c') {bus_stop = 3}
        else if(bus_stop == 'S') {bus_stop = 5}
        const { identifier, latitude, longitude } = location;
        if(identifier == 4) {
          if(bus_stop == 1 || 2) {
            socket.broadcast.emit('broadcastLocation', {
              key,
              identifier,
              latitude,
              longitude,
              userId: socket.id,
            });
            key_on = 1;
            userPoints[socket.id] += 0.3
            break;
          } else if (bus_stop == 5) {
            socket.broadcast.emit('broadcastLocation', {
              key,
              identifier,
              latitude,
              longitude,
              userId: socket.id,
            });
            key_on = 1;
            userPoints[socket.id] += 0.3
            break;
          } else {
            socket.emit('on_bus_location')
            break;
          }
        } else {
          if(identifier == bus_stop) {
            socket.broadcast.emit('broadcastLocation', {
              key,
              identifier,
              latitude,
              longitude,
              userId: socket.id,
            });
            key_on = 1;
            userPoints[socket.id] += 0.3
            break;
          } else if (bus_stop == 5) {
            socket.broadcast.emit('broadcastLocation', {
              key,
              identifier,
              latitude,
              longitude,
              userId: socket.id,
            });
            key_on = 1;
            userPoints[socket.id] += 0.3
            break;
          } else {
            socket.emit('on_bus_location')
            break;
          }
        }
      } else if (key.startsWith('range') && key_on == 1) {
        console.log('탑승 range');
        socket.emit('LocationChange');
        const { identifier, latitude, longitude } = location;
        socket.broadcast.emit('broadcastLocation', {
          key,
          identifier,
          latitude,
          longitude,
          userId: socket.id,
        });
        key_on = 0;
        userPoints[socket.id] += 0.3
        break;
      } else if (i === 0) {
        socket.emit('LocationError');
      }
    }
  });

  socket.on('userLocation2', (location) => {
    // 사용자가 보낸 위치가 범위 안에 있는지 확인 후 코드 수행
    for (const range of ranges) {
      const key = isInRange(location.latitude, location.longitude, range);
      if (key != false) {
        console.log(`버스 탑승 중 입니다.`);
        const { identifier, latitude, longitude } = location;
        // 위치 정보를 보낸 클라이언트를 제외한 모든 클라이언트에게 해당 위치 정보를 브로드캐스팅
        socket.broadcast.emit('broadcastLocation', {
          key,
          identifier,
          latitude,
          longitude,
          userId: socket.id,
        });
        userPoints[socket.id] += 0.5
        break;
      }
      // for문을 다 돌아서 마지막 범위까지 일치하지 않으면 사용자에게 전달
      else if(ranges.indexOf(range) === ranges.length - 1) {
        socket.emit('LocationError');
      }
    }
  });

  socket.on('off_bus', (location) => {
    if(userPoints[socket.id] !== 0) {
      for (const range of ranges) {
        const key = isInRange(location.latitude, location.longitude, range);
        if (key.startsWith('off_bus')) {
          var bus_stop = key[8];
          if(bus_stop == 'a') {bus_stop = 1}
          else if(bus_stop == 'b') {bus_stop = 2}
          else if(bus_stop == 'c') {bus_stop = 3}
          else if(bus_stop == 'S') {bus_stop = 5}
          // 사용자가 선택한 노선과 내린 정류장이 맞는지 확인
          if(location.identifier == 4) {
            if(bus_stop == 1 || 2) {
              if(location.hasExceededSpeed) {
                destination = "공동운행(천안역, 천안아산역) 노선 탑승"
                addPointLog(location.email, new Date, destination, userPoints[socket.id]);
                socket.emit('off_bus_result', {result: true, point: userPoints[socket.id]});
                userPoints[socket.id] = 0;
                break;
              } else {
                socket.emit('off_bus_result2');
                break;
              }
            } else if (bus_stop == 5) {
              if(location.hasExceededSpeed) {
                destination = "공동운행(천안역, 천안아산역) 노선 탑승"
                addPointLog(location.email, new Date, destination, userPoints[socket.id]);
                socket.emit('off_bus_result', {result: true, point: userPoints[socket.id]});
                userPoints[socket.id] = 0;
                break;
              } else {
                socket.emit('off_bus_result2');
                break;
              }
            } else {
              socket.emit('off_bus_result3');
              break;
            }
          } else {
            if(bus_stop == location.identifier) {
              if(location.hasExceededSpeed) {
                if(location.identifier == 1) {destination = "천안아산역 노선 탑승"}
                else if(location.identifier == 2) {destination = "천안역 노선 탑승"}
                else {destination = "천안터미널 노선 탑승"}
                addPointLog(location.email, new Date, destination, userPoints[socket.id]);
                socket.emit('off_bus_result', {result: true, point: userPoints[socket.id]});
                userPoints[socket.id] = 0;
                break;
              } else {
                socket.emit('off_bus_result2');
                break;
              }
            } else if (bus_stop == 5) {
              if(location.hasExceededSpeed) {
                if(location.identifier == 1) {destination = "천안아산역 노선 탑승"}
                else if(location.identifier == 2) {destination = "천안역 노선 탑승"}
                else {destination = "천안터미널 노선 탑승"}
                addPointLog(location.email, new Date, destination, userPoints[socket.id]);
                socket.emit('off_bus_result', {result: true, point: userPoints[socket.id]});
                userPoints[socket.id] = 0;
                break;
              } else {
                socket.emit('off_bus_result2');
                break;
              }
            } else {
              socket.emit('off_bus_result3');
              break;
            }
          }
        } else if (ranges.indexOf(range) === ranges.length - 1) {
          socket.emit('off_bus_result', {result: false, point: userPoints[socket.id]})
        }
      }
    }
  });

  // 사용자 연결 종료 시
  socket.on('disconnectUser', (userId) => {
    console.log(`사용자 ${userId} 연결 종료`);
    // 클라이언트에게 해당 사용자의 식별자를 전송하여 마커 제거 요청
    io.emit('removeMarker', userId);

    // 연결 종료 시 해당 사용자의 포인트 초기화
    delete userPoints[socket.id];
    clearTimeout(disconnectTimeout);
    delete userConnections[socket.id];
  });
});

// 서버를 지정한 포트로 실행
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});