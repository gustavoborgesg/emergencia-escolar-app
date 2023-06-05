import React from "react";
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlobalStyles from './assets/styles/GlobalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppTabView from './src/screens/AppTabView';
import Emergency from './src/screens/AppTabs/Emergency';
import Report from './src/screens/AppTabs/Report';
import Protocols from './src/screens/AppTabs/Protocols';
const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <SafeAreaView style={GlobalStyles.SafeArea}>
      <StatusBar style="auto" networkActivityIndicatorVisible animated translucent backgroundColor="lightblue" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='AppTabView'>
          <Stack.Screen options={{ headerShown: false }} name="AppTabView" component={AppTabView} />
          <Stack.Screen options={{ headerShown: false }} name="Emergency" component={Emergency} />
          <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
          <Stack.Screen options={{ headerShown: false }} name="Protocols" component={Protocols} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>

  );
}

export default App;