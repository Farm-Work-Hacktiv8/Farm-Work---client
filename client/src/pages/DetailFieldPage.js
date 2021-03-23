import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Title, Modal, Portal, TextInput, ActivityIndicator, Colors, Snackbar, Appbar } from 'react-native-paper'
import FieldItem from '../components/FieldItem'
import { getPlants, addPlants, error } from "../store/action"

export default function DetailFieldPage({ route, navigation }) {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const { fieldsId } = route.params
  const plants = useSelector(state => state.plants)
  const access_token = useSelector(state => state.access_token)
  const loading = useSelector(state => state.loading)
  const errorData = useSelector(state => state.error)
  const [plantName, setPlantName] = useState('')
  const [harvestTime, setHarvestTime] = useState('')
  const [snackbar, setSnackbar] = useState(false)

  useEffect(() => {
    if (access_token) {
      dispatch(getPlants(fieldsId, access_token))
    } else {
      console.log("No access token")
    }
  }, [access_token, dispatch])

  useEffect(() => {
    if (errorData) {
      setSnackbar(true)
    }
  }, [errorData])

  const showModal = () => { setVisible(true) }
  const hideModal = () => { setVisible(false) }

  const handleAdd = () => {
    const payload = {
      plantName,
      harvestTime,
      fieldsId
    }
    console.log(payload, 'from pages')
    dispatch(addPlants(payload, fieldsId, access_token))
    setVisible(false)
  }

  function handleSnackbar() {
    dispatch(error(""))
    setSnackbar(false)
  }

  async function handleLogout() {
    try {
      setAccess_token("")
      await SecureStore.deleteItemAsync('username')
      await SecureStore.deleteItemAsync('password')
      navigation.navigate("Auth")
    } catch (error) {
      console.log(error, "<<< erorr logout");
    }
  }

  if (loading) {
    return <ActivityIndicator size={100} animating={true} color={Colors.blue800} style={styles.loading} />
  } else {
    return (
      <View style={styles.container}>
        <Appbar style={styles.appbar}>
          <Title style={styles.textAppbar}>FarmWork</Title>
          <Appbar.Action icon="logout" onPress={handleLogout} style={styles.appbarItem}/>
        </Appbar>
        <ScrollView style={styles.container}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              <Title>Plant Detail</Title>
              <TextInput
                style={styles.textInput}
                label="Plant Name:"
                mode="outlined"
                placeholder="Put your plant name here"
                onChangeText={(text) => setPlantName(text)}
              />
              <TextInput
                style={styles.textInput}
                label="Harvest Time:"
                mode="outlined"
                placeholder="Estimate day for harvesting your plant"
                keyboardType="numeric"
                onChangeText={(text) => setHarvestTime(text)}
              />
              <Button
                onPress={handleAdd}
                mode="contained"
                style={styles.buttonModal}
              >
                Submit
              </Button>
            </Modal>
          </Portal>
          {/* Start of page */}
          <Title style={styles.title}>Your Plant</Title>
          <Button icon="ballot" mode="contained" style={styles.button} onPress={showModal}>Add Plant</Button>
          {
            plants.length === 0 ?
              <View style={styles.container}>
                <Text style={styles.textEmpty}>Plant is empty</Text>
                <Text style={styles.textEmpty}>Add one or more plants first</Text>
              </View> :
              plants.map((data) => {
                return <FieldItem data={data} key={data.id} navigation={navigation} />
              })
          }
        </ScrollView>
        <Snackbar visible={snackbar} onDismiss={handleSnackbar} style={styles.snackbar} duration={4000}>
          {errorData}
        </Snackbar>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
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
  textEmpty: {
    fontSize: 30
  },
  textInput: {
    height: 45
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cb997e",
  },
  appbarItem: {
    
  },
  appbar: {
    justifyContent: "flex-end",
    paddingTop: 8
  },
  textAppbar: {
    color: "white"
  }
})