import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph, Modal, Divider, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlant, getOnePlant } from '../store/action'

export default function FieldItem({ data }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const plantDetail = useSelector(state => state.plantDetail)

  const hideModal = () => { setModalVisible(false) }
  
  function handleDelete() {
    setVisible(false)
    dispatch(deletePlant(data.id, data.fieldsId))
  }
  
  function handleDetail() {
    dispatch(getOnePlant(data.id))
    setModalVisible(true)
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
      {/* End of dialog */}
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalCard}
        >
          <Card>
            <Card.Content>
              <Title style={styles.modalTitle}>{plantDetail.plantName}</Title>
              <Divider style={styles.modalDivider}/>
              <Text>Temperature: {plantDetail.temperature}&#8451;</Text>
              <Text>Air Humidity: 29&#8451;</Text>
              <Text>Ground Humidity: 28&#8451;</Text>
              <Text>Harvest Time: {plantDetail.harvestTime} days</Text>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      {/* Start of component */}
      <Card style={[styles.card]}>
        <Card.Cover source={{ uri: "https://images.unsplash.com/photo-1492944557828-11e576351057?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" }} />
        <Card.Content>
          <Title>{data.plantName}</Title>
        </Card.Content>
        <Card.Actions>
          <Button icon="arrow-right-bold-box" onPress={handleDetail}>Details</Button>
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
  },
  modalCard: {
    marginVertical: 10,
    maxWidth: "90%",
    marginHorizontal: 20
  },
  modalTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalDivider: {
    marginBottom: 10
  }
})