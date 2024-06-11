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
let content = ''; //포인트 적립 내용

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
    return false;
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

// 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
  console.log('사용자(소켓) 연결');

  // 사용자의 초기 포인트 설정
  userPoints[socket.id] = 0;

  socket.on('userLocation', (location) => {
    // 사용자가 보낸 위치가 범위 안에 있는지 확인 후 코드 수행
    for (const range of ranges) {
      const key = isInRange(location.latitude, location.longitude, range);
      if (key != false) {
        console.log(
          `사용자 입력 좌표 (${location.latitude}, ${location.longitude})는 범위에 포함됩니다.`
        );
        const { identifier, latitude, longitude } = location;
        // 위치 정보를 보낸 클라이언트를 제외한 모든 클라이언트에게 해당 위치 정보를 브로드캐스팅
        socket.broadcast.emit('broadcastLocation', {
          key,
          identifier,
          latitude,
          longitude,
          userId: socket.id,
        });
        // firebase 연동 포인트 지급
        db.collection('users')
          .where('email', '==', location.email)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              const userPoint = userData.point;

              const updatedPoint = userPoint + 0.5;
              userPoints[socket.id] += 0.5; // 사용자별 포인트 증가

              db.collection('users')
                .doc(doc.id)
                .update({
                  point: updatedPoint,
                })
                .then(() => {
                  console.log('User point:', userPoint);
                })
                .catch((error) => {
                  console.error('Error updating user point:', error);
                });
            });
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
        break;
      }
      // for문을 다 돌아서 마지막 범위까지 일치하지 않으면 사용자에게 전달
      else if (ranges.indexOf(range) === ranges.length - 1) {
        socket.emit('LocationError', { point: userPoints[socket.id] });
        if (location.identifier == 1) {
          content = '천안아산역 노선 탑승';
        } else if (location.identifier == 2) {
          content = '천안역 노선 탑승';
        } else {
          content = '천안터미널 노선 탑승';
        }
        if (userPoints[socket.id] != 0) {
          addPointLog(
            location.email,
            new Date(),
            content,
            userPoints[socket.id]
          );
        }
        userPoints[socket.id] = 0;
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
  });
});

// 서버를 지정한 포트로 실행
server.listen(port, () => {
  console.log(`서버가 ${port}번 포트에서 실행 중입니다.`);
});
