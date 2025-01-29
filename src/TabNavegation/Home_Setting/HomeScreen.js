import { View, Text, Image, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { PublicationList } from '../../components/PublicationList'

export function HomeScreen({navigation}) {

  const [publicaciones, setPublicaciones] = useState([]); // Para almacenar las publicaciones
  const [usuarios, setUsuarios] = useState([]); // Para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Para manejar la carga

  const usuario = [
    {
      nick: 'hugo',
      imgPerfil: '../../../assets/perfil pre.png'
    },
    {
      nick: 'pepe',
      imgPerfil: '../../../assets/perfil pre.png',
    }
  ]

  const publicacion = [
    {
      publicacion: 'https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jqBcbvjmFbefKzX-~lnGB6I2nxln9AnTFgw-URug80VEqH2HMq3jHIn7miU-waHyjymgvOrMlWz6oqm2iSydBQag3BibTE5rMdRK842E4TfPMSw8syvzY5znIAMApGLn1YnUet-UMdtv1T4u2JWYDJ5nSY6qwTgiTkJqdtMLtP1qKqKfAK8ZqyfyOrZy31k4limdhzjCxxxpbXWIFxDXqkxmBUHISZ1HtJkcizlQRyEOrYFxpFQRhgt-0Y5CbxW8n5Rtdu~xs-Ia6QrZdjssfp5Py272I7xGiBts7R1OCR7ODkUn47G6MZ8Hy0G0JMQX55II3LDEdKndGPnew~VguA__',
      comentario: 'hola a todos',
      titulo: 'primera publicacion'
    },
    {
      publicacion: 'https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jqBcbvjmFbefKzX-~lnGB6I2nxln9AnTFgw-URug80VEqH2HMq3jHIn7miU-waHyjymgvOrMlWz6oqm2iSydBQag3BibTE5rMdRK842E4TfPMSw8syvzY5znIAMApGLn1YnUet-UMdtv1T4u2JWYDJ5nSY6qwTgiTkJqdtMLtP1qKqKfAK8ZqyfyOrZy31k4limdhzjCxxxpbXWIFxDXqkxmBUHISZ1HtJkcizlQRyEOrYFxpFQRhgt-0Y5CbxW8n5Rtdu~xs-Ia6QrZdjssfp5Py272I7xGiBts7R1OCR7ODkUn47G6MZ8Hy0G0JMQX55II3LDEdKndGPnew~VguA__',
      comentario: 'buenas tardes',
      titulo: 'segunda publicacion'
    }
  ]

  const combine = publicacion.map((pub, index) => ({
    ...pub,
    ...(usuario[index] || { nick: 'Desconocido', imgPerfil: 'url_avatar_default' })
  }));





  useEffect(() => {
    // Fetch para obtener los datos de los usuarios
    fetch('http://10.0.2.2:8080/proyecto01/users/name')
      .then(response => response.json())
      .then(data => {
        setUsuarios(data); // Almacenamos los usuarios en el estado
      })
      .catch(error => console.error('Error fetching users:', error));

    // Fetch para obtener las publicaciones
    fetch('http://10.0.2.2:8080/proyecto01/publicaciones')
      .then(response => response.json())
      .then(data => {
        // Combina las publicaciones con los datos de los usuarios
        const publicacionesConUsuarios = data.map(publi => {
          // Encontramos el usuario correspondiente a esta publicación
          const usuario = usuarios.find(user => user.user_id === publi.user_id);
          
          return {
            ...publi, // Datos de la publicación
            nick: usuario ? usuario.nick : 'Desconocido', // Nick del usuario
            profile_picture: usuario ? usuario.profile_picture : '', // Foto de perfil
          };
        });
        setPublicaciones(publicacionesConUsuarios); // Almacenamos las publicaciones en el estado
        setLoading(false); // Cambiamos el estado de carga a false una vez que los datos estén listos
      })
      .catch(error => console.error('Error fetching publicaciones:', error));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text> {/* Mostramos "Loading..." mientras se cargan los datos */}
      </View>
    );
  }

  

  // // Hacer peticiones para obtener publicaciones y usuarios
  // useEffect(() => {
  //   // Fetch publicaciones
  //   const fetchPublicaciones = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/proyecto01/publicaciones');
  //       const data = await response.json();
  //       setPublicaciones(data); // Guardamos las publicaciones
  //     } catch (error) {
  //       console.error('Error al obtener publicaciones:', error);
  //     }
  //   };

  //   // Fetch usuarios
  //   const fetchUsuarios = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/proyecto01/users/name');
  //       const data = await response.json();
  //       setUsuarios(data); // Guardamos los usuarios
  //     } catch (error) {
  //       console.error('Error al obtener usuarios:', error);
  //     }
  //   };

  //   // Llamamos a ambas funciones
  //   fetchPublicaciones();
  //   fetchUsuarios();
  // }, []);

  // // Combinamos los datos de usuarios y publicaciones
  // const combineData = () => {
  //   return publicaciones.map((pub) => {
  //     // Buscamos el usuario correspondiente a cada publicación (suponiendo que la publicación tiene un campo 'user_id')
  //     const user = usuarios.find((u) => u.user_id === pub.user_id);
  //     return {
  //       ...pub,
  //       user: user || {}, // Asociamos el usuario a la publicación
  //     };
  //   });
  // };


  //  // Función para renderizar cada elemento
  //  const renderItem = ({ item }) => (
  //   <View style={styles.card}>
  //     <View style={styles.header}>
  //       {/* Foto de perfil y nombre */}
  //       <Image source={{ uri: item.user.profile_picture }} style={styles.profileImage} />
  //       <Text style={styles.userName}>{item.user.nick}</Text>
  //     </View>

  //     {/* Imagen de fondo de la publicación */}
  //     <Image source={{ uri: item.image_url }} style={styles.postImage} />

  //     {/* Comentario de la publicación */}
  //     <Text style={styles.comment}>{item.comentario}</Text>
  //   </View>
  // );

  // if (isLoading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />; // Cargando datos
  // }

  return (
    <View style={styles.container}>
    <View style={styles.cabecera}>
      <Image 
        source ={{ uri:"https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737331200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jqBcbvjmFbefKzX-~lnGB6I2nxln9AnTFgw-URug80VEqH2HMq3jHIn7miU-waHyjymgvOrMlWz6oqm2iSydBQag3BibTE5rMdRK842E4TfPMSw8syvzY5znIAMApGLn1YnUet-UMdtv1T4u2JWYDJ5nSY6qwTgiTkJqdtMLtP1qKqKfAK8ZqyfyOrZy31k4limdhzjCxxxpbXWIFxDXqkxmBUHISZ1HtJkcizlQRyEOrYFxpFQRhgt-0Y5CbxW8n5Rtdu~xs-Ia6QrZdjssfp5Py272I7xGiBts7R1OCR7ODkUn47G6MZ8Hy0G0JMQX55II3LDEdKndGPnew~VguA__"}}
        style={{ width:71, height: 71}}
      />
      <View style={styles.cabeceraView}>
        <Text style={styles.textoCabecera}>Nick</Text>
        <Text style={styles.tituloCabecera}>VEDRUNA</Text>
      </View>
    </View>

    <FlatList
      data={ publicaciones }
      keyExtractor={ (item) => item.id.toString()} 
      renderItem={({item}) => (
        <PublicationList item={ item } usuarios={usuarios} />  
      )}
    />


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272a',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },


  // cabecera
  cabecera: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 30
  },

  cabeceraView: {
  },

  textoCabecera: {
    color: '#ffff',
  },

  tituloCabecera: {
    color: '#ffff',
    fontSize: 55,
    fontWeight: 'bold',
    marginTop: '-10',
  },


  // body
  body: {
  
  },

});