import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Title, Divider, Text } from "react-native-paper"

export default function PlantItem({ data }) {
  return (
    <View>
      <Card style={[styles.card]}>
        <Card.Content>
          <Title style={styles.cardTitle}>{data.name}</Title>
          <Divider style={styles.divider} />
          <Text>Temperature: {data.temperature} &#8451;</Text>
          <Text>Air Humidity: {data.airHumidity} &#8451;</Text>
          <Text>Ground Humidity: {data.groundHumidity} &#8451;</Text>
          <Text>Harvest Time: {data.harvest} days</Text>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    maxWidth: "90%",
    marginHorizontal: 20
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  divider: {
    marginBottom: 10
  }
})