import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  View,
  Linking,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import socketIOClient from 'socket.io-client'; // Socket.IO 클라이언트 라이브러리 가져오기
import * as TaskManager from 'expo-task-manager'; // Expo 백그라운드 태스크 매니저 가져오기
import * as Location from 'expo-location'; // Expo 위치 API 가져오기
import { Picker } from '@react-native-picker/picker'; // React Native Picker 컴포넌트 가져오기

const SERVER_URL = 'https://advanced-sawfish-faithful.ngrok-free.app/'; // 서버 URL
const LOCATION_TASK_NAME = 'background-location-task'; // 백그라운드 위치 태스크 이름
const { width, height } = Dimensions.get('window');

let globalSocket = null; // 전역 Socket.IO 클라이언트 인스턴스
let globalSelectedLocation = '1'; // 전역 선택된 위치 (default 1)
let key_on = 0;
let switch_key = 0;
let hasExceededSpeed = false; // 설정해둔 속도를 넘었는지 여부를 추적하는 변수

// 백그라운드 위치 추적 태스크 정의
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error('TaskManager Error:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];
    //console.log('Background location:', location);

    // 사용자 인증 정보 확인
    const user = firebase.auth().currentUser;
    if (!user) {
      console.log('User not authenticated');
      return;
    }

    // Socket이 연결되어 있다면 위치 데이터 전송
    if (globalSocket && globalSocket.connected) {
      const speed = location.coords.speed;
      if (speed >= 8.33) {
        //30km/h = 8.33m/s, 35km/h = 9.72m/s, 40km/h = 11.11m/s
        hasExceededSpeed = true;
      }
      if (key_on) {
        globalSocket.emit('userLocation2', {
          identifier: globalSelectedLocation,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        globalSocket.emit('userLocation', {
          // 사용자 위치 데이터를 서버로 전송
          identifier: globalSelectedLocation,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    }
  }
});

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const [switchValue, setSwitchValue] = useState(false); // GPS 사용 여부 상태
  const [user, setUser] = useState(''); // 사용자 정보 상태
  const [selectedLocation, setSelectedLocation] = useState('1'); // 선택된 위치 상태
  const [backgroundPermissionDenied, setBackgroundPermissionDenied] =
    useState(false); // 백그라운드 권한 거부 상태

  // 위치 이름 매핑 객체
  const locationNames = {
    1: '천안아산역',
    2: '천안역',
    3: '천안터미널',
    4: '공동운행(천안역, 천안아산역)',
  };

  // 사용자 데이터 가져오기
  const fetchUserData = async () => {
    try {
      const userDoc = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get();
      if (userDoc.exists) {
        setUser(userDoc.data());
      } else {
        console.log('User does not exist');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Dashboard 컴포넌트에서 route.params로 전달된 데이터 확인 후 업데이트
  useEffect(() => {
    fetchUserData();
  }, [route.params]);

  // 선택된 위치 변경 시 전역 변수 업데이트
  useEffect(() => {
    globalSelectedLocation = selectedLocation;
  }, [selectedLocation]);

  // 컴포넌트가 처음 로드될 때 위치 업데이트 초기화
  useEffect(() => {
    const initializeLocationUpdates = async () => {
      const isBackgroundUpdateRunning =
        await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      if (isBackgroundUpdateRunning) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log('Stopped background location updates on initial load');
      }
    };

    initializeLocationUpdates();
  }, []);

  // 스위치 껐을 때 함수 정의
  async function switch_off(point) {
    try {
      // 백그라운드 위치 업데이트 중지
      const isBackgroundUpdateRunning =
        await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      if (isBackgroundUpdateRunning) {
        await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log('Stopped background location updates');
      }

      // Socket.IO 연결 해제
      if (globalSocket) {
        globalSocket.emit('disconnectUser', globalSocket.id);
        if(point !== 0) {
          Alert.alert(
            '알림',
            `GPS 연결이 종료되었습니다.\n(적립된 포인트 : ${point})`,
            [{ text: '확인'}],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            '알림',
            `GPS 연결이 종료되었습니다.`,
            [{ text: '확인'}],
            { cancelable: false }
          );
        }
        globalSocket.disconnect();
        globalSocket = null;
      }
    } catch (error) {
      console.error('Error function switch_off updates:', error);
      Alert.alert(
        '오류',
        '위치 서비스를 중지하는 중 오류가 발생했습니다. 다시 시도해주세요.'
      );
    }
    key_on = 0;
  }

  // GPS 스위치 토글 시 동작
  const toggleSwitch = async (value) => {
    setSwitchValue(value); // 스위치 상태 업데이트

    if (value) {
      hasExceededSpeed = false; // 스위치 켜질 때마다 속도 플래그 초기화
      try {
        // 포어그라운드 위치 권한 요청
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

        // 백그라운드 위치 권한 요청
        let { status: backgroundStatus } =
          await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
          Alert.alert(
            '백그라운드 위치 권한 필요',
            '백그라운드 위치 권한이 없으면 서비스가 정상 작동하지 않습니다.\n 백그라운드 위치 권한을 <항상 허용> 으로 설정해주세요.',
            [{ text: '확인' }],
            { cancelable: false }
          );
          setBackgroundPermissionDenied(true); // 권한 거부 상태 설정
          return;
        }

        // GPS 활성화 여부 확인
        let gpsEnabled = await Location.hasServicesEnabledAsync();
        if (!gpsEnabled) {
          Alert.alert(
            'GPS 활성화 요청',
            'GPS가 꺼져 있습니다. 포인트를 얻기 위해서는 GPS를 활성화해주세요.',
            [{ text: '확인' }]
          );
          setSwitchValue(false);
          return;
        }

        // Socket.IO 초기화
        if (!globalSocket || !globalSocket.connected) {
          globalSocket = socketIOClient(SERVER_URL);
          globalSocket.connect();

          // on_bus 위치 벗어날 시
          globalSocket.on('LocationChange', async () => {key_on = 1});

          globalSocket.off('LocationError');
          globalSocket.on('LocationError', async () => {
            console.log('LocationError event received');

            // 백그라운드 위치 전송 중지
            const isBackgroundUpdateRunning =
              await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
            if (isBackgroundUpdateRunning) {
              await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
              console.log(
                'Stopped background location updates on LocationError'
              );
            }

            // 스위치 끄기
            switch_key = 1;
            setSwitchValue(false);

            Alert.alert(
              '알림',
              `버스 승차장에서 스위치를 켜주세요.`,
              [
                {
                  text: '확인',
                  onPress: () => {
                    switch_off(0);
                  },
                },
              ],
              { cancelable: false }
            );
          });

          //소켓 최대 연결 시간(TimeOut)
          globalSocket.off('connectionTimeout');
          globalSocket.on('connectionTimeout', async () => {
            const isBackgroundUpdateRunning =
              await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
            if (isBackgroundUpdateRunning) {
              await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
              console.log(
                'Stopped background location updates on connectionTimeout'
              );
            }

            // Socket.IO 연결 해제
            if (globalSocket) {
              globalSocket.emit('disconnectUser', globalSocket.id);
              globalSocket.disconnect();
              globalSocket = null;
            }

            setSwitchValue(false);
            let pointsEarned = 0;

            Alert.alert(
              '연결 시간 초과',
              '최대 연결 시간 2시간이 지났습니다.',
              [
                {
                  text: '확인',
                  onPress: () => {
                    Alert.alert(
                      'GPS 연결이 종료되었습니다.',
                      `적립된 포인트: ${pointsEarned}`
                    );
                  },
                },
              ]
            );
          });
        }

        // 백그라운드 위치 업데이트 시작
        const isBackgroundUpdateRunning =
          await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
        if (!isBackgroundUpdateRunning) {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 6000,
            distanceInterval: 0,
            showsBackgroundLocationIndicator: true,
          });
          console.log('Started background location updates');
        }
      } catch (error) {
        console.error('Error starting location updates:', error);
        Alert.alert(
          '오류',
          `위치 서비스를 시작하는 중 오류가 발생했습니다. 다시 시도해주세요.\n상세 오류: ${error.message}`
        );
        setSwitchValue(false);
      }
    } else {
      try {
        if (globalSocket) {
          // 이전 핸들러 제거
          globalSocket.off('off_bus_result');

          // 현재 위치 정보 가져오기
          const location = await Location.getCurrentPositionAsync({});

          globalSocket.emit('off_bus', {
            email: user.email,
            identifier: globalSelectedLocation,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            hasExceededSpeed: hasExceededSpeed,
          });

          globalSocket.on('off_bus_result', (result) => {
            if (result.result) {
              switch_off(result.point);
            } else {
              if(switch_key == 0) {
                Alert.alert(
                  '주의사항',
                  `지금 종료하면 포인트를 얻지 못합니다.\n버스에서 내리면 종료해주세요.`,
                  [
                    { text: '취소', onPress: () => {setSwitchValue(true)} },
                    {
                      text: '종료',
                      onPress: () => {switch_off(0)}
                    },
                  ]
                );
              }
              switch_key = 0;
            }
          });

          // 스위치를 킨 정류장에서 다시 끄거나 속도가 30km 이상 나오지 않았을 때
          globalSocket.on('off_bus_result2', () => {
            Alert.alert(
              '알림',
              `버스를 탑승하지 않으셨습니다.\nGPS 연결을 종료합니다.`,
              [
                { text: '확인', onPress: () => {switch_off(0)} }
              ]
            );
          });

          // 설정한 노선과 내린 정류장이 다를 경우
          globalSocket.on('off_bus_result3', () => {
            Alert.alert(
              '알림',
              `설정한 노선과 다릅니다.\nGPS 연결을 종료합니다.`,
              [
                { text: '확인', onPress: () => {switch_off(0)} }
              ]
            );
          });
        } else {
          console.error('globalSocket is null');
        }
      } catch (error) {
        console.error('Error stopping location updates:', error);
        Alert.alert(
          '오류',
          '위치 서비스를 중지하는 중 오류가 발생했습니다. 다시 시도해주세요.'
        );
      }
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
        {/* 프로필 이미지 표시 */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.Image}
            source={
              user && user.photoURL
                ? { uri: user.photoURL }
                : user && user.image
                ? user.image
                : require('../assets/user.png')
            }
          />
        </TouchableOpacity>
        {switchValue ? (
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>
            {locationNames[selectedLocation]} 노선으로 GPS 송신중
          </Text>
        ) : (
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30 }}>
            {user.name}님 반갑습니다.
          </Text>
        )}
        <View style={styles.outerContainer}>
          <View style={styles.middleContainer}>
            {/* 셔틀 시간표 보기 버튼 */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ShuttleSchedule')}
            >
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
                  opacity: switchValue ? 0.5 : 1,
                }}
                enabled={!switchValue}
                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
              >
                <Picker.Item label="천안아산역" value="1" />
                <Picker.Item label="천안역" value="2" />
                <Picker.Item label="천안터미널" value="3" />
                <Picker.Item label="공동운행(천안역, 천안아산역)" value="4" />
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
        <TouchableOpacity style={styles.View_notice} onPress={() => navigation.navigate('Notice')}>
          <Image
            style={styles.notice_image}
            source={require('../assets/notice.png')}
            onPress={() => navigation.navigate('Notice')}
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
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginTop: height * 0.015,
    paddingRight: width * 0.055,
  },
  outerContainer: {
    alignItems: 'center',
    paddingTop: height * 0.02,
    height: height * 0.43
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: height * 0.027,
  },
  Image: {
    width: width * 0.27,
    height: width * 0.27,
    borderRadius: 50,
    marginBottom: height * 0.04,
  },
  View_shuttle: {
    width: width * 0.42,
    height: width * 0.42,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: width * 0.05,
    borderRadius: 8,
    marginHorizontal: width * 0.055,
  },
  View_train: {
    width: width * 0.42,
    height: width * 0.42,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: width * 0.05,
    borderRadius: 8,
  },
  View_bus: {
    width: width * 0.42,
    height: width * 0.42,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    padding: width * 0.04,
    borderRadius: 8,
  },
  View_bus_image: {
    resizeMode: 'contain',
  },
  GPS_switch: {
    width: width * 0.42,
    height: width * 0.42,
    alignItems: 'center',
    backgroundColor: '#86CC57',
    borderRadius: 8,
    marginHorizontal: width * 0.055,
  },
  Text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 8,
  },
  View_notice: {
    flexDirection: 'row',
    marginTop: height * 0.12,
    marginEnd: width * 0.3,
  },
  notice_image: {
    height: height * 0.05,
    width: width * 0.12,
    marginEnd: width * 0.03,
  },
});