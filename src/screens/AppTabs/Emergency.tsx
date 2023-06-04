import { StyleSheet, Text, View } from 'react-native';

export default function Emergency() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Text style={styles.Text}>Teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Text: {
    color: "#000",
    fontSize: 50,
  }
});
