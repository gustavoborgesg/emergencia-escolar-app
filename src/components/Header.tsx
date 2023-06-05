import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../assets/colors/Colors';

export default function Header() {
  return (
    <View style={styles.Main}>
      <Text style={styles.Text}>NomeApp/Icone</Text>
      <Text style={styles.Text}>Sobre</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    width: '100%',
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: Colors.black,
  },
  Text: {
    color: "#000",
    fontSize: 20,
  }
});
