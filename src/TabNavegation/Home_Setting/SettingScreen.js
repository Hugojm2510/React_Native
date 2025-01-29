import { View, Text, StyleSheet, Pressable, TextInput, Alert, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
const auth = getAuth();
const user = auth.currentUser;


export function SettingScreen() {

  const [imageUri, setImageUri] = useState(null); // Guarda la URI de la imagen seleccionada
  const [titulo, setTitulo] = useState('');
  const [comentario, setComentario] = useState('');
  const [user, setUser] = useState(null); // Estado para guardar el usuario autenticado


  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      Alert.alert('Error', 'El usuario no está autenticado. Inicia sesión nuevamente.');
      return;
    }

    setUser(currentUser); // Guarda el usuario autenticado
  }, []);

  // Función para seleccionar imagen desde galería o cámara
  const handleSelectImage = async () => {
    Alert.alert(
      'Seleccionar imagen',
      'Elige cómo quieres cargar la imagen',
      [
        {
          text: 'Cámara',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) setImageUri(result.assets[0].uri);
          },
        },
        {
          text: 'Galería',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.canceled) setImageUri(result.assets[0].uri);
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  // Función para subir imagen a Cloudinary
  const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    const fileExtension = imageUri.split('.').pop()
    data.append('file', {
      uri: imageUri,
      type: `image/${fileExtension}`,
      name: `photo.${fileExtension}`,
    });
    data.append('upload_preset', 'Tarea_01');                         // Cambia esto por tu preset de Cloudinary
    data.append('cloud_name', 'diwp42ua0');                                 // Cambia esto por tu cloud name de Cloudinary


    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/diwp42ua0/image/upload', {
        method: 'POST',
        body: data,
      });
      const result = await response.json();
      console.log(result)
      return result.secure_url; // Devuelve la URL de la imagen subida
    } catch (error) {
      console.error('Error subiendo la imagen:', error);
      throw error;
    }
  };

  // Función para guardar datos en MongoDB
  const saveToMongoDB = async (imageUrl, titulo, comentario) => {
    const payload = {
      user_id: user.uid, // ID real del usuario
      idPublicacion: new Date().toISOString(), // ID único de la publicación
      comentario,
      titulo,
      image_url: imageUrl
    };

    console.log('📡 Datos enviados a MongoDB:', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch('http://10.0.2.2:8080/proyecto01/publicaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();
    console.log('✅ Respuesta del servidor:', responseData);

      if (response.ok) {
        Alert.alert('Éxito', 'Publicación guardada correctamente');
      } else {
        const error = await response.json();
        console.error('Error al guardar en MongoDB:', error);
        Alert.alert('Error', 'Hubo un problema al guardar la publicación');
      }
    } catch (error) {
      console.error('Error al conectar con MongoDB:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  // Función para manejar la publicación
  const handlePublicar = async () => {
    
    if (!imageUri || !titulo || !comentario) {
      Alert.alert('Error', 'Por favor, completa todos los campos e incluye una imagen');
      return;
    }

    try {
      // Sube la imagen a Cloudinary
      const imageUrl = await uploadImageToCloudinary(imageUri);
      console.log('URL de la imagen:', imageUrl);

      if (!imageUrl) {
        Alert.alert('Error', 'No se pudo obtener la URL de la imagen');
        return;
      }

      // Guarda los datos en MongoDB
      await saveToMongoDB(imageUrl, titulo, comentario);
    } catch (error) {
      console.error('Error al publicar:', error);
      Alert.alert('Error', 'No se pudo completar la publicación');
    }
  };




  const imgRegister = "https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jqBcbvjmFbefKzX-~lnGB6I2nxln9AnTFgw-URug80VEqH2HMq3jHIn7miU-waHyjymgvOrMlWz6oqm2iSydBQag3BibTE5rMdRK842E4TfPMSw8syvzY5znIAMApGLn1YnUet-UMdtv1T4u2JWYDJ5nSY6qwTgiTkJqdtMLtP1qKqKfAK8ZqyfyOrZy31k4limdhzjCxxxpbXWIFxDXqkxmBUHISZ1HtJkcizlQRyEOrYFxpFQRhgt-0Y5CbxW8n5Rtdu~xs-Ia6QrZdjssfp5Py272I7xGiBts7R1OCR7ODkUn47G6MZ8Hy0G0JMQX55II3LDEdKndGPnew~VguA__"

  return (
    <View style={styles.container}>
      <View style={styles.inicio}>
        <Text style={styles.title}>PUBLICACIÓN</Text>
        <Pressable style={styles.block} onPress={handleSelectImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }}/>
          ) : (
          <Image source={{uri: imgRegister}} style={styles.imgFoto}/>
          )}
        </Pressable>
      </View>
      
      <View style={styles.body}>
        <View style={styles.inputView}>
          <Text style={styles.textInput}>Título:</Text>
          <TextInput
            style={styles.inputContainer}
            placeholder='Máx. 40 caracteres'
            placeholderTextColor='#d9d9d9'
            value={titulo}
            onChangeText={setTitulo}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.textInput}>Descripción:</Text>
          <TextInput
            style={styles.inputContainerDescripcion}
            placeholder='Máx. 250 caracteres'
            placeholderTextColor='#d9d9d9'
            textAlignVertical='top'
            multiline= {true}
            value={comentario}
            onChangeText={setComentario}
          />
        </View>
      </View>

      <View>
        <Pressable
          style={styles.botonFinalizar} onPress={handlePublicar}>
          <Text style={styles.textFinalizar}>PUBLICAR</Text>
        </Pressable>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },



  // inicio

  inicio:{
    alignItems: 'center',
    gap: 35,
  },

  title: {
    color: '#9FC63B',
    fontSize: 35,
    fontWeight: 'bold',
  },

  block: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 205, 
    height: 205,
    borderColor: '#9FC63B',
    borderWidth: 3,
    borderRadius: 12,
  },

  imgFoto: {
    width: 150,
    height: 150,
  },



  // body

  body: {
    gap: 25
  },

  inputView: {
    gap: 20,
  },

  textInput: {
    color: '#9FC63B',
    fontSize: 20,
  },

  inputContainer: {
    backgroundColor: '#323639',
    color: '#d9d9d9',
    width: 349,
    height: 40,
    borderRadius: 9,
    paddingLeft: 15,
  },

  inputContainerDescripcion: {
    backgroundColor: '#323639',
    color: '#d9d9d9',
    width: 349,
    height: 191,
    borderRadius: 9,
    paddingLeft: 15,
    placeholderTextColor: '#d9d9d9'
  },



  // footer

  botonFinalizar: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#9fc63b',
    padding: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
  },

  textFinalizar: {
    fontSize: 18,
    color: '#ffff',
    fontWeight: 'bold',
  },


});