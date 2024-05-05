// Tmap에서 GoogleMap으로 변경 고려중

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import io from 'socket.io-client';

const TmapScreen = () => {
  // 위치, 소켓 상태를 관리하는 상태 변수를 선언
  const [location, setLocation] = useState(null);
  const [serverLocation, setServerLocation] = useState(null);
  const [socket, setSocket] = useState(null);

  // 처음 렌더링될 때 소켓을 연결하고 위치 권한을 요청
  useEffect(() => {
    const socketInstance = io('https://profound-leech-engaging.ngrok-free.app'); //ngrok 개인 pc 주소
    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect(); // 소켓 연결 종료
      }
    };
  }, []); // 한 번만 실행되도록 빈 배열 전달

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
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        setLocation(location);

        // 소켓이 연결되어 있고 연결이 끊어지지 않은 경우에만 위치 데이터를 서버로 전송
        if (socket && !socket.disconnected) {
          const { latitude, longitude } = location.coords;
          socket.emit('sendLocation', { latitude, longitude });
          console.log('위치 데이터를 전송했습니다:', { latitude, longitude });
        }
      } catch (error) {
        console.error('위치 정보를 가져올 수 없습니다:', error.message);
      }
    };

    // 최초 위치 업데이트
    fetchLocation();

    // 7초마다 위치 업데이트
    const interval = setInterval(fetchLocation, 7000);

    // cleanup 함수: 컴포넌트가 언마운트될 때 interval을 제거하여 메모리 누수 방지
    return () => clearInterval(interval);
  }, [socket]); // 소켓이 변경될 때마다 이펙트 실행

  // WebView에 표시할 HTML 내용     [API키 입력] 부분은 Tmap API키 입력
  const htmlContent = `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>simpleMap</title>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=[api key]"></script>
        <script type="text/javascript">
          var map, marker;

          function initTmap() {
            map = new Tmapv2.Map('map_div', {
              center: new Tmapv2.LatLng(36.800193, 127.070862),
              width: '100%',
              height: '100%',
              zoom: 18,
            });
            // 위치가 존재하는 경우에만 해당 위치로 지도를 이동하고 마커를 표시
            ${
              location
                ? `
                var lat = ${location.coords.latitude};
                var lon = ${location.coords.longitude};
                marker = new Tmapv2.Marker({
                  position: new Tmapv2.LatLng(lat, lon),
                  map: map,
                });
                map.setCenter(new Tmapv2.LatLng(lat, lon));
              `
                : ''
            }
          }

          // Socket.IO로부터 위치 데이터를 받아와서 지도에 마커 표시 -> 이거 아직 개발 중입니다.(여기부터 script 전까지는 작동 안됨)
          var socket = io('https://profound-leech-engaging.ngrok-free.app');  //ngrok 개인 pc 주소
          socket.on('updateLocation', function(locationData) {
            var lat = locationData.latitude;
            var lon = locationData.longitude;
            marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(lat, lon),
              map: map,
            });
            map.setCenter(new Tmapv2.LatLng(lat, lon));

            // 서버로부터 전송받은 위치를 저장하여 화면에 표시
            document.getElementById('serverLocation').innerHTML = '서버로부터 전송받은 위치: 위도 ' + lat + ', 경도 ' + lon;
          });
        </script>
      </head>
      <body onload="initTmap()">
        <div id="map_div"></div>
        <div id="serverLocation"></div> <!-- 서버로부터 전송받은 위치를 표시할 영역 -->
      </body>
    </html>
  `;

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
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
    </View>
  );
};

export default TmapScreen;
