import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Card, Title } from 'react-native-paper'

export default function HomePage() {
  return (
    <View>
      <ScrollView>
        <Title style={styles.title}>Your Field</Title>
        <Button icon="ballot" mode="contained" style={styles.buttonAdd}>Add Field</Button>
        <Card>
          <Card.Cover source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }} />
          <Card.Content>
            <Title>Field Name</Title>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }} />
          <Card.Content>
            <Title>Field Name</Title>
          </Card.Content>
        </Card>
        <Card>
          <Card.Cover source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }} />
          <Card.Content>
            <Title>Field Name</Title>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  buttonAdd: {
    width: "30%",
    marginVertical: 20
  }
})