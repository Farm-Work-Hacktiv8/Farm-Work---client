import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Modal, Portal, TextInput, Title } from 'react-native-paper'
import HomeItem from '../components/HomeItem'
import { getFields } from "../store/action"

export default function HomePage({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [newField, setNewField] = useState({
    name: '',
    widthField: 0
  })
  const showModal = () => { setVisible(true) }
  const hideModal = () => { setVisible(false) }
  const handleAdd = () => {
    console.log(newField)
    setVisible(false)
  }
  const dispatch = useDispatch()
  const fields = useSelector(state => state.fields)
  useEffect(() => {
    dispatch(getFields())
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView>
        <Portal>
          <Modal 
            visible={visible} 
            onDismiss={hideModal} 
            contentContainerStyle={styles.modal}
          >
            <Title>Fields Detail</Title>
            <TextInput label="Fields Name:" mode="outlined" placeholder="please enter a name..." onChange={(text) => { setNewField({ ...newField, name: text }) }} />
            <TextInput label="Space of Farm:" mode="outlined" placeholder="in metre/square" keyboardType="numeric" onChange={(text) => { setNewField({ ...newField, widthField: text }) }} />
            <Button onPress={handleAdd} style={styles.buttonModal} mode="outlined">Submit</Button>
          </Modal>
        </Portal>
        <Title style={styles.title}>Your Field</Title>
        <Button icon="ballot" mode="contained" style={styles.buttonAdd} onPress={showModal}>Add Field</Button>
        {
          fields.map((data) => {
            return <HomeItem data={data} key={data.id} navigation={navigation}/>
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonAdd: {
    width: "30%",
    marginVertical: 20,
    marginHorizontal: 125
  },
  modal: {
    backgroundColor: '#ffe8d6',
    padding: 20,
    maxWidth: "95%",
    marginHorizontal: 20
  },
  buttonModal: {
    marginVertical: 10,
    backgroundColor: "#b7b7a4"
  },
  container: {
    backgroundColor: "#cb997e"
  }
})