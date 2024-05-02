import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import io from 'socket.io-client';
import { firebase } from '../config';

const TmapScreen = () => {
  // 위치, 소켓 상태를 관리하는 상태 변수를 선언
  const [location, setLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [name, setName] = useState('');

  // 처음 렌더링될 때 소켓을 연결하고 위치 권한을 요청
  useEffect(() => {
    const socketInstance = io('https://advanced-sawfish-faithful.ngrok-free.app/');
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect(); // 소켓 연결 종료
      }
    };
  }, []); // 한 번만 실행되도록 빈 배열 전달

  //firebase에서 유저 정보 가져오기
  useEffect(() => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then((snapshot) => {
      if (snapshot.exists) {
        setName(snapshot.data());
      } else {
        console.log('User does not exist');
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  useEffect(() => {
    // 위치 권한 요청과 위치 업데이트를 수행하는 함수
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치 권한을 허용해주세요.');
        return;
      }

      try {
        // 현재 위치 가져오기
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // 소켓이 연결되어 있고 연결이 끊어지지 않은 경우에만 위치 데이터를 서버로 전송
        if (socket && !socket.disconnected) {
          const { latitude, longitude } = location.coords;
          socket.emit('sendLocation', { email: name.email, latitude, longitude });
          console.log('위치 데이터를 전송했습니다:', { email: name.email, latitude, longitude });
        }
      } catch (error) {
        console.error('위치 정보를 가져올 수 없습니다:', error.message);
      }
    };

    // 7초마다 위치 업데이트
    const interval = setInterval(fetchLocation, 7000);

    // cleanup 함수: 컴포넌트가 언마운트될 때 interval을 제거하여 메모리 누수 방지
    return () => clearInterval(interval);
  }, [socket]); // 소켓이 변경될 때마다 이펙트 실행

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <Text>
          현재 위치: 위도 {location.coords.latitude}, 경도{' '}
          {location.coords.longitude}
        </Text>
      ) : (
        <Text>위치 정보를 가져오는 중...</Text>
      )}
    </View>
  );
};

export default TmapScreen;
