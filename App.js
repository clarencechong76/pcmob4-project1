import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [loading, setloading] = useState(true); 
  const [arrival, setArrival] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=83139";                   

function loadBusStopData() {
  setloading(true)
fetch(BUSSTOP_URL)
.then((Response) => {
  
  return Response.json();
})
.then((ResponseData) => {
  console.log("Original data");

  const myBus = ResponseData.services.filter(
    (item) => item.no === "155"
  )[0];
  setArrival(myBus.next.time)
  setloading(false)
  
});

}
useEffect(() => {
  const interval = setInterval(loadBusStopData,5000);
  return () => clearInterval(interval)
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time</Text>
      <Text style={styles.arrivalTime}>
      {loading ? <ActivityIndicator size="large" /> : arrival}
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
