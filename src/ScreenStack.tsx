import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppTabView from './screens/AppTabView';
import Emergency from './screens/AppTabs/Emergency';
import Report from './screens/AppTabs/Report';
import Protocols from './screens/AppTabs/Protocols';

const Stack = createNativeStackNavigator();

export default function ScreenStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AppTabView" component={AppTabView} />
        <Stack.Screen name="Emergency" component={Emergency} />
        <Stack.Screen name="Report" component={Report} />
        <Stack.Screen name="Protocols" component={Protocols} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
