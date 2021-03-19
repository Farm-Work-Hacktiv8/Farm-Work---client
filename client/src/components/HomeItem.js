import React from 'react'
import { View } from 'react-native'
import { Card, Button, Title } from 'react-native-paper'

export default function HomeItem({ navigation, data }) {
  return (
    <View>
      <Card>
        <Card.Cover
          source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }}
        />
        <Card.Content>
          <Title>{data}</Title>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => { navigation.navigate('DetailFieldPage') }} >Details</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}
