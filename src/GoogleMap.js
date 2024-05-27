import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps'; // Polyline 추가
import socketIOClient from 'socket.io-client';
import { Picker } from '@react-native-picker/picker';

const SERVER_URL = 'https://advanced-sawfish-faithful.ngrok-free.app/';
let newMarkerImage;

const GoogleMap = () => {
  const [userMarkers, setUserMarkers] = useState({}); // 사용자 위치 마커 정보
  const [selectedIdentifier, setSelectedIdentifier] = useState('1'); // 선택된 식별자 상태 추가

  // (천안아산)Polyline의 마커 좌표
  const PolylineCoordinates = [
    { latitude: 36.800437, longitude: 127.071803 },
    { latitude: 36.798035, longitude: 127.071851 },
    { latitude: 36.798035, longitude: 127.077994 },
    { latitude: 36.797625, longitude: 127.079018 },
    { latitude: 36.797780, longitude: 127.080352 },
    { latitude: 36.797561, longitude: 127.081822 },
    { latitude: 36.797511, longitude: 127.085860 },
    { latitude: 36.797735, longitude: 127.086208 },
    { latitude: 36.799700, longitude: 127.085987 },
    { latitude: 36.800278, longitude: 127.085666 },
    { latitude: 36.800411, longitude: 127.086790 },
    { latitude: 36.797952, longitude: 127.087223 },
    { latitude: 36.795607, longitude: 127.087547 },
    { latitude: 36.799321, longitude: 127.094901 },
    { latitude: 36.800032, longitude: 127.097574 },
    { latitude: 36.800400, longitude: 127.099787 },
    { latitude: 36.794595, longitude: 127.101230 },
    { latitude: 36.791927, longitude: 127.102007 },
    { latitude: 36.792334, longitude: 127.102104 },
    { latitude: 36.792531, longitude: 127.102490 },
    { latitude: 36.792703, longitude: 127.103576 },
    { latitude: 36.792864, longitude: 127.103857 },
    { latitude: 36.793106, longitude: 127.103931 },
    { latitude: 36.793601, longitude: 127.103839 },
    { latitude: 36.795012, longitude: 127.103431 },
    { latitude: 36.795170, longitude: 127.103353 },
    { latitude: 36.795504, longitude: 127.102992 },
    { latitude: 36.795546, longitude: 127.102712 },
    { latitude: 36.795300, longitude: 127.101055 }
  ];

  const PolylineCoordinates02 = [
    { latitude: 36.799455, longitude: 127.073997 },
    { latitude: 36.799510, longitude: 127.077940 },
    { latitude: 36.798035, longitude: 127.077994 },
    { latitude: 36.797625, longitude: 127.079018 },
    { latitude: 36.797780, longitude: 127.080352 },
    { latitude: 36.797561, longitude: 127.081822 },
    { latitude: 36.797511, longitude: 127.085860 },
    { latitude: 36.797210, longitude: 127.086117 },
    { latitude: 36.796507, longitude: 127.085858 },
    { latitude: 36.795391, longitude: 127.085773 },
    { latitude: 36.794987, longitude: 127.085567 },
    { latitude: 36.794721, longitude: 127.085651 },
    { latitude: 36.795607, longitude: 127.087547 }
  ]
  // 천안역
  const PolylineCoordinates03 = [
    { latitude: 36.800437, longitude: 127.071803 },
    { latitude: 36.798035, longitude: 127.071851 },
    { latitude: 36.798035, longitude: 127.077994 },
    { latitude: 36.797625, longitude: 127.079018 },
    { latitude: 36.797780, longitude: 127.080352 },
    { latitude: 36.797561, longitude: 127.081822 },
    { latitude: 36.797511, longitude: 127.085860 },
    { latitude: 36.797735, longitude: 127.086208 },
    { latitude: 36.799700, longitude: 127.085987 },
    { latitude: 36.800278, longitude: 127.085666 },
    { latitude: 36.800411, longitude: 127.086790 },
    { latitude: 36.797952, longitude: 127.087223 },
    { latitude: 36.795607, longitude: 127.087547 },
    { latitude: 36.799321, longitude: 127.094901 },
    { latitude: 36.800032, longitude: 127.097574 },
    { latitude: 36.800400, longitude: 127.099787 },
    { latitude: 36.801518, longitude: 127.105488 },
    { latitude: 36.801966, longitude: 127.108297 },
    { latitude: 36.802026, longitude: 127.109617 },
    { latitude: 36.801902, longitude: 127.112163 },
    { latitude: 36.799884, longitude: 127.126561 },
    { latitude: 36.799332, longitude: 127.128304 },
    { latitude: 36.797959, longitude: 127.130469 },
    { latitude: 36.799224, longitude: 127.131396 },
    { latitude: 36.800302, longitude: 127.134667 },
    { latitude: 36.801722, longitude: 127.137576 },
    { latitude: 36.802356, longitude: 127.139547 },
    { latitude: 36.802781, longitude: 127.142683 },
    { latitude: 36.802973, longitude: 127.143441 },
    { latitude: 36.803113, longitude: 127.143387 },
    { latitude: 36.804309, longitude: 127.143437 },
    { latitude: 36.805937, longitude: 127.143164 },
    { latitude: 36.806657, longitude: 127.143193 },
    { latitude: 36.808937, longitude: 127.143127 },
    { latitude: 36.809173, longitude: 127.143175 },
    { latitude: 36.809430, longitude: 127.143363 },
    { latitude: 36.809964, longitude: 127.143952 }
  ]

  // 천안터미널
  const PolylineCoordinates04 = [
    { latitude: 36.800437, longitude: 127.071803 },
    { latitude: 36.798035, longitude: 127.071851 },
    { latitude: 36.798035, longitude: 127.077994 },
    { latitude: 36.797625, longitude: 127.079018 },
    { latitude: 36.797780, longitude: 127.080352 },
    { latitude: 36.797561, longitude: 127.081822 },
    { latitude: 36.797511, longitude: 127.085860 },
    { latitude: 36.797735, longitude: 127.086208 },
    { latitude: 36.799700, longitude: 127.085987 },
    { latitude: 36.800278, longitude: 127.085666 },
    { latitude: 36.800411, longitude: 127.086790 },
    { latitude: 36.797952, longitude: 127.087223 },
    { latitude: 36.795607, longitude: 127.087547 },
    { latitude: 36.799321, longitude: 127.094901 },
    { latitude: 36.800032, longitude: 127.097574 },
    { latitude: 36.800400, longitude: 127.099787 },
    { latitude: 36.801564, longitude: 127.105546 },
    { latitude: 36.802837, longitude: 127.105733 },
    { latitude: 36.812978, longitude: 127.108905 }, //불당상업지구
    { latitude: 36.822879, longitude: 127.111939 },
    { latitude: 36.822745, longitude: 127.113600 }, //종합운동장
    { latitude: 36.822764, longitude: 127.116610 },
    { latitude: 36.823311, longitude: 127.121089 }, //그린빌아파트
    { latitude: 36.823675, longitude: 127.124075 },
    { latitude: 36.824344, longitude: 127.126038 }, //한방병원 건너편
    { latitude: 36.826442, longitude: 127.132877 },
    { latitude: 36.825660, longitude: 127.140353 }, //성정동 스타벅스
    { latitude: 36.824638, longitude: 127.152965 },
    { latitude: 36.824824, longitude: 127.158777 },
    { latitude: 36.824664, longitude: 127.159462 },
    { latitude: 36.824311, longitude: 127.160114 },
    { latitude: 36.824096, longitude: 127.160343 },
    { latitude: 36.823149, longitude: 127.160941 },
    { latitude: 36.821433, longitude: 127.162327 },
    { latitude: 36.819202, longitude: 127.158641 },
    { latitude: 36.819171, longitude: 127.158555 },
    { latitude: 36.818850, longitude: 127.153700 }, //천안터미널
    { latitude: 36.818850, longitude: 127.153700 }, //천안터미널
    { latitude: 36.818663, longitude: 127.152163 }, //방죽안오거리
    { latitude: 36.819572, longitude: 127.151663 },
    { latitude: 36.819710, longitude: 127.151655 },
    { latitude: 36.820563, longitude: 127.151979 },
    { latitude: 36.824650, longitude: 127.152991 }
  ]

  useEffect(() => {
    let socket;

    // 소켓 연결
    const connectSocket = () => {
      socket = socketIOClient(SERVER_URL);
      // 새로운 위치 데이터를 받아와서 마커 갱신
      socket.on('broadcastLocation', (location) => {
        // 범위 id 구별하여 이미지 분리
        if (location.key.startsWith('test')) {newMarkerImage = require('../assets/Person_expo.png');}
        else {newMarkerImage = require('../assets/bus_icon.png');}

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
        {/* 천안아산역 */}
        {selectedIdentifier === "1" && (
          <Polyline
            coordinates={PolylineCoordinates}
            strokeWidth={4}
            strokeColor="rgba(0, 176, 240, 1)"
          />
        )}
        {selectedIdentifier === '1' && (
          <Polyline
            coordinates={PolylineCoordinates02}
            strokeWidth={4}
            strokeColor="rgba(0, 176, 240, 1)"
          />
        )}

        {/* 천안역 */}
        {selectedIdentifier === "2" && (
          <Polyline
            coordinates={PolylineCoordinates03}
            strokeWidth={4}
            strokeColor="rgba(255, 127, 39, 1)"
          />
        )}

        {/* 천안터미널 */}
        {selectedIdentifier === "3" && (
          <Polyline
            coordinates={PolylineCoordinates04}
            strokeWidth={4}
            strokeColor="rgba(235, 42, 42, 1)"
          />
        )}
        

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
