import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title } from 'react-native-paper'

export default function HomeItem({ navigation, data }) {
  return (
    <View style={styles.container}>
      <Card style={[styles.card]}>
        <Card.Cover
          source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }}
        />
        <Card.Content>
          <Title>{data}</Title>
        </Card.Content>
        <Card.Actions>
          <Button icon="arrow-right-bold-box" onPress={() => { navigation.navigate('DetailFieldPage') }} >Details</Button>
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