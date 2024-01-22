import React from "react"


export default function Start(props)
{
    return(
        
        <div className="start_page__container">
         
            <h2>Quizzical</h2>
           
            <p>Answer this five random questions to test your knowledge</p>
            
            <button className = "button_start" onClick={props.start}>Start quiz</button>
             <img className="bottom_image" src="./icons/blue_bubble.svg" alt="blue bubble icon"/>
             <img className="top_image" src="./icons/yellow_bubble.svg" alt="yellow bubble icon"/>
        </div>
    )
 
}