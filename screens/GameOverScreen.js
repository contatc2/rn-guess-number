import React, { useState } from 'react'
import { StyleSheet, View, Button, Text, Alert, Image } from 'react-native'

import colors from '../constants/colors'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
  return (
    <View style={styles.screen}>
      <TitleText>The Game is Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <BodyText style={styles.resultText}>
        Your phone needed <Text style={styles.highlight}>{props.rounds}</Text>{' '}
        rounds to guess the number{' '}
        <Text style={styles.highlight}>{props.userNumber}</Text>.
      </BodyText>
      <MainButton onPress={props.onStartAgain}>PLAY AGAIN</MainButton>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: 'hidden',
    marginVertical: 30
  },
  image: {
    width: '100%',
    height: '100%'
  },
  highlight: {
    color: colors.primary,
    fontFamily: 'open-sans-bold'
  },
  resultText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 20
  }
})

export default GameOverScreen
