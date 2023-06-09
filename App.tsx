import React from "react";
import { SafeAreaView, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GlobalStyles from './assets/styles/GlobalStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import endPrototype from "./assets/images/endprototype.png";
const currentDate = moment();
const lockedDate = moment('2023-06-11');

import AppTabView from './src/screens/AppTabView';
import Emergency from './src/screens/AppTabs/Emergency';
import Report from './src/screens/AppTabs/Report';
import Protocols from './src/screens/AppTabs/Protocols';
import Colors from "./assets/colors/Colors";
const Stack = createNativeStackNavigator();

const App = () => {

  if (currentDate.isBefore(lockedDate)) {
    return (
      <>
        <SafeAreaView style={GlobalStyles.SafeArea}>
          <StatusBar style="light" networkActivityIndicatorVisible animated translucent backgroundColor={Colors.primary} />
          <NavigationContainer>
            <Stack.Navigator initialRouteName='AppTabView'>
              <Stack.Screen options={{ headerShown: false }} name="AppTabView" component={AppTabView} />
              <Stack.Screen options={{ headerShown: false }} name="Emergency" component={Emergency} />
              <Stack.Screen options={{ headerShown: false }} name="Report" component={Report} />
              <Stack.Screen options={{ headerShown: false }} name="Protocols" component={Protocols} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        <Toast />
      </>
    );
  }
  else {
    return (
      <Image style={{ width: "100%", height: "100%" }} source={endPrototype} resizeMode="contain" />
    )
  }
}

export default App;