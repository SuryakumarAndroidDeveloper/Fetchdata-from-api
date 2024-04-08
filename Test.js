/* import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const App = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Star Wars Characters</Text>
      <View>
        {characters.map((character, index) => (
          <Text key={index} style={styles.character}>
            Name: {character.name}  
            Height: {character.height}
            Mass: {character.mass}
            Hair Color: {character.hair_color}
            Skin Color: {character.skin_color}
            Eye Color: {character.eye_color}
            Birth Year: {character.birth_year}
            Gender: {character.gender}

          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  character: {
    fontSize: 16,
    marginBottom: 5,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-evenly",
    width:400
    
    
  },
});

export default App; */












import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";

// get data from this URL!
const peopleURL = "https://swapi.dev/api/people/";

const App = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [height, setHeight] = useState([]);
  const [mass, setMass] = useState([]);
  const [hair_color, setHairColor] = useState([]);
  const [skin_color, setSkinColor] = useState([]);
  const [eye_color, setEyeColor] = useState([]);
  const [birth_year, setBirthYear] = useState([]);
  const [gender, setGender] = useState([]);
  const description ="The List Of Peoples Data"

  // similar to 'componentDidMount', gets called once
  useEffect(() => {
    fetch(peopleURL)
      .then((response) => response.json()) // get response, convert to json
      .then((json) => {
        setData(json.results);
        setName(json.name);
        setHeight(json.height);
        setMass(json.mass);
        setHairColor(json.hair_color);
        setSkinColor(json.skin_color);
        setEyeColor(json.eye_color);
        setBirthYear(json.birth_year);
        setGender(json.gender);
      })
      .catch((error) => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  }, []);

  // Also get call asynchronous function
  async function getMoviesAsync() {
    try {
      let response = await fetch(peopleURL);
      let json = await response.json();
      setData(json.results);
      setName(json.name);
      setHeight(json.height);
      setMass(json.mass);
      setHairColor(json.hair_color);
      setSkinColor(json.skin_color);
      setEyeColor(json.eye_color);
      setBirthYear(json.birth_year);
      setGender(json.gender);
      setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Title from URL */}
          <Text style={styles.title}>{"The People Details List"}</Text>
          {/* Display each movie */}
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.movieText}>
                  {item.id}. {item.name}, {item.height},{item.mass}
                </Text>
              </View>
            )}
          />
          {/* Show the description */}
         <Text style={styles.description}>{description}</Text> 
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
});

export default App;