import React, { useState } from "react";
import QuizData from "../components/QuizData";

const Trivia = () => {
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [quizEnd, setQuizEnd] = useState(false);
  const [score, setScore] = useState(0);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    axios.get(`/questions`).then((res) => {
      setTotalQuestions(res.data.results.length);
      setQuestions(res.data.results);
    });
  }, []);

  return (
    <div>
      <QuizData />
    </div>
  );
};

export default Trivia;