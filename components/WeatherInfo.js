import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../utility/index'

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors

export default function WeatherInfo({ currentWeather }) {
  const {
    main: { temp },
    weather: [details],
    name,

  } = currentWeather
  const { icon, main, description } = details // Getting the string of the icon required
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`  // Based on retrieved string to set a url link
  return (
    <View style={styles.weatherInfo}>
      {/* Set Image based on the url link */}
      <Text>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  )
}

// Styling Components
const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center'
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: 'capitalize'
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR
  },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontWeight: '500',
    marginTop: 5
  }
})

