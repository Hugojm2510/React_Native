import { View, Text, Image, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'

import { firebaseConfig } from '../utils/firebase'
import { auth } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';


export function LoginScreen({navigation}) {

  const [email, setEmail] = useState('hugo@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, introduce correo y contraseña');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate('HomeScreen');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };


  //

  return (
    <View style={styles.container}>
      <View style={styles.inicio}>
        <Image 
          source ={{ uri:"https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jqBcbvjmFbefKzX-~lnGB6I2nxln9AnTFgw-URug80VEqH2HMq3jHIn7miU-waHyjymgvOrMlWz6oqm2iSydBQag3BibTE5rMdRK842E4TfPMSw8syvzY5znIAMApGLn1YnUet-UMdtv1T4u2JWYDJ5nSY6qwTgiTkJqdtMLtP1qKqKfAK8ZqyfyOrZy31k4limdhzjCxxxpbXWIFxDXqkxmBUHISZ1HtJkcizlQRyEOrYFxpFQRhgt-0Y5CbxW8n5Rtdu~xs-Ia6QrZdjssfp5Py272I7xGiBts7R1OCR7ODkUn47G6MZ8Hy0G0JMQX55II3LDEdKndGPnew~VguA__"}}
          style={{ width:243, height: 243}}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>VEDRUNA</Text>
          <Text style={styles.title}>EDUCACIÓN</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.inputView}>
          <TextInput 
            onChangeText={setEmail}
            style={styles.inputContainer}
            placeholder='Introduzca su correo o nick...'
            placeholderTextColor='#868686'
            value={email}
          />
          <TextInput
            onChangeText={setPassword}
            style={styles.inputContainer}
            placeholder='Introduzca su contraseña...'
            placeholderTextColor='#868686'
            secureTextEntry
            value={password}
          />
        </View>

        <View style={styles.olvidoView}>
          <Text style={styles.olvidoText}>
            ¿Olvidaste la contraseña?
          </Text>
        </View>

        <Pressable
          style={styles.logIn}
          onPress={handleLogin}
        >
          <Text
            style={styles.logInText}
          >
            Log In
          </Text>
        </Pressable>

      </View>

      <View style={styles.footer}>
        <Text style={styles.cuenta}>
          ¿No tienes cuenta?
        </Text>
        <Pressable
          onPress={() => navigation.navigate('RegisterScreen')}
        >
            <Text style={styles.crear}>Crear cuenta</Text>
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
  inicio: {
    flex: 1.5,
    gap: 10,
    marginTop: 40,
  },

  textContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },

  title: {
    color: '#dfdfdf',
    fontSize: 44,
    fontWeight: 'bold',
  },


  // cuerpo
  body: {
    flex: 1.25,
  },

  inputView: {
    gap: 40,
  },

  inputContainer: {
    backgroundColor: '#323639',
    color: '#868686',
    width: 312,
    height: 40,
    borderRadius: 9,
    paddingLeft: 15,
  },

  olvidoView: {

  },

  olvidoText: {
    color: '#9fc63b',
    textAlign: 'right',
    width: '100%',
    marginTop: 15,
    marginBottom: 35,
  },

  logIn: {
    width: 312,
    height: 40,
    backgroundColor: '#9fc63b',
    borderRadius: 9,
    justifyContent: 'center',
    marginBottom: 50,
  },

  logInText: {
    textAlign: 'center',
  },
  

  // footer
  footer: {
    flexDirection: 'row',
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: '#323639',
    width: '100%',
    justifyContent: 'center',
    padding: 30,
  },

  cuenta: {
    color: '#dfdfdf'
  },

  crear: {
    color: '#9fc63b'
  },

});