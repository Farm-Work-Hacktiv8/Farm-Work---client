import React from 'react'
import { View } from 'react-native'
import { Card, Button, Title } from 'react-native-paper'

export default function FieldItem({ navigation, data }) {
  return (
    <View>
      <Card>
        <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
        <Card.Content>
          <Title>{data}</Title>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.push('DetailPlantPage')}>Details plant</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}
