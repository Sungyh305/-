import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        setEmail('ghkdwlgh99@gmail.com');
        setPassword('qwe123');
    }, []);

    const loginUser = async (email, password) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (error){
            Alert.alert(
                '알림',
                `이메일이나 비밀번호가 다릅니다.\n다시 시도해주세요.`,
                [
                  {text: '확인'},
                ],
                { cancelable: false }
            );
        }
    }

    // 이메일 변경하기
    const forgetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            Alert.alert(
                '알림',
                `비밀번호를 바꿀 수 있는 메세지를 이메일로 전송하였습니다.`
              );
        }).catch((error) => {
            Alert.alert(
                '알림',
                `이메일을 정확하게 입력해주세요.`
            );
        })
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(255, 255, 255)' }}>
        <View style={styles.container}>
            <View style={{marginTop: 40}}>
                <Text style={styles.title}>  버스! 어디가?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType = "email-address"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                onPress={() => loginUser(email, password)}
                style={styles.button}
            >
                <Text style={{fontWeight: 'bold', fontSize: 22}}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {forgetPassword()}}
                style={{marginTop: 30}}
            >
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    비밀번호를 잊으셨나요?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{marginTop: 20}}
            >
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    회원 가입하기
                </Text>
            </TouchableOpacity>
        </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 50,
    },
    textInput: {
        paddingTop: 20,
        paddingBottom: 10,
        width: 300,
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },
    button: {
        marginTop: 50,
        height: 70,
        width: 250,
        backgroundColor: '#86CC57',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    }
})