import * as React from 'react';
import { View, useWindowDimensions, Text, Image } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Emergency from './AppTabs/Emergency';
import Report from './AppTabs/Report';
import Protocols from './AppTabs/Protocols';
import About from './AppTabs/About';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../../assets/colors/Colors';

const renderScene = SceneMap({
  first: Emergency,
  second: Report,
  third: Protocols,
  //fourth: About,
});

export default function AppTabView() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Emergência', icon: "car-emergency" },
    { key: 'second', title: 'Denúncia', icon: "police-badge-outline" },
    { key: 'third', title: 'Protocolos', icon: "bookshelf" },
    //{ key: 'fourth', title: 'Sobre' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.details }}
      style={{ backgroundColor: Colors.white }}
      renderLabel={({ route }: any) => (
        <Text style={{ color: Colors.primary, fontSize: 15, fontWeight: "bold" }}>
          {route.title}
        </Text>
      )}
      renderIcon={({ route }: any) => (
        <MaterialCommunityIcons name={route.icon} size={25} color={Colors.primary} />
      )}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition={"bottom"}
    />
  );
}