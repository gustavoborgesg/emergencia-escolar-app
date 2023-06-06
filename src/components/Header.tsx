import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../assets/colors/Colors';
import { Feather } from '@expo/vector-icons';

export default function Header() {
  return (
    <View style={styles.Main}>
      <Text style={styles.Text}>NomeApp/Icone</Text>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather name="info" size={20} color={Colors.details} />
        <Text style={styles.Text}>Sobre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    marginTop: 5,
    paddingBottom: 5,
    width: '100%',
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderColor: Colors.primary,
  },
  Text: {
    color: Colors.details,
    fontSize: 20,
    marginLeft: 2,
  }
});
