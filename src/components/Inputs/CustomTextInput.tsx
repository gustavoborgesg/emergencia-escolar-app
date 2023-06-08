import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../../assets/colors/Colors';

const CustomTextInput = ({ error, onFocus = () => { }, inputRef, ...props }: any) => {

  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ height: "100%", flex: 1 }}>
      <View
        style={[
          styles.InputContainer,
          {
            borderColor: error
              ? Colors.red
              : isFocus
                ? Colors.primary
                : Colors.details,
          },
        ]}>
        <TextInput
          multiline
          textAlignVertical="top"
          style={styles.InputText}
          onFocus={() => {
            onFocus();
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
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
  InputContainer: {
    flex: 1,
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
    width: "100%",
    height: "100%",
  },
  ErrorText: {
    fontWeight: "bold",
    paddingTop: 4,
    fontSize: 14,
    alignSelf: "flex-end",
    color: "red",
  }
});