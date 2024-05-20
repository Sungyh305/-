import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from './src/Login';
import Registration from './src/Registration';
import Dashboard from './src/Dashboard';
import GoogleMap from './src/GoogleMap';

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
    <Stack.Screen name= "Login" component={Login} />
    <Stack.Screen name="Registration" component={Registration} />
  </Stack.Navigator>
);

const AppStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="GoogleMap" component={GoogleMap} />
  </Stack.Navigator>
);

export default App;
