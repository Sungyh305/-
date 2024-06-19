import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { firebase } from '../config';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const registerUser = async (email, password, name) => {
    try {
      // Firebase Authentication을 사용하여 사용자 생성
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // 사용자 생성 후 Firestore에 사용자 정보 추가
      await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .set({
          email,
          name,
          point: 0,
        });
      // 포인트 적립 내역 하위 컬렉션에 추가
      const pointLog = {
        date,
        content,
        points,
      };
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('pointLogs')
        .add(pointLog);
      // 이메일 확인을 위한 이메일 발송
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://login-943f1.firebaseapp.com',
      });
      // 회원가입 성공 메시지 표시
      Alert.alert('알림', `회원가입에 성공하였습니다.`, [{ text: '확인' }], {
        cancelable: false,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
      <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <Image
            style={styles.image}
            source={require('../assets/Bus_where_r_u_going.png')}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Name"
            onChangeText={(name) => setName(name)}
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          onPress={() => registerUser(email, password, name)}
          style={styles.button}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 60,
    top: -200,
    resizeMode: 'contain',
  },
  textInput: {
    top: 50,
    paddingTop: 20,
    paddingBottom: 10,
    width: 320,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    height: 45,
    width: 125,
    backgroundColor: '#86CC57',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    position: 'absolute',
    right: 20,
    top: 600,
  },
});
