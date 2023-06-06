import React from 'react';
import { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import Colors from '../../assets/colors/Colors';

const CustomTextInput = ({ label, error, onFocus = () => { }, inputRef, ...props }: any) => {



  return (
    <View style={{}}>
      <Text style={styles.Label}>{label}</Text>
      <View
        style={[
          styles.InputContainer,
          {
            borderColor: error ? Colors.red : Colors.details,
          },
        ]}>
        <TextInput
          style={styles.InputText}
          onFocus={onFocus}
          ref={inputRef}
          {...props}
        />
      </View>
      {error && (
        <Text style={styles.ErrorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  Label: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.black,
    marginBottom: 5,
  },
  InputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 5,
  },
  InputText: {
    color: Colors.black,
    fontSize: 18,
    width: "100%"
  },
  ErrorText: {
    fontWeight: "bold",
    marginTop: 2,
    fontSize: 12,
    alignSelf: "flex-end",
    color: "red",
  }
});