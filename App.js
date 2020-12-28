import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';

const WEATHER_API_KEY = 'a8dcda7f04ebfa880ccefe4d4f220504';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

export default function App() {

  // Callback Functions that take place on load of components

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitsSystem, setUnitsSystem] = useState('metric')

  useEffect(() => {
    load(); // call async function
  }, [unitsSystem])

  async function load() {
    setCurrentWeather(null)
    setErrorMessage(null)

    try {
      let { status } = await Location.requestPermissionsAsync()

      // Asking for permission for current location
      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the app') // if user declined 
        return
      }

      // Retrieving location
      const location = await Location.getCurrentPositionAsync()

      // Separate the coordinate of the location into latitude and longitude
      const { latitude, longitude } = location.coords

      // Weather API URL 
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;

      const response = await fetch(weatherUrl)

      const result = await response.json()

      if (response.ok) {
        setCurrentWeather(result)
      } else {
        setErrorMessage(result.message)
      }

      // alert("Latitude: " + latitude + "Longitude: " + longitude);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (currentWeather) {
    const { main: { temp } } = currentWeather // Constructor
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text> {errorMessage} </Text>
        <StatusBar style="auto" />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar style='auto' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
