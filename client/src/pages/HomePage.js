import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { View, StyleSheet, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Modal, Portal, TextInput, Title, ActivityIndicator, Colors, Snackbar, Appbar } from 'react-native-paper'
import HomeItem from '../components/HomeItem'
import { getFields, addField, error, setAccess_token } from "../store/action"
import * as SecureStore from 'expo-secure-store'

export default function HomePage({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [fieldName, setFieldName] = useState('')
  const [fieldArea, setFieldArea] = useState("0")
  const [snackbar, setSnackbar] = useState(false)
  const dispatch = useDispatch()
  const fields = useSelector(state => state.fields)
  const access_token = useSelector(state => state.access_token)
  const loading = useSelector(state => state.loading)
  const errorData = useSelector(state => state.error)

  useEffect(() => {
    if (access_token) {
      dispatch(getFields(access_token))
    } else {
      navigation.navigate('Auth')
      console.log('no acces token')
    }
  }, [access_token, dispatch])

  useEffect(() => {
    if (errorData) {
      setSnackbar(true)
    }
  }, [errorData])

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
  } else if (!access_token) {
    return <Title>No access token</Title>
  } else {
    return (
      <View style={styles.container}>
        <Appbar style={styles.appbar}>
          <Title style={styles.textAppbar}>FarmWork</Title>
          <Appbar.Action icon="logout" onPress={handleLogout} style={styles.appbarItem}/>
        </Appbar>
        <ScrollView>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={() => setVisible(false)}
              contentContainerStyle={styles.modal}
            >
              <Title>Add Field</Title>
              <TextInput
                style={styles.textInput}
                label="Field Name"
                mode="outlined"
                placeholder="name your field"
                value={fieldName}
                onChangeText={text => setFieldName(text)}
              />
              <TextInput
                style={styles.textInput}
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
          {/* End of Modal */}
          <Title style={styles.title}>Your Field</Title>
          <Button icon="ballot" mode="contained" style={styles.buttonAdd} onPress={() => setVisible(true)}>Add</Button>
          {
            fields.length === 0 ?
              <View style={styles.containerEmpty}>
                <Text style={styles.textEmpty}>Fields is empty</Text>
                <Text style={styles.textEmpty}>Add one or more fields first</Text>
              </View> :
              fields && fields.map((data) => {
                return <HomeItem data={data} key={data.id} navigation={navigation} />
              })
          }
        </ScrollView>
        {/* End of scroll view */}
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
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cb997e",
  },
  snackbar: {
    backgroundColor: '#22223b',
  },
  appbarItem: {
    
  },
  appbar: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 8
  },
  textAppbar: {
    color: "white"
  }
})