import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import io from 'socket.io-client';

const Home = () => {
  // 위치, 오류 메시지, 수신된 위치 데이터, 소켓 상태를 관리하는 상태 변수를 선언
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [receivedLocation, setReceivedLocation] = useState(null);
  const [socket, setSocket] = useState(null);

  // 처음 렌더링될 때 소켓을 연결하고 위치 권한을 요청
  useEffect(() => {
    const socketInstance = io('http://[IPv4주소]:3000'); //cmd창에서 ipconfig로 IPv4 주소로 변경
    setSocket(socketInstance);
  
    return () => {
      if (socketInstance) {
        socketInstance.disconnect(); // 소켓 연결 종료
      }
    };
  }, []); // 한 번만 실행되도록 빈 배열 전달

  useEffect(() => {
    // 위치 권한 요청
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치 권한을 허용해주세요.');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setErrorMsg(null);
      } catch (error) {
        setErrorMsg('위치 데이터를 가져올 수 없습니다.');
      }
    })();
  }, []);

  // 위치 데이터를 서버로 전송하는 함수
  const sendLocationData = async () => {
    if (!location) {
      setErrorMsg('위치 데이터를 가져올 수 없습니다.');
      return;
    }
  
    if (!socket || socket.disconnected) {
      setErrorMsg('서버와 연결되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
  
    // 위도와 경도 데이터만 추출
    const { latitude, longitude } = location.coords;
  
    // 위치 데이터 전송
    socket.emit('sendLocation', { latitude, longitude });
    console.log('위치 데이터를 전송했습니다:', { latitude, longitude });
  };

  // 5초마다 위치 데이터를 전송하는 이벤트
  useEffect(() => {
    const sendLocationInterval = setInterval(() => {
      sendLocationData();
    }, 5000);
  
    return () => clearInterval(sendLocationInterval); // 반복 작업 종료
  }, [socket, location]); // socket과 location이 변경될 때마다 이펙트 실행

  // 서버로부터 위치 데이터를 수신하면 해당 데이터를 업데이트
  useEffect(() => {
    if (!socket) return; // 소켓이 없으면 종료

    // 위치 데이터 수신
    socket.on('locationUpdate', (locationData) => {
      console.log('서버로부터 위치 데이터를 받았습니다:', locationData);
      setReceivedLocation(locationData);
    });

    return () => {
      socket.off('locationUpdate'); // 응답 이벤트인 "locationUpdate" 등록 해제
    };
  }, [socket]); // 소켓이 변경될 때마다 이펙트 실행

  
  return (
    <View>
      <Text>React Native Socket.IO Test</Text>
      <Button title="위치 데이터 전송" onPress={sendLocationData} />
      {errorMsg && <Text>{errorMsg}</Text>}
      {receivedLocation && (
        <Text>
          받은 위치 데이터: 위도 {receivedLocation.latitude}, 경도{' '}
          {receivedLocation.longitude}
        </Text>
      )}
    </View>
  );
};

export default Home;