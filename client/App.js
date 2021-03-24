import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import store from "./src/store/index"
import Auth from './src/pages/Auth'
import HomePage from './src/pages/HomePage'
import DetailFieldPage from "./src/pages/DetailFieldPage"
import LandingPage from "./src/pages/LandingPage"

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#22223b',
    accent: '#dcdcdc',
  },
};

export default function App() {
  return (
    <>
    <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "white" translucent = {true}/>
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingPage" screenOptions={{ headerShown: false }} >
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="DetailFieldPage" component={DetailFieldPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
    </>
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
