import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  Modal,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../config';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const Profile = ({ route }) => {
  const [user, setUser] = useState(''); // 사용자 정보 상태
  const [userPhoto, setUserPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [couponmodalVisible, setcouponModalVisible] = useState(false);
  const [newname, setNewname] = useState('');
  const navigation = useNavigation();
  const [shuttleBusCount, setShuttleBusCount] = useState(0);
  const [konaKingCount, setKonaKingCount] = useState(0);
  const [cuGiftCard3000Count, setCuGiftCard3000Count] = useState(0);
  const [cuGiftCard5000Count, setCuGiftCard5000Count] = useState(0);

  // 사용자 데이터 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get();
        if (userDoc.exists) {
          setUser(userDoc.data());
          const coupons = userDoc.data().coupons;
          if (coupons && coupons.length > 0) {
            coupons.forEach((coupon) => {
              switch (coupon) {
                case '셔틀버스 1회 이용권':
                  setShuttleBusCount((prevCount) => prevCount + 1);
                  break;
                case '코나킹 3000원 쿠폰':
                  setKonaKingCount((prevCount) => prevCount + 1);
                  break;
                case 'CU 3000원 기프티콘':
                  setCuGiftCard3000Count((prevCount) => prevCount + 1);
                  break;
                case 'CU 5000원 기프티콘':
                  setCuGiftCard5000Count((prevCount) => prevCount + 1);
                  break;
                default:
                  break;
              }
            });
          }
        } else {
          console.log('User does not exist');
        }

        // 스토리지에서 프로필 이미지 가져오기
        const storageRef = firebase
          .storage()
          .ref()
          .child(`profile_images/${firebase.auth().currentUser.uid}`);
        try {
          const url = await storageRef.getDownloadURL();
          setUserPhoto({ uri: url });
        } catch (error) {}
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  // Dashboard 컴포넌트에서 route.params로 전달된 데이터 확인 후 업데이트
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get();
        if (userDoc.exists) {
          setUser(userDoc.data());
          if (route.params && route.params.couponname) {
            const { couponname } = route.params;
            switch (couponname) {
              case '셔틀버스 1회 이용권':
                setShuttleBusCount((prevCount) => prevCount + 1);
                break;
              case '코나킹 3000원 쿠폰':
                setKonaKingCount((prevCount) => prevCount + 1);
                console.log('ok');
                break;
              case 'CU 3000원 기프티콘':
                setCuGiftCard3000Count((prevCount) => prevCount + 1);
                break;
              case 'CU 5000원 기프티콘':
                setCuGiftCard5000Count((prevCount) => prevCount + 1);
                break;
              default:
                break;
            }
          }
        } else {
          console.log('User does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [route.params]);

  // 로그아웃 함수
  const logout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const changePassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        Alert.alert(
          '알림',
          '비밀번호를 바꿀 수 있는 메세지를 이메일로 전송하였습니다.'
        );
      })
      .catch((error) => {
        alert(error);
      });
  };

  // 프로필 이미지 변경
  const selectPhoto = async () => {
    try {
      // 권한 요청
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'Permission to access camera roll is required!'
        );
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { uri } = result.assets[0]; // result.assets[0]에서 uri 추출
        const response = await fetch(uri);
        const blob = await response.blob();

        const storageRef = firebase
          .storage()
          .ref()
          .child(`profile_images/${firebase.auth().currentUser.uid}`);
        await storageRef.put(blob);
        const url = await storageRef.getDownloadURL();

        const userRef = firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid);
        await userRef.update({
          photoURL: url,
        });

        setUserPhoto({ uri });

        // 이미지 변경 성공 알림 띄우기
        Alert.alert('알림', '프로필 이미지가 변경되었습니다.');
        navigation.navigate('Dashboard', { updatedImage: url });
      } else {
        console.log('User cancelled image picker');
      }
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
      Alert.alert('Error', 'Failed to upload image to Firebase.');
    }
  };

  // 이름 변경 함수
  const updateName = async (newname) => {
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    try {
      await userRef.update({
        name: newname,
      });
      setUser({ ...user, name: newname });
      Alert.alert('알림', '이름이 업데이트되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]);
      navigation.navigate('Dashboard', { updatedName: newname });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButtonRight}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoSection}>
        <TouchableOpacity style={styles.userRow} onPress={selectPhoto}>
          {userPhoto ? (
            <Image
              source={userPhoto}
              style={{
                width: width * 0.34,
                height: width * 0.34,
                borderRadius: 60,
              }}
            />
          ) : (
            <Icon name="account-circle" size={120} color="grey" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.detailText}>이 름</Text>
          <Text style={styles.detailText}>이메일</Text>
          <Text style={styles.detailText}>포인트</Text>
          <Text style={styles.detailText}>쿠 폰</Text>
        </View>
        <View style={{ alignItems: 'left' }}>
          <Text style={styles.detailText}>{user.name}</Text>
          <Text style={styles.detailemailText}>{user.email}</Text>
          <Text style={styles.detailText}>{user.point}</Text>
          <TouchableOpacity
            onPress={() => {
              setcouponModalVisible(true);
            }}
          >
            <Text style={styles.detailText}>
              보유 갯수 : {user.coupons ? user.coupons.length : 0}개
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.point}
        onPress={() => navigation.navigate('PointHistory')}
      >
        <View>
          <Text style={styles.pointText}>포인트 적립 내역 및 상점</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={changePassword}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: 'flex-end', marginStart: width * 0.65 }}
        onPress={logout}
      >
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal_view}>
          <View style={styles.modal_content}>
            <TextInput
              style={styles.textInput}
              placeholder="이름(닉네임) 변경"
              autoCapitalize="none"
              onChangeText={(newname) => setNewname(newname)}
              autoCorrect={false}
            />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.modal_button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modal_button}
                onPress={() => updateName(newname)}
              >
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={couponmodalVisible}
        onRequestClose={() => {
          setModalVisible(!couponmodalVisible);
        }}
      >
        <View style={styles.modal_view}>
          <View style={styles.modal_coupon_content}>
            <Text style={styles.detailText}>
              셔틀버스 1회 이용권 : {shuttleBusCount}개
            </Text>
            <Text style={styles.detailText}>
              코나킹 3000원 쿠폰 : {konaKingCount}개
            </Text>
            <Text style={styles.detailText}>
              CU 3000원 기프티콘 : {cuGiftCard3000Count}개
            </Text>
            <Text style={styles.detailText}>
              CU 5000원 기프티콘 : {cuGiftCard5000Count}개
            </Text>
            <TouchableOpacity
              style={styles.modal_button}
              onPress={() => setcouponModalVisible(false)}
            >
              <Text style={styles.buttonText}>확인</Text>
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
    paddingTop: height * 0.03,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: height * 0.04,
  },
  iconButtonRight: {
    padding: width * 0.03,
    position: 'absolute',
    right: width * 0.05,
  },
  userInfoSection: {
    alignItems: 'center',
    width: '100%',
    marginBottom: height * 0.04,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#A5E0CA',
    padding: width * 0.015,
    borderRadius: 8,
    marginBottom: height * 0.04,
  },
  detailText: {
    fontSize: 20,
    padding: width * 0.03,
    textAlign: 'left',
  },
  detailemailText: {
    fontSize: 17,
    padding: width * 0.03,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.015,
    textAlign: 'left',
    flexWrap: 'wrap',
  },
  point: {
    width: '90%',
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A5E0CA',
    borderRadius: 8,
    marginBottom: width * 0.02,
  },
  pointText: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: height * 0.1,
    marginStart: width * 0.55,
    paddingBottom: width * 0.05,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_content: {
    width: width * 0.95,
    height: height * 0.25,
    borderRadius: 8,
    paddingTop: width * 0.03,
    backgroundColor: '#A5E0CA',
    marginBottom: width * 0.05,
    alignItems: 'center',
    elevation: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  modal_coupon_content: {
    width: width * 0.95,
    height: height * 0.4,
    borderRadius: 8,
    paddingTop: width * 0.03,
    backgroundColor: '#A5E0CA',
    alignItems: 'center',
    elevation: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  textInput: {
    paddingTop: width * 0.055,
    paddingBottom: width * 0.03,
    width: width * 0.85,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: width * 0.03,
    textAlign: 'center',
  },
  modal_button: {
    width: width * 0.3,
    padding: width * 0.04,
    backgroundColor: '#4BB863',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: width * 0.08,
    marginHorizontal: width * 0.04,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  list: {
    width: '100%',
  },
});

export default Profile;
