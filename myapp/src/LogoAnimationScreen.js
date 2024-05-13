// LogoAnimationScreen.js

import React, { useEffect, useRef } from 'react';
import { Animated, View, Text } from 'react-native';

const LogoAnimationScreen = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 2, // 확대 비율
      duration: 1000, // 애니메이션 지속 시간 (밀리초)
      useNativeDriver: true,
    }).start(() => {
      // 애니메이션이 완료되면 다음 페이지로 이동
      navigation.navigate('Login.js');
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Image
        source={require('./logo.png')}
        style={{ width: 100, height: 100, transform: [{ scale: logoScale }] }}
      />
      <Text>Loading...</Text>
    </View>
  );
};

export default LogoAnimationScreen;
