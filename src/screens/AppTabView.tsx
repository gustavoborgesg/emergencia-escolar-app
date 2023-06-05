import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Emergency from './AppTabs/Emergency';
import Report from './AppTabs/Report';
import Protocols from './AppTabs/Protocols';
import About from './AppTabs/About';

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
    { key: 'first', title: 'Emergência' },
    { key: 'second', title: 'Denúncia' },
    { key: 'third', title: 'Protocolos' },
    //{ key: 'fourth', title: 'Sobre' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition={"bottom"}
    />
  );
}