import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Colors from '../../assets/colors/Colors';

const CustomButton = ({ text, textColor, backgroundColor, onPress = () => { } }: any) => {

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.Button,
        {
          backgroundColor: backgroundColor,
          borderColor: textColor,
          shadowColor: textColor,
        },
      ]}>
      <Text style={[
        styles.Text,
        {
          color: textColor,
        },
      ]}>
        {text}
      </Text>
    </TouchableOpacity >
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  Button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 1,
    elevation: 5,
    borderWidth: 0.5,
  },
  Text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});