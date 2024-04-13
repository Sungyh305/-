import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from "./src/Login";
import Registration from "./src/Registration";
import Dashboard from "./src/Dashboard";
import Home from "./src/Home";
import Header from "./components/Header";

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  
  // headerMode="none" 과 mode="modal"이 더 이상 사용되지 않아서 디음과 같이 수정했습니다.
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
        {!user ? (
          <RootStack.Screen
            name="Auth"
            component={AuthStackScreen}
          />
        ) : (
          <RootStack.Screen
            name="App"
            component={AppStackScreen}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerTitle: () => <Header name="Login" />,
        headerStyle: {
          height: 150,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: '#00e4d0',
          shadowColor: '#000',
          elevation: 25
        }
      }}
    />
    <Stack.Screen
      name="Registration"
      component={Registration}
      options={{
        headerTitle: () => <Header name="Registration" />,
        headerStyle: {
          height: 150,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: '#00e4d0',
          shadowColor: '#000',
          elevation: 25
        }
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
        headerTitle: () => <Header name="Dashboard" />,
        headerStyle: {
          height: 150,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: '#00e4d0',
          shadowColor: '#000',
          elevation: 25
        }
      }}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: () => <Header name="Home" />,
        headerStyle: {
          height: 150,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: '#00e4d0',
          shadowColor: '#000',
          elevation: 25
        }
      }}
    />
  </Stack.Navigator>
);

export default App;