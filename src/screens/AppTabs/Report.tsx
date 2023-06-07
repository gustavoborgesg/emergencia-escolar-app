import { StyleSheet, View, Text, Keyboard, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { exportFiles } from '../../components/ExportFile';

export default function Report() {

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Denúncia Realizada',
      text2: 'Denúncia enviada às autoridades locais...',
      visibilityTime: 6000,
    });
  }

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: 'Falha ao obter localização',
      text2: 'Favor permitir o acesso à sua localização para conseguir utilizar o app...',
      visibilityTime: 6000,
    });
  }

  const [error, setError] = useState("");

  const [bodyText, setBodyText] = useState("");
  const [file, setFile]: any = useState(null);
  const [imagesAndVideos, setImagesAndVideos]: any = useState(null);

  const handleOnChange = (text: any) => {
    setBodyText(text);
  };

  const handleConfirmSend = () => {
    Alert.alert(
      'CONFIRMAÇÃO',
      'Você tem certeza que deseja enviar a denúncia?',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            exportFiles(bodyText, uriArray);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
    );
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!bodyText && !file && !imagesAndVideos) {
      setError("Nenhuma informação inserida!")
      isValid = false;
    }

    if (isValid) {
      handleConfirmSend();
    }
  }

  const [uriArray, setUriArray]: any = useState([]);

  const selectImagesAndVideos = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        orderedSelection: true,
        selectionLimit: 10,
      });
      if (!result.canceled) {
        setImagesAndVideos(result.assets);
        result.assets?.forEach((asset: { uri: any; }) => {
          setUriArray([...uriArray, asset.uri]);          
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const selectFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({});
      if (file.type === 'success') {
        setFile(file);
        await setUriArray([...uriArray, file.uri]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const clean = () => {
    setImagesAndVideos(null);
    setBodyText("");
    setFile(null);
    setError("")
  }

  return (
    <ScrollView contentContainerStyle={styles.Main}>
      <KeyboardAvoidingView style={{ alignItems: "center", width: "100%", height: "100%" }} behavior='height'>
        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
          <Header />
          <Text style={styles.Title}>REALIZAR DENÚNCIA</Text>
          <Text style={styles.Subtitle}>Insira toda informação que possam ser relevantes...</Text>
          <View style={styles.Form}>
            <CustomTextInput
              placeholder={"Informações... (Limite: 1000 caracteres)"}
              maxLength={1000}
              value={bodyText}
              error={error}
              onChangeText={(text: any) => handleOnChange(text)}
              onFocus={() => setError("")}
              returnKeyType="next"
            />
            <View style={{ flex: 1, justifyContent: "center", marginBottom: 30, gap: 30 }}>
              <View>
                <CustomButton
                  text={imagesAndVideos == null ? "Selecionar Imagens e Vídeos" : imagesAndVideos.length === 1 ? imagesAndVideos.length + " Arquivo Selecionado" : imagesAndVideos.length + " Arquivos Selecionados"}
                  textColor={Colors.primary}
                  backgroundColor={Colors.white}
                  onPress={() => selectImagesAndVideos()}
                />
                <Text style={styles.Text}>Limite: 10 fotos/vídeos (.mp4, png, jpg...)</Text>
              </View>
              <View>
                <CustomButton
                  text={file == null ? "Selecionar Arquivo" : file.name.length >= 20 ? file.name.substring(0, 17).concat("...") : file.name}
                  textColor={Colors.primary}
                  backgroundColor={Colors.white}
                  onPress={() => selectFile()}
                />
                <Text style={styles.Text}>Limite: 1 arquivo (qualquer extensão)</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", width: "80%" }}>
              <CustomButton
                text={"Enviar"}
                textColor={Colors.green}
                backgroundColor={Colors.white}
                onPress={() => validate()}
              />
              <CustomButton
                text={"Limpar"}
                textColor={Colors.red}
                backgroundColor={Colors.white}
                onPress={() => clean()}
              />
            </View>
            <Text style={styles.Warning}>Utilize apenas em casos reais de suspeita!</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Main: {
    flexGrow: 1,
    paddingHorizontal: "2.5%",
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  Form: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  Title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 10,
  },
  Subtitle: {
    fontSize: 16,
    color: Colors.details,
  },
  Warning: {
    fontSize: 15,
    color: Colors.red,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 10,
    borderColor: Colors.red,
  },
  Text: {
    color: "#000",
    fontSize: 14,
    paddingTop: 3,
  },
});
