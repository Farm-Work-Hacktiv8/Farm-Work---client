import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Modal, Portal, TextInput, Title } from 'react-native-paper'
import HomeItem from '../components/HomeItem'
import { getFields, addField } from "../store/action"

export default function HomePage({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const [fieldArea, setFieldArea] = useState('')
  const dispatch = useDispatch()
  const fields = useSelector(state => state.fields)

  useEffect(() => {
    dispatch(getFields())
  }, [])

  function handleAdd () {
    const payload = {
      fieldName,
      fieldArea
    }
    dispatch(addField(payload))
    handleCancel()
  }

  function handleCancel () {
    setFieldArea('')
    setFieldName('')
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Portal>
          <Modal 
            visible={visible} 
            onDismiss={() => setVisible(false)} 
            contentContainerStyle={styles.modal}
          >
            <Title>Add Field</Title>
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
            <Button onPress={handleAdd} style={styles.buttonModal} mode="outlined">Submit</Button>
            <Button onPress={handleCancel} style={styles.buttonModal} mode="outlined">Cancel</Button>
          </Modal>
        </Portal>
        <Title style={styles.title}>Your Field</Title>
        <Button icon="ballot" mode="contained" style={styles.buttonAdd} onPress={() => setVisible(true)}>Add Field</Button>
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