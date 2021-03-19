import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Title } from 'react-native-paper'
import PlantItem from "../components/PlantItem"

export default function DetailPlantPage() {
  const item = [
    {
      name: "Plant A",
      temperature: 18,
      airHumidity: 19,
      groundHumidity: 20,
      harvest: 27
    },
    {
      name: "Plant B",
      temperature: 18,
      airHumidity: 19,
      groundHumidity: 20,
      harvest: 27
    },
    {
      name: "Plant C",
      temperature: 18,
      airHumidity: 19,
      groundHumidity: 20,
      harvest: 27
    },
    {
      name: "Plant D",
      temperature: 18,
      airHumidity: 19,
      groundHumidity: 20,
      harvest: 27
    }
  ]
  return (
    <View style={styles.container}>
      <ScrollView>
        <Title style={[styles.title]}>Your Plants in Field</Title>
        {
          item.map((data, index) => {
            return <PlantItem data={data} key={index}/>
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  card: {
    marginVertical: 10,
    maxWidth: "90%",
    marginHorizontal: 20
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#cb997e"
  },
  divider: {
    marginBottom: 10
  }
})