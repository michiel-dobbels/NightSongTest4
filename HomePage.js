
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';

export default function HomePage() {
  const navigation = useNavigation();
  const { profile, signOut } = useAuth();

  // Block access if no user is logged in
  useEffect(() => {
    if (!profile) {
      navigation.navigate('Auth');
    }
  }, [profile]);

  const displayName = profile?.display_name || profile?.username;


  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {displayName ? `Welcome @${displayName}` : 'Welcome'}

      </Text>

      <Button
        title="Go to For You"
        onPress={() => navigation.navigate('HomeScreen')}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Sign Out"
        onPress={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#061e45',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
  },
});
