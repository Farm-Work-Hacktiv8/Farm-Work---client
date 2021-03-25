import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, Button, Title, Portal, Dialog, Paragraph, Modal, Divider, Text, TextInput, List, Headline, Chip } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlant, getHistory, editPlants } from '../store/action'
import Tooltip from 'react-native-walkthrough-tooltip'
import { Kalam_700Bold } from '@expo-google-fonts/kalam'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

export default function FieldItem({ data }) {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const access_token = useSelector(state => state.access_token)
  const indicator = useSelector(state => state.indicator)
  const [newPlant, setNewPlant] = useState({
    plantName: data.plantName,
    harvestTime: data.harvestTime,
    fieldsId: data.PlantFields.fieldId
  })
  const [tempTip, setTempTip] = useState(false)
  const [airTip, setAirTip] = useState(false)
  const [groundTip, setGroundTip] = useState(false)
  const [harvestTip, setHarvestTip] = useState(false)
  const [pumpTip, setPumpTip] = useState(false)
  const hideModal = () => { setModalVisible(false) }
  const hideEdit = () => { setEditModal(false) }
  const history = useSelector(state => state.history)
  const [fontLoaded] = useFonts({ Inter_900Black })
  const [fontKalam] = useFonts({ Kalam_700Bold })

  function handleDelete() {
    setVisible(false)
    dispatch(deletePlant(data.id, data.PlantFields.fieldId, access_token))
  }

  function handleDetail() {
    dispatch(getHistory(access_token))
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
              <Title style={styles.modalTitle}>History</Title>
              <Divider style={styles.modalDivider} />
              <List.Accordion title="List details history">
                {
                  history.length === 0 ? <Text>History Empty</Text> :
                    history.map((el, i) => {
                      return <List.Item
                        title={el}
                        description="Pump Watering"
                        key={i}
                      />
                    })
                }

              </List.Accordion>
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
            onChangeText={(text) => { setNewPlant({ ...newPlant, plantName: text }) }}
          />
          <TextInput
            label="Harvest Interval"
            mode="outlined"
            placeholder="Estimate interval in days"
            keyboardType="numeric"
            value={(newPlant.harvestTime) + ''}
            onChangeText={(text) => { setNewPlant({ ...newPlant, harvestTime: text }) }}
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
      <Card style={[styles.card]} onPress={handleDetail}>
        <Card.Cover style={styles.cardCover} source={{ uri: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" }} />
        <Card.Content>
          {
            !fontKalam ? <Text>Loading</Text> :
              <Headline style={{ fontFamily: 'Kalam_700Bold', marginTop: 10 }}>{data.plantName}</Headline>
          }
        </Card.Content>
        <Card.Actions style={styles.detailContainer}>
          <Tooltip isVisible={tempTip} content={<Text>Temperature</Text>} onClose={() => setTempTip(false)} placement="top" topAdjustment={-24} childContentSpacing={-8}>
            <Button labelStyle={{ fontSize: 20 }} onPress={() => setTempTip(true)} icon="thermometer">{indicator.temperature} C</Button>
          </Tooltip>
          <Tooltip isVisible={airTip} content={<Text>Air Humidity</Text>} onClose={() => setAirTip(false)} placement="top" topAdjustment={-24} childContentSpacing={-8}>
            <Button labelStyle={{ fontSize: 20 }} onPress={() => setAirTip(true)} icon="water-percent">{indicator.humidity} %RH</Button>
          </Tooltip>
          <Tooltip isVisible={groundTip} content={<Text>Ground Humidity</Text>} onClose={() => setGroundTip(false)} placement="top" topAdjustment={-24} childContentSpacing={-8}>
            <Button labelStyle={{ fontSize: 20 }} onPress={() => setGroundTip(true)} icon="percent">{indicator.moisture} RH</Button>
          </Tooltip>
        </Card.Actions>
        <Card.Content style={styles.contentContainer}>
          <Tooltip style={styles.toolTip} isVisible={harvestTip} content={<Text>Harvest Interval</Text>} onClose={() => setHarvestTip(false)} placement="top" topAdjustment={-24} showChildInTooltip={false} >
            <Chip mode="outlined" icon="corn" onPress={() => setHarvestTip(true)}>every {data.harvestTime} days</Chip>
          </Tooltip>
          <Tooltip style={styles.toolTip} isVisible={pumpTip} content={<Text>Last Watering</Text>} onClose={() => setPumpTip(false)} placement="top" topAdjustment={-24} showChildInTooltip={false} >
            <Chip style={{ marginTop: 5 }} mode="outlined" icon="water-pump" onPress={() => setPumpTip(true)}>{indicator.pump}</Chip>
          </Tooltip>
        </Card.Content>
        <Card.Actions>
          <Button icon="arrow-right-bold-box" onPress={handleDetail}>History</Button>
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
    marginHorizontal: 10,
    elevation: 4,
    borderRadius: 20
  },
  cardCover: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
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
    backgroundColor: "#cb997e"
  },
  detailContainer: {
    justifyContent: 'space-evenly',
    height: 25
  },
  contentContainer: {
    marginTop: 10,
  },
  toolTip: {
    left: 15
  }
})