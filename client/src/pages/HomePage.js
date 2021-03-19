import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Card, Modal, Portal, TextInput, Title } from 'react-native-paper'

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
  return (
    <View>
      <ScrollView>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Title>Fields Detail</Title>
            <TextInput label="Fields Name:" placeholder="please enter a name..." onChange={(text) => { setNewField({ ...newField, name: text }) }} />
            <TextInput label="Space of Farm:" placeholder="in metre/square" keyboardType="numeric" onChange={(text) => { setNewField({ ...newField, widthField: text }) }} />
            <Button onPress={handleAdd}>Submit</Button>
          </Modal>
        </Portal>
        <Title style={styles.title}>Your Field</Title>
        <Button icon="ballot" mode="contained" style={styles.buttonAdd} onPress={showModal}>Add Field</Button>
        <Card>
          <Card.Cover
            source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }}
          />
          <Card.Content>
            <Title>Field Name A</Title>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.push('Detail Field')} >Details</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover
            source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }}
          />
          <Card.Content>
            <Title>Field Name B</Title>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.push('Detail Field')} >Details</Button>
          </Card.Actions>
        </Card>
        <Card>
          <Card.Cover
            source={{ uri: "https://img.freepik.com/free-vector/colorful-farm-landscape-cartoon-style_52683-16677.jpg?size=626&ext=jpg" }}
          />
          <Card.Content>
            <Title>Field Name C</Title>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.push('Detail Field')} >Details</Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    textAlign: 'center',
  },
  buttonAdd: {
    width: "30%",
    marginVertical: 20
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  }
})