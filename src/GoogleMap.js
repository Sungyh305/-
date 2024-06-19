import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import socketIOClient from 'socket.io-client';
import { IdentifierContext } from './IdentifierContext';
import NetInfo from '@react-native-community/netinfo';

const SERVER_URL = 'https://profound-leech-engaging.ngrok-free.app';
let newMarkerImage;

const GoogleMap = () => {
  const [userMarkers, setUserMarkers] = useState({}); // 사용자 위치 마커 정보
  const { selectedIdentifier } = useContext(IdentifierContext); // Context를 통해 선택된 식별자 사용
  const [region, setRegion] = useState({}); // 지도 초기 위치 설정

  // (천안아산)Polyline의 마커 좌표
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
    { latitude: 36.796176, longitude: 127.10084 }, // 추가 공동 노선
    { latitude: 36.795052, longitude: 127.098083 },
    { latitude: 36.791246, longitude: 127.094606 },
    { latitude: 36.790576, longitude: 127.093147 },
    { latitude: 36.789776, longitude: 127.0883 },
    { latitude: 36.795709, longitude: 127.087605 },
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

  // 천안역
  const PolylineCoordinates03 = [
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
    { latitude: 36.80943, longitude: 127.143363 },
    { latitude: 36.809964, longitude: 127.143952 },
    { latitude: 36.810442, longitude: 127.140841 },
    { latitude: 36.803001, longitude: 127.13908 },
    { latitude: 36.802353, longitude: 127.139547 },
    { latitude: 36.803001, longitude: 127.13908 },
    { latitude: 36.803001, longitude: 127.13908 },
    { latitude: 36.806895, longitude: 127.139945 },
    { latitude: 36.807332, longitude: 127.132702 },
    { latitude: 36.799799, longitude: 127.131344 },
    { latitude: 36.799415, longitude: 127.129589 },
    { latitude: 36.799871, longitude: 127.126555 },
  ];

  // 천안터미널
  const PolylineCoordinates04 = [
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
    { latitude: 36.801564, longitude: 127.105546 },
    { latitude: 36.802837, longitude: 127.105733 },
    { latitude: 36.812978, longitude: 127.108905 }, //불당상업지구
    { latitude: 36.822879, longitude: 127.111939 },
    { latitude: 36.822745, longitude: 127.1136 }, //종합운동장
    { latitude: 36.822764, longitude: 127.11661 },
    { latitude: 36.823311, longitude: 127.121089 }, //그린빌아파트
    { latitude: 36.823675, longitude: 127.124075 },
    { latitude: 36.824344, longitude: 127.126038 }, //한방병원 건너편
    { latitude: 36.826442, longitude: 127.132877 },
    { latitude: 36.82566, longitude: 127.140353 }, //성정동 스타벅스
    { latitude: 36.824638, longitude: 127.152965 },
    { latitude: 36.824824, longitude: 127.158777 },
    { latitude: 36.824664, longitude: 127.159462 },
    { latitude: 36.824311, longitude: 127.160114 },
    { latitude: 36.824096, longitude: 127.160343 },
    { latitude: 36.823149, longitude: 127.160941 },
    { latitude: 36.821433, longitude: 127.162327 },
    { latitude: 36.819202, longitude: 127.158641 },
    { latitude: 36.819171, longitude: 127.158555 },
    { latitude: 36.81885, longitude: 127.1537 }, //천안터미널
    { latitude: 36.818663, longitude: 127.152163 }, //방죽안오거리
    { latitude: 36.819572, longitude: 127.151663 },
    { latitude: 36.81971, longitude: 127.151655 },
    { latitude: 36.820563, longitude: 127.151979 },
    { latitude: 36.82465, longitude: 127.152991 },
  ];

  // 공동운행
  const PolylineCoordinates05 = [
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
    { latitude: 36.796176, longitude: 127.10084 }, // 추가 공동 노선
    { latitude: 36.795052, longitude: 127.098083 },
    { latitude: 36.791246, longitude: 127.094606 },
    { latitude: 36.790576, longitude: 127.093147 },
    { latitude: 36.789776, longitude: 127.0883 },
    { latitude: 36.795709, longitude: 127.087605 }, //
    { latitude: 36.789776, longitude: 127.0883 },
    { latitude: 36.790576, longitude: 127.093147 },
    { latitude: 36.791246, longitude: 127.094606 },
    { latitude: 36.795052, longitude: 127.098083 },
    { latitude: 36.796176, longitude: 127.10084 }, // 이후 갈래길 추가 필요
    { latitude: 36.797118, longitude: 127.106371 },
    { latitude: 36.797367, longitude: 127.107691 },
    { latitude: 36.798066, longitude: 127.109132 },
    { latitude: 36.799682, longitude: 127.110301 },
    { latitude: 36.801012, longitude: 127.111886 },
    { latitude: 36.801922, longitude: 127.112149 }, // 불당 원형 육교
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
    { latitude: 36.80943, longitude: 127.143363 },
    { latitude: 36.809964, longitude: 127.143952 },
    { latitude: 36.810442, longitude: 127.140841 },
    { latitude: 36.803001, longitude: 127.13908 },
    { latitude: 36.802353, longitude: 127.139547 },
    { latitude: 36.803001, longitude: 127.13908 },
    { latitude: 36.803001, longitude: 127.13908 },
    { latitude: 36.806895, longitude: 127.139945 },
    { latitude: 36.807332, longitude: 127.132702 },
    { latitude: 36.799799, longitude: 127.131344 },
    { latitude: 36.799415, longitude: 127.129589 },
    { latitude: 36.799871, longitude: 127.126555 }, // 천안역
  ];

  const PolylineCoordinates06 = [
    { latitude: 36.796176, longitude: 127.10084 }, // 이후 갈래길 추가 필요
    { latitude: 36.797118, longitude: 127.106371 },
    { latitude: 36.801517, longitude: 127.105569 },
    { latitude: 36.801986, longitude: 127.108896 },
    { latitude: 36.801922, longitude: 127.112149 }, // 불당 원형 육교
    { latitude: 36.801986, longitude: 127.108896 },
    { latitude: 36.801517, longitude: 127.105569 },
    { latitude: 36.800417, longitude: 127.099756 },
    { latitude: 36.796176, longitude: 127.10084 },
  ];

  useEffect(() => {
    let socket = socketIOClient(SERVER_URL, {
      reconnection: true, // 자동 재연결 활성화
      reconnectionAttempts: 5, // 재연결 시도 횟수 설정
      reconnectionDelay: 3000, // 재연결 시도 간격 설정
    });

    NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        // 네트워크가 끊기면 서버에 알림
        socket.emit('networkDisconnected', socket.id);
        setUserMarkers({});
      } else {
        // 네트워크가 다시 연결되면 서버에 알림
        socket.emit('networkConnected', socket.id);
        // 서버에 마커 정보를 요청
        socket.emit('requestMarkers');
      }
    });

    // 새로운 위치 데이터를 받아와서 마커 갱신
    socket.on('broadcastLocation', (location) => {
      // 범위 id 구별하여 이미지 분리
      if (location.key.startsWith('on_bus')) {
        console.log('Setting marker image for bus stop');
        newMarkerImage = require('../assets/Person_expo.png');
      } else {
        console.log('Setting marker image for user');
        newMarkerImage = require('../assets/bus_expo.png');
      }

      setUserMarkers((prevMarkers) => ({
        ...prevMarkers,
        [location.userId]: location,
      }));
    });

    // 사용자 연결이 종료되었을 때 해당 사용자의 마커 제거
    socket.on('removeMarker', (userId) => {
      console.log('Removing marker for user:', userId);

      setUserMarkers((prevMarkers) => {
        const updatedMarkers = { ...prevMarkers };
        delete updatedMarkers[userId];
        console.log('Updated markers after removal:', updatedMarkers);
        return updatedMarkers;
      });
    });

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      socket.disconnect();
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
            latitude: 36.807468,
            longitude: 127.107576,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          });
          break;
        case '3':
          setRegion({
            latitude: 36.810002,
            longitude: 127.116516,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
          break;
        case '4':
          setRegion({
            latitude: 36.807468,
            longitude: 127.107576,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          });
          break;
        default:
          setRegion({
            latitude: 36.798778,
            longitude: 127.074977,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
      }
    };

    updateRegion();
  }, [selectedIdentifier]);

  return (
    <View style={styles.screen}>
      {/* 지도 표시 */}
      <MapView style={styles.map} region={region}>
        {/* 천안아산역 */}
        {selectedIdentifier === '1' && (
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
        {selectedIdentifier === '2' && (
          <Polyline
            coordinates={PolylineCoordinates03}
            strokeWidth={4}
            strokeColor="rgba(255, 127, 39, 1)"
          />
        )}
        {selectedIdentifier === '2' && (
          <Polyline
            coordinates={PolylineCoordinates02}
            strokeWidth={4}
            strokeColor="rgba(255, 127, 39, 1)"
          />
        )}

        {/* 천안터미널 */}
        {selectedIdentifier === '3' && (
          <Polyline
            coordinates={PolylineCoordinates04}
            strokeWidth={4}
            strokeColor="rgba(235, 42, 42, 1)"
          />
        )}
        {selectedIdentifier === '3' && (
          <Polyline
            coordinates={PolylineCoordinates02}
            strokeWidth={4}
            strokeColor="rgba(235, 42, 42, 1)"
          />
        )}

        {/* 공동운행 */}
        {selectedIdentifier === '4' && (
          <Polyline
            coordinates={PolylineCoordinates05}
            strokeWidth={4}
            strokeColor="rgba(235, 42, 42, 1)"
          />
        )}
        {selectedIdentifier === '4' && (
          <Polyline
            coordinates={PolylineCoordinates02}
            strokeWidth={4}
            strokeColor="rgba(235, 42, 42, 1)"
          />
        )}
        {selectedIdentifier === '4' && (
          <Polyline
            coordinates={PolylineCoordinates06}
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
                image={newMarkerImage}
              />
            )
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMap;
