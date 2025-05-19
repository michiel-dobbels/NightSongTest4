import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from './AuthPage';
import TopTabsNavigator from './app/TopTabsNavigator';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthPage} />
      <Stack.Screen name="Tabs" component={TopTabsNavigator} />
    </Stack.Navigator>
  );
}
