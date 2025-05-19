import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import { SafeAreaView, StatusBar } from 'react-native';
import { useAuth } from '../AuthContext';
import HomeScreen from './screens/HomeScreen';

function ForYouScreen() {
  return <HomeScreen />;
}

function FollowingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#1d152b', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>Following Content</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TopTabsNavigator() {

  const { profile, user } = useAuth() as any;

  const displayName = profile?.display_name || profile?.username;

  // Determine if we're still loading the profile or user
  const welcomeText = displayName
    ? `Welcome @${displayName}`
    : user?.email
    ? `Welcome ${user.email}`
    : 'Welcome';


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1d152b' }}>
      <StatusBar barStyle="light-content" backgroundColor="#1d152b" />
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 10 }}>
        {welcomeText}
      </Text>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#1d152b',
            marginTop: 65,
          },
          tabBarLabelStyle: {
            color: 'white',
            fontWeight: 'bold',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#7814db',
          },
        }}
      >
        <Tab.Screen name="For you" component={ForYouScreen} />
        <Tab.Screen name="Following" component={FollowingScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
