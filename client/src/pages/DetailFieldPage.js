import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Title, Modal, Portal, TextInput } from 'react-native-paper'
import FieldItem from '../components/FieldItem'

export default function DetailFieldPage({ navigation }) {
  const [visible, setVisible] = useState(false)
  const item = ["Plant A", "Plant B", "Plant C"]

  const showModal = () => { setVisible(true) }
  const hideModal = () => { setVisible(false) }
  const handleAdd = () => {
    setVisible(false)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Portal>
          <Modal 
            visible={visible} 
            onDismiss={hideModal} 
            contentContainerStyle={styles.modal}
          >
            <Title>Plant Detail</Title>
            <TextInput label="Plant Name:" mode="outlined" placeholder="Put your plant name here"/>
            <TextInput label="Harvest Time:" mode="outlined" placeholder="Enter estimate day for harvesting your plant" keyboardType="numeric"/>
            <Button onPress={handleAdd}>Submit</Button>
          </Modal>
        </Portal>
        <Title style={styles.title}>Your Plant</Title>
        <Button icon="ballot" mode="contained" style={styles.button} onPress={showModal}>Add Plant</Button>
        {
          item.map((data, index) => {
            return <FieldItem data={data} key={index} navigation={navigation}/>
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
  button: {
    width: "40%",
    marginVertical: 20,
    marginHorizontal: 110
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
  },
  container: {
    backgroundColor: "#cb997e"
  }
})