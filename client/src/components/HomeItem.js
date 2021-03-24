import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph, Modal, TextInput, Headline, Chip } from 'react-native-paper'
import { deleteField, editField, getIndicator } from '../store/action'

export default function HomeItem({ navigation, data }) {

  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [fieldName, setFieldName] = useState(data.fieldName)
  const [fieldArea, setFieldArea] = useState(data.fieldArea)
  const dispatch = useDispatch()
  const access_token = useSelector(state => state.access_token)

  function handleDelete() {
    setVisible(false)
    dispatch(deleteField(data.id, access_token))
  }

  function handleEdit() {
    const payload = {
      fieldName,
      fieldArea
    }
    dispatch(editField(payload, data.id, access_token))
    handleCancel()
  }

  function handleCancel() {
    setFieldArea('')
    setFieldName('')
    setEditVisible(false)
  }

  function handleDetailPlant() {
    navigation.navigate('DetailFieldPage', { fieldsId: data.id })
    dispatch(getIndicator(access_token))
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
            value={(fieldArea) + ''}
            onChangeText={text => setFieldArea(text)}
          />
          <Button onPress={handleEdit} style={styles.buttonModal} mode="outlined">Submit</Button>
        </Modal>
      </Portal>
      <Card style={[styles.card]} onPress={handleDetailPlant}>
        <Card.Cover
          source={{ uri: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" }}
          style={styles.cardCover}
        />
        <Card.Content>
          <Headline style={styles.title}>{data.fieldName}</Headline>
          <Chip mode="outlined" icon="barley">{data.fieldArea} hectare</Chip>
        </Card.Content>
        <Card.Actions>
          <Button style={styles.button} icon="arrow-right-bold-box" onPress={handleDetailPlant} >Details</Button>
          <Button style={styles.button} icon="pencil-box" onPress={() => setEditVisible(true)}>Edit</Button>
          <Button style={styles.button} icon="trash-can" onPress={() => setVisible(true)}>Delete</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffe8d6",
    marginBottom: 20,
    elevation: 4,
    marginHorizontal: 10,
    borderRadius: 20
  },
  container: {
    backgroundColor: "#cb997e"
  },
  modal: {
    backgroundColor: '#ffe8d6',
    padding: 20,
    marginHorizontal: 20
  },
  buttonModal: {
    marginVertical: 10,
    backgroundColor: "#cb997e"
  },
  cardCover: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  button: {
    width: "25%",
  },
  title: {
    fontWeight: "bold",
  }
})