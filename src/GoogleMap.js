import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import socketIOClient from 'socket.io-client';

const SERVER_URL = 'https://profound-leech-engaging.ngrok-free.app'; //ngrok 개인 pc 주소
const customMarkerImage = require('../assets/bus.png');

const GoogleMap = ({ navigation }) => {
  // 현재 위치와 브로드캐스트된 위치를 상태로 관리
  const [location, setLocation] = useState(null);
  const [broadcastedLocation, setBroadcastedLocation] = useState(null);

  // 컴포넌트가 마운트될 때 위치 및 소켓 설정
  useEffect(() => {
    let socket;

    // 위치 업데이트 함수
    const fetchLocation = async () => {
      // 위치 권한 요청
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        ToastAndroid.show('위치 사용 설정을 켜주세요', ToastAndroid.LONG);
        return;
      }

      // 현재 위치 가져오기
      const updateLocation = async () => {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
          });
          setLocation(currentLocation);

          // 소켓 통신으로 위치 전송
          socket.emit('userLocation', {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });
        } catch (error) {
          console.error('Error getting location:', error);
        }
      };

      // 초기 위치 업데이트
      await updateLocation();

      // 5초마다 위치 업데이트
      const intervalId = setInterval(updateLocation, 5000);

      // 컴포넌트가 언마운트될 때 인터벌 해제
      return () => clearInterval(intervalId);
    };

    // 소켓 연결
    socket = socketIOClient(SERVER_URL);
    socket.on('broadcastLocation', (location) => {
      setBroadcastedLocation(location);
    });

    // 위치 업데이트 시작
    fetchLocation();

    // 컴포넌트가 언마운트될 때 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  // 위치 권한이 거부된 경우 GoogleMap 컴포넌트를 렌더링하지 않음
  if (!location) {
    return null;
  }

  // 지도 및 마커 표시
  return (
    <View style={styles.screen}>
      {(location || broadcastedLocation) && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location
              ? location.coords.latitude
              : broadcastedLocation?.latitude,
            longitude: location
              ? location.coords.longitude
              : broadcastedLocation?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="내 위치"
              description="여기 있어요!"
              image={customMarkerImage}
            />
          )}
          {broadcastedLocation && (
            <Marker
              coordinate={{
                latitude: broadcastedLocation.latitude,
                longitude: broadcastedLocation.longitude,
              }}
              title="다른 사용자 위치"
              description="여기 있어요!"
              image={customMarkerImage}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
