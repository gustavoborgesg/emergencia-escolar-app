import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import Colors from '../colors/Colors';

export default StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  }
});