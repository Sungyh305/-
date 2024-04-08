import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const Dashboard = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')

    // change the passowrd
    const changePassword = () => {
        firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
        .then(() => {
            alert("Password reset email sent")
        }).catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        firebase.firestore().collection('users')
        .doc(firebase.auth().currentUser.uid).get()
        .then((snapshot) => {
            if(snapshot.exists){
                setName(snapshot.data())
            }
            else {
                console.log('User does not exist')
            }
        })
    }, [])

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {{fontSize:20, fontWeight: 'bold'}}>
                Hello, {name.firstName}
            </Text>
            <TouchableOpacity
                onPress = {() => {changePassword()}}
                style = {styles.button}
            >
                <Text style = {{fontSize:22, fontWeight: 'bold'}}>
                    Change Password
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style = {styles.button}
            >
                <Text style = {{fontSize:22, fontWeight: 'bold'}}>
                    Go to Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress = {() => {firebase.auth().signOut()}}
                style = {styles.button}
            >
                <Text style = {{fontSize:22, fontWeight: 'bold'}}>
                    Sign out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Dashboard

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
        backgroundColor: '#026efd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    }
})