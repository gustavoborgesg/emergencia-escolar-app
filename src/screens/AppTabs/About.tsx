import { StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";

export default function About(isVisible: any) {
  return (
    <View style={styles.Main}>
      <Modal isVisible={isVisible}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    paddingHorizontal: "2.5%",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  Text: {
    width: "100%",
    color: "#000",
    fontSize: 30,
  }
});
