import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, PixelRatio, FlatList, Image, Modal, Alert } from 'react-native';
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const PointHistory = () => {
    const [user, setUser] = useState(''); // 사용자 정보 상태
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible0, setModalVisible0] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const [couponname, setCouponName] = useState("");
    const [couponprice, setCouponPrice] = useState("");
    const navigation = useNavigation();
    const [selectedIndex, setSelectedIndex] = useState(0); // 텍스트 클릭 시 이벤트
    const [pointLogs, setPointLogs] = useState([]); // 포인트 로그 상태
    const shopItems = [
        { id: '1', name: '셔틀버스 1회 이용권', price: 1000, imageUri: require('../assets/1000won.png') },
        { id: '2', name: '코나킹 3000원 쿠폰', price: 3000, imageUri: require('../assets/konaking.png') },
        { id: '3', name: 'CU 3000원 기프티콘', price: 3000, imageUri: require('../assets/CU.png') },
        { id: '4', name: 'CU 5000원 기프티콘', price: 5000, imageUri: require('../assets/CU.png') },
        // 추가 상품 정보를 입력하세요.
    ];
    // 상점 리스트
    const ShopItem = ({ name, price, imageUri, onPress }) => {
        return (
            <TouchableOpacity onPress={onPress} style={styles.shopitem}>
                <Image source={imageUri} style={styles.image} />
                <View style={styles.shopitemtext}>
                    <Text style={styles.pointstext}>{name}</Text>
                    <Text style={styles.pointstext}>{price} P</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // 사용자 데이터 가져오기
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userDoc = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get();
            if (userDoc.exists) {
              setUser(userDoc.data());

              // 포인트 로그 하위 컬렉션 가져오기
              const pointLogsCollection = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).collection('pointLogs').get();
              const pointLogsData = pointLogsCollection.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              setPointLogs(pointLogsData);
            } else {
              console.log('User does not exist');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
    }, []);

    // 쿠폰 구매 함수
    const buyCoupon = async () => {
        try {
            // 현재 사용자의 UID 가져오기
            const currentUserUID = firebase.auth().currentUser.uid;

            // 사용자 문서 참조
            const userDocRef = firebase.firestore().collection('users').doc(currentUserUID);

            // 현재 쿠폰 배열 가져오기
            let currentCoupons = [];
            const userDoc = await userDocRef.get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                currentCoupons = userData.coupons || [];
            }

            // 새로운 쿠폰 배열에 현재 쿠폰 추가
            const updatedCoupons = [...currentCoupons, couponname];

            // 사용자 문서 업데이트
            await userDocRef.update({
                coupons: updatedCoupons,
                point: user.point - couponprice
            });

            const pointLogsRef = userDocRef.collection('pointLogs').doc();
            const buycoupon = couponname + " 구매";
            const pointsUsed = -couponprice + ' P';
            await pointLogsRef.set({
                date: new Date,
                content: buycoupon,
                points: pointsUsed,
            });

            Alert.alert('알림', '쿠폰을 구매하였습니다.', [
                {
                    text: '확인',
                    onPress: () => { navigation.navigate('Profile', { couponname }) },
                }
            ]);
            setModalVisible(false)
        } catch (error) {
            console.error('쿠폰을 구매하는 동안 오류가 발생했습니다:', error);
        }
    };

    const modalText = (id, name, price) => {
        if(id == '1') {
            setDisplayText(name + "을 구매하시겠습니까?");
        } else if(id == '2') {
            setDisplayText(name + "을 구매하시겠습니까?");
        } else if(id == '3') {
            setDisplayText(name + "을 구매하시겠습니까?");
        } else if(id == '4') {
            setDisplayText(name + "을 구매하시겠습니까?");
        }
        setCouponName(name);
        setCouponPrice(price);
    }

    // 텍스트 선택 시 이벤트 출력
    const renderBodyContent = () => {
        if (selectedIndex === 0) {
            // 시간 순서대로 정렬된 pointLogs 배열 생성
            const sortedPointLogs = pointLogs.slice().sort((a, b) => b.date.seconds - a.date.seconds);

            return (
                <FlatList
                data={sortedPointLogs}
                renderItem={({ item }) => (
                  <View style={styles.pointlogs}>
                    <Text style={styles.pointstext}>날   짜  :  {new Date(item.date.seconds * 1000).toLocaleDateString()} {new Date(item.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    <Text style={styles.pointstext}>내   용  :  {item.content}</Text>
                    <Text style={styles.pointstext}>적립 포인트  :  {item.points}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatList}
                />
            )
        } else if (selectedIndex === 1) {
            return (
                <FlatList
                data={shopItems}
                renderItem={({ item }) => (
                <ShopItem
                name={item.name}
                price={item.price}
                imageUri={item.imageUri}
                onPress={() => {
                    if(item.price < user.point) {
                        modalText(item.id, item.name, item.price);
                        setModalVisible(true)
                    } else {
                        setModalVisible0(true)
                    }
                }}
                />)}
                keyExtractor={(item) => item.id}
                />
            )
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.middleview}>
                    <Text style = {styles.headertext1}>포인트</Text>
                    <Text style = {styles.headertext4}>{user.point} P</Text>
                </View>
                <View style={styles.middleview}>
                <TouchableOpacity onPress={() => setSelectedIndex(0)}>
                    <Text style = {[styles.headertext2, selectedIndex === 0 && styles.headertext3]}>포인트 적립 내역</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelectedIndex(1)}>
                    <Text style = {[styles.headertext2, selectedIndex === 1 && styles.headertext3]}>포인트 상점</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.body}>
                {renderBodyContent()}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modal_view}>
                    <View style={styles.modal_content}>
                    <Text style={styles.modal_text}>{displayText}</Text>
                    <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.button_text}>아니오</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => buyCoupon()}
                    >
                        <Text style={styles.button_text}>예</Text>
                    </TouchableOpacity>
                    </View>
                    
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible0}
                onRequestClose={() => {
                    setModalVisible0(!modalVisible0);
                }}>
                <View style={styles.modal_view}>
                    <View style={styles.modal_content}>
                    <Text style={styles.modal_text}>보유하신 포인트가 부족합니다.</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible0(false)}
                    >
                        <Text style={styles.button_text}>확인</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
    },
    header: {
        width: width * 0.95,
        height: height * 0.2,
        borderRadius: 8,
        alignItems: 'center',
        padding: width * 0.035,
        backgroundColor: '#A5E0CA',
    },
    middleview: {
        flexDirection: 'row',
        marginBottom: height * 0.015,
    },
    headertext1: {
        fontSize: PixelRatio.get() * 8,
        padding: width * 0.035,
        marginRight: height * 0.06,
    },
    headertext2: {
        fontSize: PixelRatio.get() * 7.5,
        padding: width * 0.035,
    },
    headertext3: {
        fontWeight: 'bold',
    },
    headertext4: {
        fontSize: PixelRatio.get() * 7.5,
        padding: width * 0.03,
        paddingTop: width * 0.04,
    },
    body: {
        width: width * 0.95,
        height: height * 0.7,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: height * 0.012,
        padding: width * 0.03,
        backgroundColor: '#A5E0CA',
    },
    flatList: {
        width: '100%',
    },
    bodytext: {
        fontSize: PixelRatio.get() * 7,
        padding: width * 0.035,
    },
    pointstext: {
        fontSize: PixelRatio.get() * 7,
        padding: width * 0.03,
    },
    pointlogs: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#000000',
    },
    shopitem: {
        width: width * 0.9,
        borderBottomWidth: 1,
        borderColor: '#000000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: width * 0.25,
        height: width * 0.3,
        resizeMode: 'contain',
    },
    shopitemtext: {
        alignItems: 'center',
        marginLeft: width * 0.07,
    },
    modal_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_content: {
        width: width * 0.8,
        borderRadius: 8,
        paddingTop: 10,
        backgroundColor: '#86CC57',
        marginBottom: 20,
        alignItems: 'center',
        elevation: 5,
        borderColor: 'black',
        borderWidth: 0.5,
    },
    modal_text: {
        textAlign: 'center',
        fontSize: PixelRatio.get() * 7.5,
        padding: width * 0.03,
        marginBottom: 20,
    },
    button: {
        width: width * 0.3,
        backgroundColor: '#4BB863',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
        borderColor: 'black',
        borderWidth: 0.5,
        marginHorizontal: 10,
    },
    button_text: {
        textAlign: 'center',
        fontSize: PixelRatio.get() * 7,
        padding: width * 0.035,
    },
})

export default PointHistory;