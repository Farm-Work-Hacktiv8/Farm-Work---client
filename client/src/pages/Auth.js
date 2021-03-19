import React, { useState } from 'react'
import SwitchSelector from 'react-native-switch-selector'
import { View, Text, StyleSheet } from 'react-native'
import { Card, TextInput, Button, ToggleButton } from 'react-native-paper'


export default function Auth (props) {

  const navigation = props.navigation
  const [status, setStatus] = useState('register')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const option = [{ label: 'Register', value: 'register'}, { label: 'Login', value: 'login' }]


  function updateUsername (text) {
    setUsername(text)
  }

  function updateEmail (text) {
    setEmail(text)
  }

  function updatePassword (text) {
    setPassword(text)
  }

  function confirmRegister (e) {
    e.preventDefault()
    console.log(username, email, password)
  }

  function confirmLogin (e) {
    e.preventDefault()
    console.log(username, password)
    navigation.navigate('HomePage')
  }

  function changePage (value) {
    setStatus(value)
  }

  console.log(email)

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
          onChangeText={text => updateUsername(text)}
        />
        { status === 'register' ? 
          <TextInput 
          style={ styles.input }
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={text => updateEmail(text)}
          /> : <View></View>
        }
        <TextInput 
          style={ styles.input }
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          value={password}
          onChangeText={text => updatePassword(text)}
        />
        { status === 'register' ? 
          <Button mode="contained" style={ styles.btn } onPress={e => confirmRegister(e)}>Register</Button> :
          <Button mode="contained" style={ styles.btn } onPress={e => confirmLogin(e)}>Login</Button>
        }
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  cardRegister: {
    flex: 1,
    minHeight: 380,
    marginTop: "10%",
    marginHorizontal: 30
  },
  cardLogin: {
    flex: 1,
    minHeight: 320,
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
  titleText: {
    fontSize: 25
  },
  input: {
    marginHorizontal: 25,
    height: 40,
    marginBottom: 20
  },
  btn: {
    marginVertical: 10,
    marginHorizontal: 70
  },
  slideBtn: {
    borderRadius: 0
  }
})