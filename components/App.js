import React from "react"
import Start from "./Start.js"
import Questions from "./Questions.js"
import he from 'he'
export default function App()
{
 
 const [formatedArr,setFormatedArr] = React.useState([]);
 const [AnswersState, setAnswersState] = React.useState([]);
 const [showRes,setShowRes] = React.useState(false);
 const [correctAnswers,setCorrectAnswers] = React.useState(0);
 const [started,setStarted] =  React.useState(false);


 
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};



function start()
{
  setStarted(prevVal=>!prevVal)
}
function restart()
{
    setStarted(prevVal=>!prevVal)
    setAnswersState([])
    setShowRes(false)
    setCorrectAnswers(0)
    
    
}
const handleAnswerChange = (index, answer, event,lIndex) => {
  setAnswersState((prevAnswersState) => {
    const newAnswersState = [...prevAnswersState];
    newAnswersState[index] = {
      isCorrect: event.target.value === answer.correct_answer,
      index: index,
      label:lIndex
    };
    return newAnswersState;
  });
  
  
};



function show_result(answers)
{
    let vv = 0;
    setShowRes(true)
    answers&&
    answers.forEach(answer=>{
        if( answer&&answer.isCorrect===true)
        vv++;
    })
    setCorrectAnswers(vv);
   
}



React.useEffect(() => {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then((res) => res.json())
    .then((data) => {
      if (data.results && Array.isArray(data.results)) {
        setFormatedArr(
          data.results.map((element) => {
            const shuffledAnswers = shuffleArray([
              he.decode(element.correct_answer),
              ...element.incorrect_answers.map((e) => he.decode(e)),
            ]);

            return {
              question: he.decode(element.question),
              answers: shuffledAnswers,
              correct_answer: he.decode(element.correct_answer),
            };
          })
        );
      }
    })
    .catch((error) => console.error("Error fetching question:", error));
}, [started]);






    return(
        
       <main>
          {!started && <Start 
          start= {start}/>}
         {started && <Questions
          question={formatedArr}     
          check_answer={handleAnswerChange}
          show_result={show_result}
          queStatus = {AnswersState}
          showState={showRes}
          correctAnswers={correctAnswers}
          start= {restart}
          
         />}
        </main>
    )
   
}