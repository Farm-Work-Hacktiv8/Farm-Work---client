import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph, Modal, TextInput } from 'react-native-paper'
import { deleteField, editField } from '../store/action'

export default function HomeItem({ navigation, data }) {

  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [fieldName, setFieldName] = useState(data.fieldName)
  const [fieldArea, setFieldArea] = useState(data.fieldArea)
  const dispatch = useDispatch()
  const access_token = useSelector(state => state.access_token)

  function handleDelete () {
    setVisible(false)
    dispatch(deleteField(data.id, access_token))
  }

  function handleEdit () {
    const payload = {
      fieldName,
      fieldArea
    }
    dispatch(editField(payload, data.id, access_token))
    handleCancel()
  }

  function handleCancel () {
    setFieldArea('')
    setFieldName('')
    setEditVisible(false)
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
      <Portal>
        <Modal 
          visible={editVisible} 
          onDismiss={() => setEditVisible(false)} 
          contentContainerStyle={styles.modal}
        >
          <Title>Edit Field</Title>
          <TextInput
            label="Field Name"
            mode="outlined"
            placeholder="name your field"
            value={fieldName}
            onChangeText={text => setFieldName(text)} 
          />
          <TextInput
            label="Field Area"
            mode="outlined"
            placeholder="In Hectare"
            keyboardType="numeric"
            value={fieldArea}
            onChangeText={text => setFieldArea(text)}
          />
          <Button onPress={handleEdit} style={styles.buttonModal} mode="outlined">Submit</Button>
          <Button onPress={handleCancel} style={styles.buttonModal} mode="outlined">Cancel</Button>
        </Modal>
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
          <Button icon="pencil-box"onPress={() => setEditVisible(true)}>Edit</Button>
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
    elevation: 4
  },
  container: {
    backgroundColor: "#cb997e"
  },
  modal: {
    backgroundColor: '#ffe8d6',
    padding: 20,
    marginHorizontal: 20
  },
})