import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title } from 'react-native-paper'

export default function FieldItem({ navigation, data }) {
  return (
    <View style={styles.container}>
      <Card style={[styles.card]}>
        <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
        <Card.Content>
          <Title>{data.plantName}</Title>
        </Card.Content>
        <Card.Actions>
          <Button icon="arrow-right-bold-box" onPress={() => navigation.push('DetailPlantPage')}>Details</Button>
          <Button icon="pencil-box">Edit</Button>
          <Button icon="trash-can">Delete</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffe8d6",
    marginBottom: 20,
    maxWidth: "95%",
    marginHorizontal: 20,
    elevation: 4
  },
  container: {
    backgroundColor: "#cb997e"
  }
})