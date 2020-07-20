import React from "react";
import Answer from "./Answer";
import decode from "./../utils/decode";

export default (data) => {
  const fieldset = data.visible ? "fieldset" : "fieldset u-hidden";
  const questionNo = data.name;
  let answers = data.answers;
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return (
    <div className={fieldset}>
      <h2>{decode(data.heading)}</h2>
      <h3>{decode(data.question)}</h3>
      {answers &&
        shuffle(
          answers.map((data, i) => {
            return (
              <Answer
                key={i}
                name={questionNo}
                answer={data.answer}
                correct={data.correct}
              />
            );
          })
        )}
    </div>
  );
};
