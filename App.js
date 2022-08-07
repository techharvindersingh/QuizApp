/**
 * Sample Quiz App
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

// import {Colors} from 'react-native/Libraries/NewAppScreen';
import Questions from './assets/Question.json';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dataItem = Questions;
  const [displayQuesIndex, setDisplayQuesIndex] = useState(0);
  const [timeRemains, setRemainsTime] = useState(30);
  const [answer, setAnswer] = useState(null);
  const [indexOfAnswerBtn, setIndexOfAnswerBtn] = useState(null);
  const backgroundStyle = {
    backgroundColor: 'skyblue',
    flex: 1,
  };
  const [testComplete, setTestComplete] = useState(false);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (timeRemains - 1 > 0 && !nextQuestion) {
        setRemainsTime(val => val - 1);
      } else {
        if (displayQuesIndex >= 9) {
          setTestComplete(true);
        } else {
          ChangeQuestion();
        }
      }
    }, 1000);
  }, [timeRemains]);

  const ChangeQuestion = () => {
    setNextQuestion(false);
    setDisplayQuesIndex(displayQuesIndex + 1);
    setRemainsTime(30);
    setAnswer(null);
    setIndexOfAnswerBtn(null);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {!testComplete ? (
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Quiz App</Text>
          <View style={styles.countdownSection}>
            <Text style={styles.countdownText}>
              Question {displayQuesIndex + 1}/{Questions.length}
            </Text>
            <Text style={styles.countdownText}>
              Time 00:{timeRemains < 10 ? `0${timeRemains}` : timeRemains}
            </Text>
          </View>
          <Text style={styles.questionStyle}>
            {dataItem[displayQuesIndex]?.question}
          </Text>
          {dataItem[displayQuesIndex].options.map((item, index) => (
            <TouchableOpacity
              key={index}
              disabled={answer}
              style={[
                styles.optionButton,
                {
                  backgroundColor:
                    !answer || indexOfAnswerBtn != index
                      ? '#fff'
                      : dataItem[displayQuesIndex]?.answer == item
                      ? '#00ff00'
                      : '#ff0000',
                },
              ]}
              onPress={() => {
                setAnswer(item);
                setIndexOfAnswerBtn(index);
                if (dataItem[displayQuesIndex]?.answer == item) {
                  setCorrectAnswer(val => val + 1);
                } else {
                  setWrongAnswer(val => val + 1);
                }
                if (timeRemains > 3) {
                  setTimeout(() => {
                    setNextQuestion(true);
                  }, 2000);
                }
              }}>
              <Text style={{fontSize: 18, alignSelf: 'center'}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={[styles.headerTitle, {justifyContent: 'center'}]}>
          <Text style={styles.headerTitleText}>
            Test Completed Successfully
          </Text>
          <Text>Total Attempted Ques: {correctAnswer + wrongAnswer}</Text>
          <Text>Total Correct: {correctAnswer}</Text>
          <Text>Total Wrong: {wrongAnswer}</Text>

          <TouchableOpacity
            style={styles.RestartButton}
            onPress={() => {
              setNextQuestion(false);
              setDisplayQuesIndex(0);
              setRemainsTime(30);
              setAnswer(null);
              setIndexOfAnswerBtn(null);
              setCorrectAnswer(0);
              setWrongAnswer(0);
              setTestComplete(false);
            }}>
            <Text style={{fontWeight: 'bold', color: '#fff'}}>
              Restart Test
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  headerTitle: {
    flex: 1,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 30,
    color: '#fff',
  },
  countdownSection: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  countdownText: {fontWeight: 'bold', fontSize: 13},
  questionStyle: {fontSize: 20, marginVertical: 60},
  optionButton: {
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    marginBottom: 20,
    borderRadius: 15,
    justifyContent: 'center',
  },
  RestartButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginTop: 70,
  },
});

export default App;
