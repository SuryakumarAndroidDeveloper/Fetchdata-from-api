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



  return (
    <SafeAreaView style={styles.container}>
      {/* While fetching show the indicator, else show response*/}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Title from URL */}
          <Text style={styles.title}>{"The People Details List"}</Text>
          {/* Display each people */}
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.peopleText}>
                  {item.id} Name: {item.name}, 
                  Height: {item.height}, 
                  Mass: {item.mass},
                  Hair Color:{item.hair_color},
                  Skin Color:{item.skin_color},
                  Eye Color:{item.eye_color},
                  Birth Year:{item.birth_year},
                  Gender:{item.gender}
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
  peopleText: {
    fontSize: 26,
    fontWeight: "200",
    justifyContent:"space-evenly",
    
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