import React, { useState } from 'react';

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

const Question = (props) => {
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [selectedAnswerValue, setSelectedAnswerValue] = useState(null); 

  // set up answer options 
  const answerOptions = [];
  props.incorrectAnswers.forEach( (answer) => {
    answerOptions.push(answer);
  })
  answerOptions.push(props.correctAnswer);
  shuffle(answerOptions);
  answerOptions.unshift("Select One")

  // update selected answer value as user interacts with select form
  const onInputChange = (event) => {
   setSelectedAnswerValue(event.target.value);
  }

  // check submitted answer 
  const submitAnswer = (event) => {
    event.preventDefault();

    setSelectedAnswer(true);

    if (selectedAnswerValue === props.correctAnswer) {
      props.updateScoreCallback(props.currentScore);
    } 

  }

  // update current question
  const getNextQuestion = () => {
    props.updateCountCallback(props.currentQuestion);
    setSelectedAnswer(false);
  }

  return (
    <div>
      {
        selectedAnswer
        ? 
          <div>
            { 
              selectedAnswerValue === props.correctAnswer
              ? 
                <div>
                  <p>Correct! The right answer was indeed {props.correctAnswer}.</p>
                </div>
              :
                <div>
                  <p>Incorrect :( The right answer was actually {props.correctAnswer}, not {selectedAnswerValue}.</p>
                </div>
            }
            
            <button onClick={getNextQuestion}>Next Question</button>
          </div>
        : 
          <div>
            <h2>Question # {props.displayNum}</h2>

            <p>{props.questionText}</p>

            <form onSubmit={submitAnswer}> 

              <select id="question" name="question" onChange={onInputChange}>
                {answerOptions.map(answerText => <option value={answerText} key={answerText}> {answerText} </option>)}
              </select>

              <br></br>

              <input type="submit" value="Check Answer"/>
            </form> 
          </div> 
      }
    </div>
  );
}

export default Question;