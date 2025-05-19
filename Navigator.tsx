import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthPage from './AuthPage';
import TopTabsNavigator from './app/TopTabsNavigator';
import { useAuth } from './AuthContext';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Tabs" component={TopTabsNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthPage} />
      )}
    </Stack.Navigator>
  );
}
