import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Image,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import socketIOClient from 'socket.io-client';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const SERVER_URL = 'https://advanced-sawfish-faithful.ngrok-free.app/';

const Dashboard = () => {
  const navigation = useNavigation();
  const [switchValue, setSwitchValue] = useState(false); // GPS 사용 여부
  const [user, setUser] = useState(''); // 사용자 정보
  const [socket, setSocket] = useState(null); // 소켓 연결
  const [selectedLocation, setSelectedLocation] = useState('1'); // 선택된 위치
  intervalId = useRef(null); // 위치 전송 간격 ID

  // 비동기 함수를 통해 사용자 데이터 가져오기
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

  useEffect(() => {
    const connectSocket = () => {
      const newSocket = socketIOClient(SERVER_URL);
      setSocket(newSocket);
    };

    connectSocket();

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  // GPS 스위치
  const toggleSwitch = async (value) => {
    setSwitchValue(value);
    if (value) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      // 5초 간격으로 위치 전송
      intervalId.current = setInterval(sendLocation, 5000)
      
      // 보낸 위치가 범위 밖일 시 오류 메시지 출력
      if(socket) {
        socket.on('LocationError', (point) => {
          toggleSwitch(false);
          Alert.alert(
            '알림',
            `범위를 벗어났습니다.\nGPS를 다시 설정해주세요.\n(적립된 포인트: ${point.point})`,
            [{text: '확인',}],
            { cancelable: false }
          );
        });
      }
    } else {
      // GPS 중지 시
      clearInterval(intervalId.current);
      console.log("GPS 중지");
      Alert.alert('GPS 연결이 종료되었습니다.');
    }
  };

  // 위치 전송 함수
  const sendLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      if (socket && socket.connected) {
        // 선택된 위치와 함께 위치 데이터 전송
        socket.emit('userLocation', {
          email: user.email,
          identifier: selectedLocation,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      }
      
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };
  const tset2 = () => {
    console.log("test");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            style={styles.Image}
            source={require('../assets/user.png')}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 30, }}>
          {user.name}님 반갑습니다.
        </Text>
        <View style={styles.outerContainer}>
          <View style={styles.middleContainer}>
            {/* 셔틀 시간표 보기 버튼 */}
            <TouchableOpacity onPress={() => navigation.navigate('Shuttle')}>
              <View style={styles.View_shuttle}>
                <Image
                  style={styles.View_bus_image}
                  source={require('../assets/shuttle_bus.png')}
                />
                <Text style={styles.Text}>
                  셔틀 버스{'\n'}시간표 보기
                </Text>
              </View>
            </TouchableOpacity>
            {/* 기차 시간표 보기 버튼 */}
            <TouchableOpacity onPress={() => navigation.navigate('TrainSchedule')}>
              <View style={styles.View_train}>
                <Image
                  style={styles.View_bus_image}
                  source={require('../assets/train.png')}
                />
                <Text style={styles.Text}>
                  기차 시간표 보기
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.middleContainer}>
            {/* GPS 송신 버튼 */}
            <View style={styles.GPS_switch}>
              {/* 드롭다운 메뉴 */}
              <Picker
                selectedValue={selectedLocation}
                style={{ height: 50, width: 150, fontWeight: 'bold'}}
                onValueChange={(itemValue) => setSelectedLocation(itemValue)}
              >
                <Picker.Item label="천안아산역" value="1" />
                <Picker.Item label="천안역" value="2" />
                <Picker.Item label="천안터미널" value="3" />
              </Picker>
              {/* GPS 토글 스위치 */}
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={switchValue}
              />
              <Text style={styles.Text}>
                GPS 위치 전송
              </Text>
            </View>
            {/* 셔틀 버스 위치 보기 버튼 */}
            <TouchableOpacity onPress={() => navigation.navigate('GoogleMap')}>
              <View style={styles.View_bus}>
                <Image
                  style={styles.View_bus_image}
                  source={require('../assets/bus_location.png')}
                />
                <Text style={styles.Text}>
                  셔틀 버스{'\n'}위치 보기
                </Text>
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
            <Text style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 2,
            }}>
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
    width : 40,
    marginEnd: 10,
  },
});