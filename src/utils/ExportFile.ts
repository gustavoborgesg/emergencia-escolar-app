import * as FileSystem from 'expo-file-system';
import axios from 'axios';

//Coleta informações da emergência e envia para o servidor
export const exportEmergency = async (coords: JSON, address: JSON) => {
  
  try {   
    const response = await axios.post('http://192.168.0.2:8080/emergency', { "0": address, ...coords }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

//Coleta informações da denúncia e envia para o servidor
export const exportReport = async (text: string, uriArray: any[]) => {
  try {
    const formData = new FormData();
    // Adicionar String
    formData.append('information', text);
    for (let i = 0; i < uriArray.length; i++) {
      console.log(uriArray[i]);
      const fileUri = uriArray[i];
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const fileName = 'file' + (i + 1).toString();

      const extensionIndex = fileUri.lastIndexOf('.');
      let extension;
      if (extensionIndex !== -1 && extensionIndex !== 0 && extensionIndex !== fileUri.length - 1) {
        extension = fileUri.substring(extensionIndex);
      }

      formData.append('files', {
        uri: fileUri,
        name: fileName + extension,
        type: 'multipart/form-data',
        data: fileContent,
      });
    }

    // Envie os arquivos para o servidor usando uma chamada de API
    const response = await axios.post('http://192.168.0.2:8080/report', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Lide com a resposta do servidor
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
