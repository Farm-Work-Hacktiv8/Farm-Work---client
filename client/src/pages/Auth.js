import React, { useState, useEffect } from 'react'
import SwitchSelector from 'react-native-switch-selector'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Card, TextInput, Button} from 'react-native-paper'
import { register, login } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'
import * as SecureStore from 'expo-secure-store'

export default function Auth (props) {

  const navigation = props.navigation
  const [status, setStatus] = useState('login')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const option = [{ label: 'Login', value: 'login' }, { label: 'Register', value: 'register' }]
  const access_token = useSelector(state => state.access_token)
  const dispatch = useDispatch()
  

  useEffect(() => {
    if (access_token) {
      navigation.navigate('HomePage')
    } else {
      checkAuth()
    }
  }, [access_token])

  async function checkAuth () {
    try {
      const storeUsername = await SecureStore.getItemAsync('username')
      const storePassword = await SecureStore.getItemAsync('password')
      console.log(storeUsername, storePassword, 'login from secureStore')
      if (storeUsername && storePassword) {
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
    //console.log(username, firstName, lastName, email, password)
    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password
    }
    dispatch(register(newUser))
  }

  async function confirmLogin () {
    try {
      await SecureStore.setItemAsync('username', username)
      await SecureStore.setItemAsync('password', password)
      const storeUsername = await SecureStore.getItemAsync('username')
      const storePassword = await SecureStore.getItemAsync('password')
      console.log(storeUsername, storePassword, 'from store in login')
    } catch(err) {
      console.log(err)
    }
    // if (username && password) {
      dispatch(login({username, password}), navigation)
    // }
  }

  function changePage (value) {
    setStatus(value)
  }

  return (
    <ScrollView style={ styles.container }>
      <Card style={ status === 'register' ? styles.cardRegister : styles.cardLogin }>
        <SwitchSelector 
          style={ styles.switchSelector }
          options={option}
          initial={0}
          hasPadding
          fontSize={16}
          textColor={'#22223b'}
          selectedColor="white"
          buttonColor="#22223b"
          borderColor="#22223b"
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cb997e'
  },
  cardRegister: {
    flex: 1,
    minHeight: 420,
    marginTop: "25%",
    marginHorizontal: 30,
    backgroundColor: '#ffe8d6'
  },
  cardLogin: {
    flex: 1,
    minHeight: 300,
    marginTop: "25%",
    marginHorizontal: 30,
    backgroundColor: '#ffe8d6'
  },
  switchSelector: {
    marginVertical: 25,
    marginHorizontal: 25
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