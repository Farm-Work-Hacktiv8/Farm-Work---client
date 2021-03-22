import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph, Modal, Divider, Text, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< HEAD
import { deletePlant, editPlants } from '../store/action'
=======
import { deletePlant, getIndicator, editPlants } from '../store/action'
>>>>>>> 1eda24736690722480ba4a764dc0e78a5d31be63

export default function FieldItem({ data }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const access_token = useSelector(state => state.access_token)
  const [newPlant, setNewPlant] = useState({
    plantName: data.plantName,
    harvestTime: data.harvestTime,
    fieldsId: data.PlantFields.fieldId
  })
  const hideModal = () => { setModalVisible(false) }
  const hideEdit = () => { setEditModal(false) }

  function handleDelete() {
    setVisible(false)
    dispatch(deletePlant(data.id, data.PlantFields.fieldId, access_token))
  }

  function handleDetail() {
    dispatch(getIndicator(access_token))
    setModalVisible(true)
  }

  function handleEdit() {
    dispatch(editPlants(newPlant, data.id, data.PlantFields.fieldId, access_token))
    setEditModal(false)
  }

  function openEditModal() {
    setNewPlant({
      plantName: data.plantName,
      harvestTime: data.harvestTime
    })
    setEditModal(true)
  }
  console.log(access_token)
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
              <Title style={styles.modalTitle}>{data.plantName}</Title>
              <Divider style={styles.modalDivider} />
              <Text>Temperature: 30&#8451;</Text>
              <Text>Air Humidity: 29&#8451;</Text>
              <Text>Ground Humidity: 28&#8451;</Text>
              <Text>Harvest Time: {data.harvestTime} days remaining</Text>
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      {/* End of modal detail plants */}
      <Portal>
        <Modal
          visible={editModal}
          onDismiss={hideEdit}
          contentContainerStyle={styles.modalEdit}
        >
          <Title>Plant Detail</Title>
          <TextInput
            label="Plant Name:"
            mode="outlined"
            placeholder="Put your plant name here"
            value={newPlant.plantName}
            onChange={(e) => { setNewPlant({ ...newPlant, plantName: e.target.value }) }}
          />
          <TextInput
            label="Harvest Time:"
            mode="outlined"
            placeholder="Estimate day for harvesting your plant"
            keyboardType="numeric"
            value={newPlant.harvestTime}
            onChange={(e) => { setNewPlant({ ...newPlant, harvestTime: e.target.value }) }}
          />
          <Button
            onPress={handleEdit}
            mode="contained"
            style={styles.buttonModal}
          >
            Submit
          </Button>
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
          <Button icon="pencil-box" onPress={openEditModal}>Edit</Button>
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
  },
  modalEdit: {
    backgroundColor: '#ffe8d6',
    padding: 20,
    maxWidth: "95%",
    marginHorizontal: 20
  },
  buttonModal: {
    marginVertical: 10,
    backgroundColor: "#b7b7a4"
  },
})