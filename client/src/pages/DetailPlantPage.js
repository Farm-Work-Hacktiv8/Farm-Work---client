import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, Text, Title } from 'react-native-paper'

export default function DetailPlantPage() {
  return (
    <View>
      <ScrollView>
        <Title style={[styles.title]}>Your Plants in Field</Title>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name A</Title>
            <Text>Temperature: 0</Text>
            <Text>Air Humidity: 0</Text>
            <Text>Ground Humidity: 0</Text>
            <Text>Harvest Time: 0</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name B</Title>
            <Text>Temperature: 0</Text>
            <Text>Air Humidity: 0</Text>
            <Text>Ground Humidity: 0</Text>
            <Text>Harvest Time: 0</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name C</Title>
            <Text>Temperature: 0</Text>
            <Text>Air Humidity: 0</Text>
            <Text>Ground Humidity: 0</Text>
            <Text>Harvest Time: 0</Text>
          </Card.Content>
        </Card>
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
    marginVertical: 10
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 10
  }
})