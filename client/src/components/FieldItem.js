import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { deletePlant } from '../store/action'

export default function FieldItem({ navigation, data }) {

  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  function handleDelete () {
    setVisible(false)
    dispatch(deletePlant(data.id, data.fieldsId))
  }

  return (
    <View style={styles.container}>
      <Portal style={ styles.deleteModal }>
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
        <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
        <Card.Content>
          <Title>{data.plantName}</Title>
        </Card.Content>
        <Card.Actions>
          <Button icon="arrow-right-bold-box" onPress={() => navigation.push('DetailPlantPage')}>Details</Button>
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
  },
  deleteModal: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})