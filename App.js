import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { IdentifierContext, IdentifierProvider } from './src/IdentifierContext';

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Profile from './src/Profile';
import GoogleMap from './src/GoogleMap';
import ShuttleSchedule from './src/ShuttleSchedule';
import TrainSchedule from './src/TrainSchedule';
import Notice from './src/Notice';
import PointHistory from './src/PointHistory';
import BusSchedule from './src/BusSchedule';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <IdentifierProvider>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ presentation: 'modal', headerShown: false }}
        >
          {!user ? (
            <RootStack.Screen name="Auth" component={AuthStackScreen} />
          ) : (
            <RootStack.Screen name="App" component={AppStackScreen} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </IdentifierProvider>
  );
}

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerLeft: () => null, // 헤더 뒤로가기 버튼 제거
        headerTitle: '',
      }}
    />
    <Stack.Screen
      name="Registration"
      component={Registration}
      options={{
        headerTitleAlign: 'center',
        headerTitle: '회원가입',
      }}
    />
  </Stack.Navigator>
);

const AppStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        headerTitle: '',
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerTitle: '',
      }}
    />
    <Stack.Screen
      name="GoogleMap"
      component={GoogleMap}
      options={{
        headerTitle: (props) => <MapHeaderTitle {...props} />,
      }}
    />
    <Stack.Screen
      name="ShuttleSchedule"
      component={ShuttleSchedule}
      options={{
        headerTitle: '셔틀 버스 시간표',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="TrainSchedule"
      component={TrainSchedule}
      options={{
        headerTitle: '기차 시간표',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="BusSchedule"
      component={BusSchedule}
      options={{
        headerTitle: '버스 시간표',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="Notice"
      component={Notice}
      options={{
        headerTitleAlign: 'center',
        headerTitle: '공지사항',
      }}
    />
    <Stack.Screen
      name="PointHistory"
      component={PointHistory}
      options={{
        headerTitleAlign: 'center',
        headerTitle: '',
      }}
    />
  </Stack.Navigator>
);

function MapHeaderTitle() {
  const { selectedIdentifier, setSelectedIdentifier } =
    React.useContext(IdentifierContext);

  return (
    <View style={styles.header}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedIdentifier}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedIdentifier(itemValue)}
        >
          <Picker.Item label="천안아산역" value="1" />
          <Picker.Item label="천안역" value="2" />
          <Picker.Item label="천안터미널" value="3" />
          <Picker.Item label="공동운행(천안역, 천안아산역)" value="4" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    width: 300,
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 170,
  },
});

export default App;
