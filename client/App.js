import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Auth from './src/pages/Auth'
import HomePage from './src/pages/HomePage'
import DetailFieldPage from "./src/pages/DetailFieldPage"

const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={Auth} />
          {/* <Stack.Screen name="HomePage" component={HomePage} /> */}
          {/* <Stack.Screen name="Detail Field" component={DetailFieldPage} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
