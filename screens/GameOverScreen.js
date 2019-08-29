import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Game is Over</Text>
      <Text>Number of rounds:</Text>
      <NumberContainer>{props.rounds}</NumberContainer>
      <Text>The user number was:</Text>
      <NumberContainer>{props.userNumber}</NumberContainer>
      <Button title="PLAY AGAIN" onPress={props.onStartAgain} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  }
})

export default GameOverScreen
