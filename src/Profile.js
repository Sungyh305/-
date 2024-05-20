import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
  const [userName, setUserName] = useState('Loading...');
  const [userPoints, setUserPoints] = useState('Loading...');
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [additional, setAdditional] = useState('');
  const [personal, setPersonal] = useState('');
  const [information, setInformation] = useState('');

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            setUserName(documentSnapshot.data().name);
            setUserPhoto(documentSnapshot.data().photoURL || null);
            setEmail(documentSnapshot.data().email);
            setAdditional(documentSnapshot.data().additional);
            setPersonal(documentSnapshot.data().personal);
            setInformation(documentSnapshot.data().information);
          } else {
            setUserName('No name');
          }
        })
        .catch((error) => {
          console.log('Error getting user data:', error);
          setUserName('Failed to load name');
        });
    }
  }, []);

  const updateUserInfo = () => {
    const user = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        email: email,
        additional: additional,
        personal: personal,
        information: information,
      })
      .then(() => {
        Alert.alert('성공', 'User information updated successfully');
        setEditModalVisible(false);
      })
      .catch((error) => {
        Alert.alert('오류', error.message);
      });
  };

  const changePassword = () => {
    const user = firebase.auth().currentUser;
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    user
      .updatePassword(newPassword)
      .then(() => {
        Alert.alert('Success', 'Password updated successfully');
        setModalVisible(false);
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        Alert.alert('Logged Out', 'You have been logged out successfully');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const selectPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserPhoto({ uri: result.assets[0].uri });
    } else {
      console.log('User cancelled image picker');
    }
  };

  const openEditModal = () => {
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButtonRight}
          onPress={openEditModal}
        >
          <Icon name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoSection}>
        <TouchableOpacity style={styles.userRow} onPress={selectPhoto}>
          {userPhoto ? (
            <Image
              source={userPhoto}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <Icon name="account-circle" size={120} color="grey" />
          )}
          <Text style={styles.userName}>{userName}</Text>
        </TouchableOpacity>
        <Text style={styles.pointsTitle}>나의 적립포인트: {userPoints}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>e-mail: {email}</Text>
        <Text style={styles.detailText}>기타: {additional}</Text>
        <Text style={styles.detailText}>개인: {personal}</Text>
        <Text style={styles.detailText}>정보: {information}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>새 비밀번호 입력</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="새 비밀번호"
              secureTextEntry={true} // 비밀번호는 보안 입력 필드로 설정
            />
            <TouchableOpacity style={styles.button} onPress={changePassword}>
              <Text style={styles.buttonText}>비밀번호 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEmail(email); // 현재 이메일 상태를 이전 값으로 복원
          setAdditional(additional); // 추가 정보 복원
          setPersonal(personal); // 개인 정보 복원
          setInformation(information); // 일반 정보 복원
          setEditModalVisible(!editModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Information</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="e-mail"
            />
            <TextInput
              style={styles.input}
              onChangeText={setAdditional}
              value={additional}
              placeholder="기타"
            />
            <TextInput
              style={styles.input}
              onChangeText={setPersonal}
              value={personal}
              placeholder="개인"
            />
            <TextInput
              style={styles.input}
              onChangeText={setInformation}
              value={information}
              placeholder="정보"
            />
            <TouchableOpacity style={styles.button} onPress={updateUserInfo}>
              <Text style={styles.buttonText}>Update Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
  },
  iconButtonRight: {
    padding: 10,
    position: 'absolute',
    right: 20,
  },
  userInfoSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 18,
    color: 'black',
    marginRight: 20,
  },
  pointsTitle: {
    fontSize: 16,
    color: 'grey',
    marginTop: 10,
  },
  details: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: 'black',
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    width: '90%',
    padding: 15,
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    marginBottom: 15,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default ProfileScreen;
