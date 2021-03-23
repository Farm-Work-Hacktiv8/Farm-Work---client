import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { View, StyleSheet, Text } from 'react-native'
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
  const access_token = useSelector(state => state.access_token)

  useEffect(() => {
    if (access_token) {
      dispatch(getFields(access_token))
    } else {
      navigation.navigate('Auth')
      console.log('no acces token')
    }
  }, [access_token, dispatch])

  function handleAdd() {
    const payload = {
      fieldName,
      fieldArea
    }
    dispatch(addField(payload, access_token))
    handleCancel()
  }

  function handleCancel() {
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
              style={ styles.textInput }
              label="Field Name"
              mode="outlined"
              placeholder="name your field"
              value={fieldName}
              onChangeText={text => setFieldName(text)}
            />
            <TextInput
              style={ styles.textInput }
              label="Field Area"
              mode="outlined"
              placeholder="In Hectare"
              keyboardType="numeric"
              value={fieldArea}
              onChangeText={text => setFieldArea(text)}
            />
            <Button onPress={handleAdd} style={styles.buttonModal} mode="outlined">Submit</Button>
          </Modal>
        </Portal>
        <Title style={styles.title}>Your Field</Title>
        <Button icon="ballot" mode="contained" style={styles.buttonAdd} onPress={() => setVisible(true)}>Add</Button>
        {
          fields.length === 0 ?
            <View style={styles.containerEmpty}>
              <Text style={styles.textEmpty}>Fields is empty</Text>
              <Text style={styles.textEmpty}>Add one or more fields first</Text>
            </View> : 
            fields.map((data) => {
            return <HomeItem data={data} key={data.id} navigation={navigation} />
          })
        }
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonAdd: {
    width: "40%",
    marginVertical: 20,
    marginHorizontal: 110
  },
  modal: {
    backgroundColor: '#ffe8d6',
    padding: 20,
    maxWidth: "95%",
    marginHorizontal: 20
  },
  buttonModal: {
    marginVertical: 10,
    backgroundColor: "#cb997e"
  },
  container: {
    flex: 1,
    backgroundColor: "#cb997e",
  },
  containerEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  textEmpty: {
    fontSize: 30
  },
  textInput: {
    height: 45
  }
})