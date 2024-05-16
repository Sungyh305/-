import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';
import socketIOClient from 'socket.io-client';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

const SERVER_URL = 'https://boar-boss-definitely.ngrok-free.app/';

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

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.firestore().collection('users').doc(user.uid).get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setName(snapshot.data().name);
          } else {
            console.log('User does not exist');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleProfileButtonPress = () => {
    navigation.navigate('Profile'); // 'Profile'은 프로필 화면의 route 이름입니다.
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.welcomeText}>
        {name.firstName}님 반갑습니다.
      </Text>
      <Picker
        selectedValue={selectedLocation}
        style={styles.picker}
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
        onValueChange={(value) => toggleSwitch(value)}
        value={switchValue}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('ChangePassword')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleProfileButtonPress}
        style={styles.button}
      >
        <Text style={styles.buttonText}>프로필</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('GoogleMap')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>셔틀 버스 위치 보기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          firebase.auth().signOut();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: 200,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    height: 50,
    width: 250,
    backgroundColor: '#86CC57',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Dashboard;
