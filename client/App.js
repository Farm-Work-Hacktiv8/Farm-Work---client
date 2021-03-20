import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from "./src/store/index"
import Auth from './src/pages/Auth'
import HomePage from './src/pages/HomePage'
import DetailFieldPage from "./src/pages/DetailFieldPage"
import DetailPlantPage from "./src/pages/DetailPlantPage"

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="DetailFieldPage" component={DetailFieldPage} />
            <Stack.Screen name="DetailPlantPage" component={DetailPlantPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
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
