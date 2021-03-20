import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph } from 'react-native-paper'
import { deleteField } from '../store/action'

export default function HomeItem({ navigation, data }) {

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  function handleDelete () {
    console.log('delete')
    setVisible(false)
    dispatch(deleteField(data.id))
  }

  return (
    <View style={styles.container}>
      <Portal style={styles.deleteModal}>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Delete</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDelete}>Confirm</Button>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Card style={[styles.card]}>
        <Card.Cover
          source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }}
        />
        <Card.Content>
          <Title>{data.fieldName}</Title>
        </Card.Content>
        <Card.Actions>
          <Button icon="arrow-right-bold-box" onPress={() => { navigation.navigate('DetailFieldPage', { fieldsId: data.id }) }} >Details</Button>
          <Button icon="pencil-box">Edit</Button>
          <Button icon="trash-can" onPress={() => setVisible(true)}>Delete</Button>
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