import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

export function PublicationList ({item}) {

    const {nick, comentario, titulo, profile_picture, image_url, createdAt } = item 
    
    // formatear la fecha
    const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <View style={styles.container}>

    <View style={styles.body}>
        <ImageBackground
            source={{uri: image_url}}
            backgroundColor= 'white'
            style={styles.publicacion}
        >
            <View style={styles.interior}>
                <Image 
                    source={{uri: profile_picture}}
                    style= {{width: 80, height: 80}}
                    />
                <View style={styles.datos}>
                    <Text style={{fontSize: 15}}>Publicado por</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{nick}</Text>
                    <Text style={{fontSize: 10}}>{`Hace ${formattedDate}`}</Text>
                </View>
                
            </View>
        </ImageBackground>
        <View style={styles.debajo}>
            <Text style={styles.titulo}>{titulo}</Text>
            <Text style={styles.comentario}>{comentario}</Text>
        </View>
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

  body: {
    flex: 1,
    width: 400,
    marginBottom: 120,
    gap: 20
  },

  publicacion: {
    height: 428,
  },

  interior: {
    padding: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },

  datos: {
    
  },

  debajo: {
    gap: 20,
    paddingHorizontal: 20
  },

  titulo: {
    fontSize: 24,
    color: '#9FC63B',
    fontWeight: 'bold'
  },

  comentario: {
    fontSize: 13,
    color: '#ffff'
  },

});