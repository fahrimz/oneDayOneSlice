import React from 'react';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import {RootPath, RootStackList} from './paths';
import {Day1, Day2, Home ,Day3 ,Day4 ,Day5} from '../screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export const rootNavRef = createNavigationContainerRef<RootStackList>();
const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer ref={rootNavRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationTypeForReplace: 'push',
          animation: 'slide_from_bottom',
        }}
        initialRouteName={RootPath.Home}>
        <Stack.Screen name={RootPath.Home} component={Home} />
        <Stack.Screen name={RootPath.Day1} component={Day1} />
        <Stack.Screen name={RootPath.Day2} component={Day2} />
        <Stack.Screen name={RootPath.Day3} component={Day3} />
        <Stack.Screen name={RootPath.Day4} component={Day4} />
        <Stack.Screen name={RootPath.Day5} component={Day5} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
