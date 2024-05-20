import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config'; // Firebase 설정 가져오기
import socketIOClient from 'socket.io-client'; // Socket.IO 클라이언트 라이브러리 가져오기
import * as TaskManager from 'expo-task-manager'; // Expo 백그라운드 태스크 매니저 가져오기
import * as Location from 'expo-location'; // Expo 위치 API 가져오기
import { Picker } from '@react-native-picker/picker'; // React Native Picker 컴포넌트 가져오기

const SERVER_URL = 'https://profound-leech-engaging.ngrok-free.app'; // 서버 URL
const LOCATION_TASK_NAME = 'background-location-task'; // 백그라운드 위치 태스크 이름

const globalSocket = socketIOClient(SERVER_URL); // 전역 Socket.IO 클라이언트 인스턴스
let globalSelectedLocation = '1'; // 전역 선택된 위치

// Expo 백그라운드 위치 태스크 정의
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];
    const user = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get();

    globalSocket.emit('userLocation', {
      // 사용자 위치 데이터를 서버로 전송
      email: user.data().email, // undefined 오류로 주석처리
      identifier: globalSelectedLocation,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }
});

const Dashboard = () => {
  const navigation = useNavigation();
  const [switchValue, setSwitchValue] = useState(false); // GPS 사용 여부 상태
  const [user, setUser] = useState(''); // 사용자 정보 상태
  const [selectedLocation, setSelectedLocation] = useState('1'); // 선택된 위치 상태
  const intervalId = useRef(null); // 인터벌 ID useRef로 저장
  const [backgroundPermissionDenied, setBackgroundPermissionDenied] =
    useState(false); // 백그라운드 권한 거부 상태

  const locationNames = {
    1: '천안아산역',
    2: '천안역',
    3: '천안터미널',
  };

  // 사용자 데이터 가져오기
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUser(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // 소켓 연결 설정
  useEffect(() => {
    if (!globalSocket.connected) {
      globalSocket.connect();
    }

    return () => {
      if (globalSocket) {
        globalSocket.disconnect();
      }
    };
  }, []);

  // 선택된 위치 변경 시 전역 변수 업데이트
  useEffect(() => {
    globalSelectedLocation = selectedLocation;
  }, [selectedLocation]);

  // GPS 스위치 토글 시 동작
  const toggleSwitch = async (value) => {
    setSwitchValue(value);

    if (value) {
      // GPS 사용을 ON으로 변경할 때
      let { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        Alert.alert(
          '권한 오류',
          '앱을 사용하기 위해서는 위치 권한이 필요합니다.'
        );
        setSwitchValue(false);
        return;
      }

      let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== 'granted') {
        setBackgroundPermissionDenied(true);
        return;
      }

      let gpsEnabled = await Location.hasServicesEnabledAsync();
      if (!gpsEnabled) {
        Alert.alert(
          'GPS 활성화 요청',
          'GPS가 꺼져 있습니다. 앱을 사용하기 위해서는 GPS를 활성화해주세요.',
          [{ text: '확인' }]
        );
        setSwitchValue(false);
        return;
      }

      // 5초 간격으로 위치 전송
      intervalId.current = setInterval(sendLocation, 5000);

      // 백그라운드 위치 추적 시작
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 5000,
        distanceInterval: 0,
        showsBackgroundLocationIndicator: true,
      });

      // 범위를 벗어났을 때 오류 메시지 출력
      if (globalSocket) {
        globalSocket.on('LocationError', (point) => {
          toggleSwitch(false);
          Alert.alert(
            '알림',
            `범위를 벗어났습니다.\nGPS를 다시 설정해주세요.\n(적립된 포인트: ${point.point})`,
            [{ text: '확인' }],
            { cancelable: false }
          );
        });
      }
    } else {
      // GPS 사용을 OFF로 변경할 때
      clearInterval(intervalId.current);
      intervalId.current = null;
      console.log('GPS 중지');
      Alert.alert('GPS 연결이 종료되었습니다.');
      // 백그라운드 위치 추적 중지
      if (globalSocket) {
        globalSocket.emit('disconnectUser', globalSocket.id);
      }

      await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    }
  };

  // 위치 전송 함수
  const sendLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      if (globalSocket) {
        console.log('Sending location:', {
          identifier: selectedLocation,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        // 선택된 위치와 함께 위치 데이터 전송
        globalSocket.emit('userLocation', {
          email: user.email,
          identifier: selectedLocation,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } else {
        console.log('Socket is not connected. Location data cannot be sent.');
      }
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  // 백그라운드 위치 권한 거부 시 처리
  useEffect(() => {
    if (backgroundPermissionDenied) {
      // 알림 팝업 표시
      Alert.alert(
        '백그라운드 위치 권한 요청',
        '앱을 사용하기 위해서는 백그라운드 위치 권한이 필요합니다. 설정에서 위치 권한을 항상 허용으로 변경해주세요.',
        [
          { text: '취소' },
          {
            text: '설정으로 이동',
            onPress: () => Linking.openSettings(), // 설정으로 이동하는 함수 호출
          },
        ]
      );
      setSwitchValue(false); // GPS 스위치 값을 false로 변경
      setBackgroundPermissionDenied(false); // 백그라운드 권한 거부 상태를 초기화
    }
  }, [backgroundPermissionDenied]);

  // 화면 렌더링
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image style={styles.Image} source={require('../assets/user.png')} />
        </TouchableOpacity>
        {switchValue ? (
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>
            {locationNames[selectedLocation]}행으로 GPS를 송신중
          </Text>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>
            {user.name}님 반갑습니다.
          </Text>
        )}
        <View style={styles.outerContainer}>
          <View style={styles.middleContainer}>
            {/* 셔틀 시간표 보기 버튼 */}
            <TouchableOpacity onPress={() => navigation.navigate('Shuttle')}>
              <View style={styles.View_shuttle}>
                <Image
                  style={styles.View_bus_image}
                  source={require('../assets/shuttle_bus.png')}
                />
                <Text style={styles.Text}>셔틀 버스{'\n'}시간표 보기</Text>
              </View>
            </TouchableOpacity>
            {/* 기차 시간표 보기 버튼 */}
            <TouchableOpacity
              onPress={() => navigation.navigate('TrainSchedule')}
            >
              <View style={styles.View_train}>
                <Image
                  style={styles.View_bus_image}
                  source={require('../assets/train.png')}
                />
                <Text style={styles.Text}>기차 시간표 보기</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.GPS_switch}>
              {/* 드롭다운 메뉴 */}
              <Picker
                selectedValue={selectedLocation}
                style={{
                  height: 50,
                  width: 150,
                  fontWeight: 'bold',
                  opacity: switchValue ? 0 : 1,
                }}
                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
              >
                <Picker.Item label="천안아산역" value="1" />
                <Picker.Item label="천안역" value="2" />
                <Picker.Item label="천안터미널" value="3" />
              </Picker>

              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={switchValue}
              />
              <Text style={styles.Text}>GPS 위치 전송</Text>
            </View>

            {/* 셔틀 버스 위치 보기 버튼 */}
            <TouchableOpacity onPress={() => navigation.navigate('GoogleMap')}>
              <View style={styles.View_bus}>
                <Image
                  style={styles.View_bus_image}
                  source={require('../assets/bus_location.png')}
                />
                <Text style={styles.Text}>셔틀 버스{'\n'}위치 보기</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notice')}>
          <View style={styles.View_notice}>
            <Image
              style={styles.notice_image}
              source={require('../assets/notice.png')}
            />
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
                padding: 2,
              }}
            >
              공지사항
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginTop: 10,
    paddingRight: 20,
  },
  outerContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  Image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 30,
  },
  View_shuttle: {
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  View_train: {
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: 20,
    borderRadius: 8,
  },
  View_bus: {
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: 15,
    borderRadius: 8,
  },
  View_bus_image: {
    resizeMode: 'contain',
  },
  GPS_switch: {
    width: 150,
    height: 150,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  Text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#86CC57',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  View_notice: {
    flexDirection: 'row',
    marginTop: 100,
    marginEnd: 100,
  },
  notice_image: {
    height: 40,
    width: 40,
    marginEnd: 10,
  },
});
