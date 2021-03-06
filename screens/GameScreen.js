import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Alert, ScrollView, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min) + min)
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderListItem = (listLength, itemData) => {
  return (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>{itemData.item}</BodyText>
    </View>
  )
}
// const renderListItem = (value, index) => {
//   return (
//     <View key={value} style={styles.listItem}>
//       <BodyText>#{index}</BodyText>
//       <BodyText>{value}</BodyText>
//     </View>
//   )
// }

const GameScreen = props => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setpastGuesses] = useState([initialGuess.toString()])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const { userChoice, onGameOver } = props

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that it's wrong...", [
        { text: 'Sorry!', style: 'cancel' }
      ])
      return
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )
    setCurrentGuess(nextNumber)
    setpastGuesses(curRounds => [nextNumber.toString(), ...curRounds])
  }

  return (
    <View style={styles.screen}>
      <BodyText>Opponent's Guess</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}> */}
        {/*   {pastGuesses.map((guess, index) => */}
        {/*     renderListItem(guess, pastGuesses.length - index) */}
        {/*   )} */}
        {/* </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  },
  listContainer: {
    width: '60%',
    // width: '80%',
    flex: 1
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'space-between',
    width: '100%'
    // width: '60%'
  }
})

export default GameScreen
