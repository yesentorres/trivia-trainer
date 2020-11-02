import React, { useState } from 'react';
import Question from './Question.js'
import questionData from '../data/questions.json'

// helper function to shuffle array, using Fisher-Yates Shuffling Algorithm
const shuffle = (array) => {
  let j, x, i;

  for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
  }

  return array;
}

const Round = () => {
  const [roundInitiated, setRoundInitiated] = useState(false);
  const [roundQuestions, setRoundQuestions] = useState([]);
  const [questionCount, setQuestionCount] = useState(null); 
  const [score, setScore] = useState(null);

  // randomly select 10 questions for each round 
  const selectRoundQuestions = (allQuestions) => {

    const chosenQuestions = [];

    shuffle(allQuestions); 

    for (let i = 0; i <10 ; i++) {
      chosenQuestions.push(questionData[i]);
    }

    setRoundQuestions(chosenQuestions);
  }

  const startRound = () => {
    setRoundInitiated(true);
    selectRoundQuestions(questionData); 
    setQuestionCount(0);
    setScore(0);
  }

  const updateScore = (oldScore) => {
    setScore(oldScore + 1);
  }

  const updateQuestionCount = (oldCount) => {
    setQuestionCount(oldCount +1);

    if (questionCount === 10) {
      setRoundInitiated(false);
    }
  }

  return (
    <div>
      {
        roundInitiated && questionCount < 10
        ? 
          <div>
            < Question 
              currentQuestion = {questionCount}
              displayNum = {questionCount + 1}
              questionText = {roundQuestions[questionCount].question}
              incorrectAnswers = {roundQuestions[questionCount].incorrect}
              correctAnswer = {roundQuestions[questionCount].correct}
              currentScore={score}
              updateScoreCallback = {updateScore}
              updateCountCallback = {updateQuestionCount}
            /> 
          </div>

        : 
          <div>
            {
              questionCount === 10 
              ? 
                <div>
                  <h2>Final Score: {score}</h2>
                  <button onClick={startRound}> Start a New Round </button>
                </div> 
              :
                <div>
                  <h3> Welcome to Trivia Trainer! This is an app designed to help sharpen your trivia skills. Each round consists of 10 unique questions. Your final score will be tallied at the end of each round.</h3>
                  <h3><em>Ready to get your trivia on?</em></h3>
                  <button onClick={startRound}> Begin Round </button>
                </div>
            }
          </div>
      }
    </div>
  );
}

export default Round;