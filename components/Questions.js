import React from "react"

export default function Questions(props)
{
    if (!props.question) {
  
  return <p>Loading...</p>;
}


 const quiz_elem = props.question.map((ques,index) => (
  <div className="question_content" key={index}>
  <h3>{ques.question}</h3>
  <div className="options_container">
    {ques.answers.map((answer, answerIndex) => (
     
      <React.Fragment key={answerIndex}>
        <input
          type="radio"
          id={`option${index}_${answerIndex}`}
          name={`option${index}`}
          value={answer}
          onChange = {()=>props.check_answer(index,ques,event,`option${index}_${answerIndex}`)}
        />
       <label
        htmlFor={`option${index}_${answerIndex}`}
        
        style={{
              backgroundColor:
                props.showState === true &&
                props.queStatus&&
                props.queStatus[index]&& 
                props.queStatus[index].label === `option${index}_${answerIndex}`
                  ?props.queStatus[index].isCorrect===true?'#94D7A2'
                  : '#F8BCBC': props.showState === true &&answer===props.question[index].correct_answer?'#94D7A2':'',
                  
                  opacity:
                     props.showState?answer===props.question[index].correct_answer?1:0.8:1
                                                                          
              }}

>
          {answer}
        </label>
      </React.Fragment>
    ))}
  </div>
  <hr />
</div>

));



    return(
        
    <div className="question_container">
           {quiz_elem}
         
          <div className="res_container">
           {props.showState===true&& <p className="results">You scored {props.correctAnswers}/{props.question.length} answers </p>}
           <button className="check_answers" 
              onClick={!props.showState ? () => props.show_result(props.queStatus) : props.start}>
                   
           {!props.showState ? "Check Answers" : "Play Again"} 
           </button>

 


            </div> 
           <img className="bottom_image" src="./icons/blue_bubble.svg" alt="blue bubble icon"/>
           <img className="top_image" src="./icons/yellow_bubble.svg" alt="yellow bubble icon"/> 
         
    </div>
    )
}