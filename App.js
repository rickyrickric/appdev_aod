import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudentRegistrationForm from './StudentRegistrationForm';
import SummaryScreen from './SummaryScreen';
import ProfileScreen from './ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Registration"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F7F2FA' },
          }}
        >
          <Stack.Screen name="Registration" component={StudentRegistrationForm} />
          <Stack.Screen name="Summary" component={SummaryScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
