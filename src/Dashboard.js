import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import socketIOClient from 'socket.io-client';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const SERVER_URL = 'https://profound-leech-engaging.ngrok-free.app';

const Dashboard = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(''); // 사용자 이름
  const [switchValue, setSwitchValue] = useState(false); // GPS 사용 여부
  const [socket, setSocket] = useState(null); // 소켓 연결
  const [selectedLocation, setSelectedLocation] = useState('1'); // 선택된 위치
  const [intervalId, setIntervalId] = useState(null); // 위치 전송 간격 ID

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
      const id = setInterval(sendLocation, 5000);
      setIntervalId(id);
    } else {
      // GPS 중지 시
      clearInterval(intervalId);
      if (socket) {
        socket.disconnect();
      }
      Alert.alert('GPS 연결이 종료되었습니다.');
    }
  };

  // 위치 전송 함수
  const sendLocation = async () => {
    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      if (socket) {
        // 선택된 위치와 함께 위치 데이터 전송
        socket.emit('userLocation', {
          identifier: selectedLocation,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      }
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  // 비동기 함수를 통해 사용자 데이터 가져오기
  useEffect(() => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log('User does not exist');
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Hello, {name.firstName}
      </Text>
      {/* 드롭다운 메뉴 */}
      <Picker
        selectedValue={selectedLocation}
        style={{ height: 50, width: 200 }}
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
      {/* 비밀번호 변경 버튼 */}
      <TouchableOpacity
        onPress={() => {
          changePassword();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Change Password
        </Text>
      </TouchableOpacity>
      {/* 셔틀 버스 위치 보기 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.navigate('GoogleMap')}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          셔틀 버스 위치 보기
        </Text>
      </TouchableOpacity>
      {/* 로그아웃 버튼 */}
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
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
});
