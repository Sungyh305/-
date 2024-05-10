import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import socketIOClient from 'socket.io-client';
import { Picker } from '@react-native-picker/picker';

const SERVER_URL = 'https://profound-leech-engaging.ngrok-free.app';

const GoogleMap = () => {
  const [userMarkers, setUserMarkers] = useState({}); // 사용자 위치 마커 정보
  const [selectedIdentifier, setSelectedIdentifier] = useState('1'); // 선택된 식별자 상태 추가

  useEffect(() => {
    let socket;

    // 소켓 연결
    const connectSocket = () => {
      socket = socketIOClient(SERVER_URL);
      // 새로운 위치 데이터를 받아와서 마커 갱신
      socket.on('broadcastLocation', (location) => {
        setUserMarkers((prevMarkers) => ({
          ...prevMarkers,
          [location.identifier]: location,
        }));
      });

      // 사용자 연결이 종료되었을 때 해당 사용자의 마커 제거
      socket.on('userDisconnected', (identifier) => {
        setUserMarkers((prevMarkers) => {
          const updatedMarkers = { ...prevMarkers };
          delete updatedMarkers[identifier];
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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.80026,
          longitude: 127.071411,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
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
                description="여기 있어요!"
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
