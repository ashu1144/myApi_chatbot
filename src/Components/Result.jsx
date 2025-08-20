import React, { useEffect , useState } from 'react'
import { anyWhereDoubleStars, checkHeading, cleanDoubleStars } from './helper'


const Result = ({ans}) => {

    const [heading, setheading] = useState(false)
    const [answers, setanswers] = useState("")
    


    useEffect(() => {
        if(checkHeading(ans)){
            setheading(true)
            setanswers(cleanDoubleStars(ans))
        }
        else{
            setheading(false)
            setanswers(anyWhereDoubleStars(ans))
            
        }
     
    }, [ans])
    



  return (


    <div >
       {heading?(<span className='py-5 font-extrabold text-lg'>{answers}</span>):(<span className='py-5 text-md' >{answers}</span>)}
    </div>
  )
}

export default Result