import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import Profile from './src/Profile';
import GoogleMap from './src/GoogleMap';
import ShuttleSchedule from './src/ShuttleSchedule';
import TrainSchedule from './src/TrainSchedule';
import Notice from './src/Notice';

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
  );
}

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name= "Login" 
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
        headerTitle: '',
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
        headerTitle: 'KTX 시간표',
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
  </Stack.Navigator>
);

export default App;
