import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [loading, setloading] = useState(true); 
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";

function loadBusStopData() {
fetch(BUSSTOP_URL)
.then((Response) => {
  return Response.json();
})
.then((ResponseData) => {
  console.log("Original data");

  const myBus = ResponseData.services.filter(
    (item) => item.no === "155"
  )[0];
  console.log("My bus");
  console.log(myBus);

});

}
useEffect(() => {
  loadBusStopData();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time</Text>
      <Text style={styles.arrivalTime}>
      {loading ? <ActivityIndicator size="large" /> : "Loaded"}
      </Text>
      <TouchableOpacity style={styles.button}>
<Text style={styles.buttonText}>Refresh!</Text>

      </TouchableOpacity>
      
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
  button: {
    backgroundColor: 'green',

    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  }
});
