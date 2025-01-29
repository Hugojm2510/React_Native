import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase'

export function RegisterScreen ({navigation}) {

  const [form, setForm] = useState({
    nick: '',
    name: '',
    lastName1: '',
    lastName2: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    const { email, password, nick, name, lastName1, lastName2 } = form;

    if (!email || !password || !nick || !name || !lastName1 || !lastName2) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Obtenemos el UID generado por Firebase
        const firebaseUID = userCredential.user.uid;

        // Datos para el microservicio
        // los mismo datos que en el micro (model usuario)
        const userData = {
          user_id: firebaseUID,
          nick: nick,
          nombre: name,
          apellidos: `${lastName1} ${lastName2}`, // Concatenar apellidos
          profile_picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffree-png-vectors%2Favatar-de-usuario&psig=AOvVaw0WSQzs5fHLf6vaNzywnmAc&ust=1737744280207000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOD07YrAjIsDFQAAAAAdAAAAABAJ',
        };

        // Registro en el microservicio
        return fetch('http://10.0.2.2:8080/proyecto01/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al registrar el usuario en el microservicio');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Usuario registrado en el microservicio:', data);
        navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', error.message || 'Ocurrió un error durante el registro');
      });
  };



  const imgRegister = "https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jqBcbvjmFbefKzX-~lnGB6I2nxln9AnTFgw-URug80VEqH2HMq3jHIn7miU-waHyjymgvOrMlWz6oqm2iSydBQag3BibTE5rMdRK842E4TfPMSw8syvzY5znIAMApGLn1YnUet-UMdtv1T4u2JWYDJ5nSY6qwTgiTkJqdtMLtP1qKqKfAK8ZqyfyOrZy31k4limdhzjCxxxpbXWIFxDXqkxmBUHISZ1HtJkcizlQRyEOrYFxpFQRhgt-0Y5CbxW8n5Rtdu~xs-Ia6QrZdjssfp5Py272I7xGiBts7R1OCR7ODkUn47G6MZ8Hy0G0JMQX55II3LDEdKndGPnew~VguA__"

  return (
    <View style={styles.container}>
      <View style={styles.inicio}>
        <Image source ={{ uri: imgRegister}}
              style={{ width:200, height: 200}}
          />
      </View>

      <View style={styles.body}>
      <Text style={styles.title}>
          Completar los siguientes campos:
      </Text>

      <TextInput
          style={styles.input}
          value={form.nick}
          onChangeText={(value) => handleInputChange('nick', value)}
          placeholder="Introduzaca su nick"
          placeholderTextColor="#868686"
        />
        <TextInput
          style={styles.input}
          value={form.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Introduzaca su nombre"
          placeholderTextColor="#868686"
        />
        <TextInput
          style={styles.input}
          value={form.lastname1}
          onChangeText={(value) => handleInputChange('lastName1', value)}
          placeholder="Introduzaca su primer apellido"
          placeholderTextColor="#868686"
        />
        <TextInput
          style={styles.input}
          value={form.lastname2}
          onChangeText={(value) => handleInputChange('lastName2', value)}
          placeholder="Introduzaca su segundo apellido"
          placeholderTextColor="#868686"
        />
        <TextInput
          style={styles.input}
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Introduzaca su correo"
          placeholderTextColor="#868686"
        />
        <TextInput
          style={styles.input}
          value={form.password}
          onChangeText={(value) => handleInputChange('password', value)}
          placeholder="Introduzaca su contraseña"
          placeholderTextColor="#868686"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={(value) => setConfirmPassword(value)}
          placeholder="Repita contraseña"
          placeholderTextColor="#868686"
          secureTextEntry
        />
        
        
        
      </View>

      <View style={styles.finalizar}>
        <Pressable
          style={styles.botonFinalizar}
          onPress= {handleSubmit}
        >
          <Text style={styles.textFinalizar}>FINALIZAR</Text>
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
    flex: 0.6,
  },


  // body
  body: {
    // flex: 0.75,
    gap: 10,
    width: '80%',
  },

  title: {
    color: '#9fc63b',
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffff',
    color: '#868686'
  },


  // finalizar
  finalizar: {
    // flex: 0.25,
  },

  botonFinalizar: {
    marginTop: 40,
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