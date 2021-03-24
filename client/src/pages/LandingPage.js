import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { Button, Headline, Paragraph, Title } from "react-native-paper"
import { Kalam_300Light, Kalam_400Regular, Kalam_700Bold, useFonts } from '@expo-google-fonts/kalam'

const image = { uri: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" };

export default function LandingPage({ navigation }) {
  const [fontKalam] = useFonts({ Kalam_700Bold, Kalam_400Regular, Kalam_300Light })

  function handleNext() {
    navigation.navigate('Auth')
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image} imageStyle={styles.background}>
        <View styles={styles.containerText}>
          <Headline style={styles.header}>FarmWork App</Headline>
          <Title style={styles.motto}>Our Motto</Title>
          <Paragraph style={styles.paragraph}>to help some of harvest technology to improve efficiency, better manage and optimize field activities.</Paragraph>
          <View style={styles.containerBtn}>
            <Button color="white" style={styles.button} mode="outlined" onPress={handleNext}>Start Now</Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    elevation: 2,
    backgroundColor: "#ffe8d6"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    paddingTop: 60,
    elevation: 1,
  },
  containerText: {
    flex: 1,
    flexDirection: "column",
    elevation: 2,
    backgroundColor: "rgba(245,245,245,2)",
  },
  header: {
    fontSize: 50,
    fontFamily: "Kalam_700Bold",
    paddingTop: 40,
    marginHorizontal: 10,
    color: "#2b2d42",
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 25,
    fontFamily: 'Kalam_400Regular',
    paddingTop: 20,
    color: "#2b2d42",
    textAlign: "center",
    lineHeight: 30,
    paddingHorizontal: 5
  },
  button: {
    borderWidth: 2,
    borderColor: "#dcdcdc",
    width: "50%",
    borderRadius: 20,
    marginTop: 150,
    // marginHorizontal: 90,
    backgroundColor: "#cb997e",
    elevation: 2,
    alignSelf: "center"
  },
  containerBtn: {
    justifyContent: "flex-end",
  },
  motto: {
    fontSize: 25,
    fontFamily: 'Kalam_400Regular',
    paddingTop: 20,
    color: "#2b2d42",
    textAlign: "center",
  },
  background: {
    opacity: 0.68
  }
})