import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../../assets/colors/Colors';

const EmergencyButton = ({ handlePressIn = () => { }, handlePressOut = () => { }, isPressed, isPressedFinished, borderColor, ...props }: any) => {

  return (
    <TouchableOpacity
      style={[styles.EmergencyButton, isPressed && { borderColor: borderColor }, isPressedFinished && { borderColor: Colors.primary }]}
      activeOpacity={0.5}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Text style={styles.EmergencyText}>EMERGÊNCIA</Text>
      <MaterialCommunityIcons name="gesture-tap-hold" size={35} color="red" />
    </TouchableOpacity >
  );
};

export default EmergencyButton;

const styles = StyleSheet.create({
  EmergencyButton: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#fff",
    height: 300,
    width: 300,
    borderColor: "#d6d6d6",
    borderWidth: 5,
    borderRadius: 300,
    overflow: 'hidden'
  },
  PressedEmergencyButton: {
    borderColor: Colors.red,
  },
  EmergencyText: {
    color: Colors.red,
    fontSize: 40,
    fontWeight: "bold",
  },
});