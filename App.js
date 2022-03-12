import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [datos, setDatos] = useState([]);
  const [isLoading, setloading] = useState(true);



  const getPosts = async () => {
    try { 
      const url = "https://jsonplaceholder.typicode.com/posts"; 

    //Consumo de datos
    const response =  await fetch(url);
    //Convertir a json
    const json = await response.json();
    setDatos(json);
    } catch (error) {
    console.error(error);
   } finally {
     setloading(false);
   }

    }
    

  useEffect(() => {
    getPosts(); 
  }, []) 


  return (
    <View style={styles.container}>
      { isLoading ?  <ActivityIndicator /> : (  //Es true, Si no es verdadero, muestra el flatlist
      

        <FlatList 
        data = {datos}
        keyExtractor = { ({id}, index) => id}
        renderItem = {
          ({item}) => (
            <Text>{item.title} </Text>
          )
        }
        /> 
        ) 
      }
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
