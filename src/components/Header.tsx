import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Colors from '../../assets/colors/Colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import Modal from "react-native-modal";
import icon from "../../assets/images/icon.png"

export default function Header() {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.Main}>
      <Image style={{ maxWidth: 100, maxHeight: 30, }} source={icon} resizeMode={'contain'} />
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} >
        <View style={styles.Modal}>
          <Text style={styles.Title}>Sobre</Text>
          <View style={styles.Form}>
            <Text style={styles.Subtitle}>
              O aplicativo Emergência Escolar foi desenvolvido como um protótipo para o evento Hackathon Campus Party Goiás 2023.
              Seu objetivo é agilizar o contato com a polícia em casos de emergência, prevenir atentados por meio de denúncias facilitadas e
              disponibilizar recursos para auxiliar em situações críticas.</Text>
            <Text style={styles.ModalText}>Equipe</Text>
            <Text style={styles.NameText}>
              - Gustavo Borges Guimarães{'\n'}
              * Celular: (64) 9 9923-2114{'\n'}{'\n'}

              - Hugo Francisco Medeiros Barreto{'\n'}
              * Celular: (64) 9 8439-4045{'\n'}{'\n'}

              - Letícia Carvalho Clemente{'\n'}
              * Celular: (64) 9 9240-6218{'\n'}{'\n'}

              - Luciano Ferreira de Carvalho Neto{'\n'}
              * Celular: (64) 9 9916-3574
            </Text>

            <TouchableOpacity style={styles.ModalCloseButton} onPress={toggleModal} >
              <Text style={styles.ModalCloseText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={toggleModal} style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather name="info" size={20} color={Colors.primary} />
        <Text style={styles.HeaderText}>Sobre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Main: {
    width: '100%',
    marginTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.8,
    borderColor: Colors.details,
  },
  HeaderText: {
    color: Colors.primary,
    fontSize: 18,
    marginLeft: 2,
  },
  Modal: {
    height: "70%",
    width: "97.5%",
    backgroundColor: Colors.white,
    alignSelf: "center",
    padding: 5,
  },
  Form: {
    flex: 1,
    width: "100%",
    marginTop: 0,
  },
  Title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
    alignSelf: "center"
  },
  Subtitle: {
    fontSize: 16,
    color: Colors.details,
    marginBottom: 10,
    textAlign: "justify",
    paddingHorizontal: 5,
  },
  ModalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  NameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.details,
    marginBottom: 8,
  },
  ModalCloseButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    alignSelf: "center",
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 2,
    shadowRadius: 1,
    elevation: 5,
  },
  ModalCloseText: {
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
  }
});
