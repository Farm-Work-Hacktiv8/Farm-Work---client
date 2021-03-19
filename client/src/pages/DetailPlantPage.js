import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, Text, Title, Divider } from 'react-native-paper'

export default function DetailPlantPage() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Title style={[styles.title]}>Your Plants in Field</Title>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name A</Title>
            <Divider style={styles.divider}/>
            <Text>Temperature: 0</Text>
            <Text>Air Humidity: 0</Text>
            <Text>Ground Humidity: 0</Text>
            <Text>Harvest Time: 0</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name B</Title>
            <Divider style={styles.divider}/>
            <Text>Temperature: 0</Text>
            <Text>Air Humidity: 0</Text>
            <Text>Ground Humidity: 0</Text>
            <Text>Harvest Time: 0</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name C</Title>
            <Divider style={styles.divider}/>
            <Text>Temperature: 0</Text>
            <Text>Air Humidity: 0</Text>
            <Text>Ground Humidity: 0</Text>
            <Text>Harvest Time: 0</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.card]}>
          <Card.Content>
            <Title style={styles.cardTitle}>Plant Name D</Title>
            <Divider style={styles.divider}/>
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