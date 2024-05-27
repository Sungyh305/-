import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import socketIOClient from 'socket.io-client';
import { Picker } from '@react-native-picker/picker';

const SERVER_URL = 'https://profound-leech-engaging.ngrok-free.app';
let newMarkerImage;

const GoogleMap = () => {
  const [userMarkers, setUserMarkers] = useState({}); // 사용자 위치 마커 정보
  const [selectedIdentifier, setSelectedIdentifier] = useState('1'); // 선택된 식별자 상태 추가
  const [region, setRegion] = useState({}); // 지도 초기 위치 설정

  // Polyline의 마커 좌표
  const PolylineCoordinates = [
    { latitude: 36.800437, longitude: 127.071803 },
    { latitude: 36.798035, longitude: 127.071851 },
    { latitude: 36.798035, longitude: 127.077994 },
    { latitude: 36.797625, longitude: 127.079018 },
    { latitude: 36.79778, longitude: 127.080352 },
    { latitude: 36.797561, longitude: 127.081822 },
    { latitude: 36.797511, longitude: 127.08586 },
    { latitude: 36.797735, longitude: 127.086208 },
    { latitude: 36.7997, longitude: 127.085987 },
    { latitude: 36.800278, longitude: 127.085666 },
    { latitude: 36.800411, longitude: 127.08679 },
    { latitude: 36.797952, longitude: 127.087223 },
    { latitude: 36.795607, longitude: 127.087547 },
    { latitude: 36.799321, longitude: 127.094901 },
    { latitude: 36.800032, longitude: 127.097574 },
    { latitude: 36.8004, longitude: 127.099787 },
    { latitude: 36.794595, longitude: 127.10123 },
    { latitude: 36.791927, longitude: 127.102007 },
    { latitude: 36.792334, longitude: 127.102104 },
    { latitude: 36.792531, longitude: 127.10249 },
    { latitude: 36.792703, longitude: 127.103576 },
    { latitude: 36.792864, longitude: 127.103857 },
    { latitude: 36.793106, longitude: 127.103931 },
    { latitude: 36.793601, longitude: 127.103839 },
    { latitude: 36.795012, longitude: 127.103431 },
    { latitude: 36.79517, longitude: 127.103353 },
    { latitude: 36.795504, longitude: 127.102992 },
    { latitude: 36.795546, longitude: 127.102712 },
    { latitude: 36.7953, longitude: 127.101055 },
    // 좌표 추가
  ];

  const PolylineCoordinates02 = [
    { latitude: 36.799455, longitude: 127.073997 },
    { latitude: 36.79951, longitude: 127.07794 },
    { latitude: 36.798035, longitude: 127.077994 },
    { latitude: 36.797625, longitude: 127.079018 },
    { latitude: 36.79778, longitude: 127.080352 },
    { latitude: 36.797561, longitude: 127.081822 },
    { latitude: 36.797511, longitude: 127.08586 },
    { latitude: 36.79721, longitude: 127.086117 },
    { latitude: 36.796507, longitude: 127.085858 },
    { latitude: 36.795391, longitude: 127.085773 },
    { latitude: 36.794987, longitude: 127.085567 },
    { latitude: 36.794721, longitude: 127.085651 },
    { latitude: 36.795607, longitude: 127.087547 },
  ];

  useEffect(() => {
    let socket;

    // 소켓 연결
    const connectSocket = () => {
      socket = socketIOClient(SERVER_URL);
      // 새로운 위치 데이터를 받아와서 마커 갱신
      socket.on('broadcastLocation', (location) => {
        // 범위 id 구별하여 이미지 분리
        if (location.key.startsWith('test')) {
          newMarkerImage = require('../assets/Person_expo.png');
        } else {
          newMarkerImage = require('../assets/bus_expo.png');
        }

        setUserMarkers((prevMarkers) => ({
          ...prevMarkers,
          [location.userId]: location,
        }));
      });

      // 사용자 연결이 종료되었을 때 해당 사용자의 마커 제거
      socket.on('removeMarker', (userId) => {
        setUserMarkers((prevMarkers) => {
          const updatedMarkers = { ...prevMarkers };
          delete updatedMarkers[userId];
          return updatedMarkers;
        });
      });
    };

    connectSocket();

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // 선택된 식별자에 따라 지도 위치 변경
  useEffect(() => {
    const updateRegion = () => {
      switch (selectedIdentifier) {
        case '1':
          setRegion({
            latitude: 36.795751,
            longitude: 127.087612,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          });
          break;
        case '2':
          setRegion({
            latitude: 36.81,
            longitude: 127.1411,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          break;
        case '3':
          setRegion({
            latitude: 36.82,
            longitude: 127.1511,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          break;
        default:
          setRegion({
            latitude: 36.80026,
            longitude: 127.071411,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
      }
    };

    updateRegion();
  }, [selectedIdentifier]);

  return (
    <View style={styles.screen}>
      {/* 드롭다운 메뉴 */}
      <Picker
        selectedValue={selectedIdentifier}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue) => setSelectedIdentifier(itemValue)}
      >
        <Picker.Item label="천안아산역" value="1" />
        <Picker.Item label="천안역" value="2" />
        <Picker.Item label="천안터미널" value="3" />
      </Picker>

      {/* 지도 표시 */}
      <MapView style={styles.map} region={region}>
        {/* polyline 추가 */}
        <Polyline
          coordinates={PolylineCoordinates}
          strokeWidth={4}
          strokeColor="rgba(255, 165, 0, 1)"
        />
        <Polyline
          coordinates={PolylineCoordinates02}
          strokeWidth={4}
          strokeColor="rgba(255, 165, 0, 1)"
        />

        {/* 사용자 마커 표시 */}
        {Object.keys(userMarkers).map(
          (userId) =>
            // 선택된 식별자에 따라 해당 위치의 마커만 보이도록 필터링
            userMarkers[userId].identifier === selectedIdentifier && (
              <Marker
                key={userId}
                coordinate={{
                  latitude: userMarkers[userId].latitude,
                  longitude: userMarkers[userId].longitude,
                }}
                title={`사용자 ${userId} 위치`}
                image={newMarkerImage}
              />
            )
        )}
      </MapView>
    </View>
  );
};

export default GoogleMap;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
