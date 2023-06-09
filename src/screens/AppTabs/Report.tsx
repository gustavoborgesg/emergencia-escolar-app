import { StyleSheet, View, Text, Keyboard, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Header from '../../components/Header';
import Colors from '../../../assets/colors/Colors';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import CustomTextInput from '../../components/Inputs/CustomTextInput';
import CustomButton from '../../components/Buttons/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { exportReport } from '../../utils/ExportFile';

export default function Report() {

  useEffect(() => {
    clean();
  }, []);

  const showToastReportSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Denúncia realizada',
      text2: 'Denúncia enviada às autoridades locais',
      visibilityTime: 6000,
    });
  }

  const showToastReportCanceled = () => {
    Toast.show({
      type: 'error',
      text1: 'Denúncia cancelada',
      text2: 'A denúncia foi cancelada',
      visibilityTime: 5000,
    });
  }

  const showToastReportError = (error: unknown) => {
    Toast.show({
      type: 'error',
      text1: 'Denúncia não realizada',
      text2: 'A denúncia não foi realizada devido ao erro: ' + "\n" + error,
      visibilityTime: 5000,
    });
  }

  const [bodyText, setBodyText] = useState("");
  const [imagesAndVideos, setImagesAndVideos]: any = useState(null);
  const [error, setError] = useState("");

  const [uriArray, setUriArray] = useState<string[]>([]);

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
            try {
              exportReport(bodyText, uriArray);
              showToastReportSuccess();
            } catch (error) {
              showToastReportError(error);
            }
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            showToastReportCanceled();
          }
        },
      ],
    );
  };

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
        result.assets?.forEach(async (asset: { uri: any; }) => {
          await setUriArray(prevArray => [...prevArray, asset.uri]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!bodyText && !imagesAndVideos) {
      setError("Nenhuma informação inserida!")
      isValid = false;
    }

    if (isValid) {
      handleConfirmSend();
    }
  }

  const clean = () => {
    setImagesAndVideos(null);
    setBodyText("");
    setError("")
    setUriArray([]);
  }

  return (
    <ScrollView contentContainerStyle={styles.Main}>
      <KeyboardAvoidingView style={{ alignItems: "center", width: "100%", height: "100%" }} behavior='height'>
        <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
          <Header />
          <Text style={styles.Title}>REALIZAR DENÚNCIA</Text>
          <Text style={styles.Subtitle}>Insira as informações relevantes para realizar a denúncia</Text>
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
                <Text style={styles.Text}>Limite: 10 fotos/vídeos (.mp4, .png, .jpg, ...)</Text>
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
            <Text style={styles.Warning}>Use apenas em suspeitas reais!</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 10,
  },
  Subtitle: {
    fontSize: 16,
    color: Colors.details,
  },
  Warning: {
    fontSize: 20,
    color: Colors.red,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 10,
    borderColor: Colors.red,
  },
  Text: {
    color: Colors.black,
    fontSize: 14,
    paddingTop: 3,
  },
});
