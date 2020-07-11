import React, { useState, useEffect } from "react";
import axios from "axios";
import Question from "../components/Question.jsx";
import "../styling/homepage.css";

const Trivia = () => {
  const [questions, setQuestions] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/questions`).then((res) => {
      setQuestions(res.data);
      setTotalQuestions(res.data.length);
      console.log(res.data);
      console.log(res.data.length);
    });
  }, []);
  const proceed = (e) => {
    e.preventDefault();
    setActiveQuestion(activeQuestion + 1);
  };
  const back = (e) => {
    e.preventDefault();
    setActiveQuestion(activeQuestion - 1);
  };
  const addAnswers = (formData) => {
    const values = {};
    let totalValue = 0;
    for (var pair of formData.entries()) {
      var key = pair[0];
      var value = pair[1];

      totalValue += parseFloat(value);
      if (values[key]) {
        if (!(values[key] instanceof Array)) {
          values[key] = new Array(values[key]);
        }
        values[key].push(value);
      } else {
        values[key] = value;
      }
    }
    setTotalCorrectAnswers(totalValue);
    console.log(values);
  };
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addAnswers(formData);
    setShowResults(true);
  };

  return (
    <div className="App">
      {!showResults && questions && (
        <form onSubmit={submit}>
          {questions.map((data, i) => {
            const allAnswers = [
              {
                id: 0,
                answer: data.correct_answer,
                correct: 1,
              },
            ];
            data.incorrect_answers.forEach((answer, i) => {
              allAnswers.push({
                id: i + 1,
                answer: answer,
                correct: 0,
              });
            });
            return (
              <Question
                key={i}
                name={`q-${i}`}
                heading={data.heading}
                question={data.question}
                visible={i === activeQuestion}
                answers={allAnswers}
              />
            );
          })}
          {activeQuestion > 0 && activeQuestion + 1 !== totalQuestions && (
            <button onClick={back}>Previous</button>
          )}
          {activeQuestion + 1 < totalQuestions &&
            activeQuestion + 1 !== totalQuestions && (
              <button onClick={proceed}>Next</button>
            )}

          {activeQuestion + 1 === totalQuestions && (
            <button type="submit">Submit</button>
          )}
        </form>
      )}

      {showResults && (
        <p>
          You got {totalCorrectAnswers} out of {totalQuestions}
        </p>
      )}
    </div>
  );
};

export default Trivia;
