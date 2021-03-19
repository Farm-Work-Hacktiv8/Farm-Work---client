import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Title, Card } from 'react-native-paper'

export default function DetailFieldPage() {
  return (
    <View>
      <ScrollView>
        <Title style={styles.title}>Your Plant</Title>
        <Button icon="ballot" mode="contained" style={styles.button}>Add Plant</Button>
        <Card>
          <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
          <Card.Content>
            <Title>Plant A</Title>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
          <Card.Content>
            <Title>Plant B</Title>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
          <Card.Content>
            <Title>Plant C</Title>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    textAlign: 'center'
  },
  button: {
    width: "40%",
    marginVertical: 20
  }
})