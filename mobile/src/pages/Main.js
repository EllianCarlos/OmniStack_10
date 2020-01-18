import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from "react-native-maps";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import {MaterialIcons} from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }){
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
    const { granted } = await requestPermissionsAsync();
    
    if(granted){
      const {coords} = await getCurrentPositionAsync({
        enableHighAccuracy:true,
      });

      const {latitude, longitude} = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta:0.04, 
        longitudeDelta:0.04,
      });
    }
  }
  loadInitialPosition();
  }, []);

  async function loadDevs() {
    const {latitude, longitude} = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: 'ReactJS'
      }
    })

    setDevs(response.data)
  }

  function handleReagionChanged(region){
    setCurrentRegion(region);
  }

  if(!currentRegion){
    return null;
  }

  return (
    <>
    <MapView 
      onRegionChangeComplete={handleReagionChanged} 
      initialRegion={currentRegion} 
      style={styles.map}
    >
      {devs.map(dev => (
        <Marker coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0]}}>
          <Image style={styles.avatar} source={{ uri:dev.avatar_url}}></Image>
          
          <Callout onPress={() => {
            navigation.navigate('Profile', {github_username: dev.github_username})
          }}>
            <View style={styles.callout} >
              <Text style={styles.devName} >Igor Cássio</Text>
              <Text style={styles.devBio} >CTO na @utopia</Text>
              <Text style={styles.devTechs} >ReactJS, React Native, Node.js</Text>
            </View>
          </Callout>
        </Marker>
      ))}

    </MapView>
    <View style={styles.searchForm}>
      <TextInput 
        style={styles.searchInput} 
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity style={styles.loadButton} onPress={loadDevs}>
        <MaterialIcons name="my-location" size={20} color='#FFF'>
        
        </MaterialIcons>
      </TouchableOpacity>
    </View>
    </>
    );
}

// TODO: Corrigir teclado aparecendo na frente do campo de pesquisa, pesquisar na documentação

const styles = StyleSheet.create({
  map:{
    flex:1
  }, 
  
  avatar: {
    width:54,
    height:54,
    borderRadius:4,
    borderWidth:4,
    borderColor:'#FFF'
  }, 
  
  callout: {
    width:260,
  }, 
  
  devName: {
    fontWeight: 'bold',
    fontSize:16,
  }, 
  
  devBio: {
    color: '#666',
    fontSize: 10,
  }, 
  
  devTechs: {
    marginTop: 5,
  },

  searchForm: {
    position: "absolute",
    top:20,
    left:20,
    right:20,
    zIndex:5,
    flexDirection:'row',
  },

  searchInput: {
    flex:1,
    height:50,
    backgroundColor:'#FFF',
    color:'#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width:4,
      height:4,
    },
    elevation:3,
  }, 
  loadButton: {
    width:50,
    height:50,
    backgroundColor: '#BE4Dff',
    borderRadius: 25,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:15,
  }
})

export default Main;