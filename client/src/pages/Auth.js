import React, { useState, useEffect } from 'react'
import SwitchSelector from 'react-native-switch-selector'
import { View, Text, StyleSheet } from 'react-native'
import { Card, TextInput, Button, ToggleButton } from 'react-native-paper'
import * as SecureStore from 'expo-secure-store'


export default function Auth (props) {

  const navigation = props.navigation
  const [status, setStatus] = useState('register')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const option = [{ label: 'Register', value: 'register'}, { label: 'Login', value: 'login' }]

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth () {
    try {
      const storeUsername = await SecureStore.getItemAsync('username')
      const storePassword = await SecureStore.getItemAsync('password')
      if (username && password) {
        setUsername(storeUsername)
        setPassword(storePassword)
        confirmLogin()
      }
    } catch (err) {
      console.log(err)
    }
  }

  function confirmRegister (e) {
    e.preventDefault()
    console.log(username, firstName, lastName, email, password)
  }

  async function confirmLogin () {
    try {
      // console.log(username, password)
      //await SecureStore.setItemAsync('username', username)
      //await SecureStore.setItemAsync('password', password)
      const storeUsername = await SecureStore.getItemAsync('username')
      const storePassword = await SecureStore.getItemAsync('password')
      console.log(storeUsername, storePassword)
    } catch(err) {
      console.log(err)
    }
    //if (username && password) {
    //  navigation.navigate('HomePage')
    //}
  }

  function changePage (value) {
    setStatus(value)
  }

  return (
    <View>
      <Card style={ status === 'register' ? styles.cardRegister : styles.cardLogin }>
        <SwitchSelector 
          style={ styles.switchSelector }
          options={option}
          initial={0}
          hasPadding
          fontSize={16}
          textColor={'rgb(97, 0, 237)'}
          selectedColor="white"
          buttonColor="rgb(97, 0, 237)"
          borderColor="rgb(97, 0, 237)"
          onPress={value => changePage(value)}
        />
        <TextInput 
          style={ styles.input }
          label="Username"
          mode="outlined"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        { status === 'register' ? 
          <View style={ styles.fullNameContainer }>
            <TextInput 
              style={ [styles.nameInput, styles.nameLeft] }
              label="First Name"
              mode="outlined"
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <TextInput 
              style={ [styles.nameInput, styles.nameRight] }
              label="Last Name"
              mode="outlined"
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
          </View>
          : <View></View>
        }
        { status === 'register' ? 
          <TextInput 
            style={ styles.input }
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          : <View></View>
        }
        <TextInput 
          style={ styles.input }
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        { status === 'register' ? 
          <Button mode="contained" style={ styles.btn } onPress={e => confirmRegister(e)}>Register</Button> :
          <Button mode="contained" style={ styles.btn } onPress={confirmLogin}>Login</Button>
        }
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  cardRegister: {
    flex: 1,
    minHeight: 420,
    marginTop: "10%",
    marginHorizontal: 30
  },
  cardLogin: {
    flex: 1,
    minHeight: 300,
    marginTop: "10%",
    marginHorizontal: 30
  },
  switchSelector: {
    marginVertical: 25,
    marginHorizontal: 25
  },
  switchContainer: {
    backgroundColor: '#DCDCDC'
  },
  fullNameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 25,
  },
  nameInput: {
    flex: 1,
    width: 130,
    margin: 0,
    height: 40,
    marginBottom: 15
  },
  nameLeft: {
    marginRight: 7
  },
  nameRight: {
    marginLeft: 7
  },
  input: {
    marginHorizontal: 25,
    height: 40,
    marginBottom: 15
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 70
  },
  slideBtn: {
    borderRadius: 0
  }
})