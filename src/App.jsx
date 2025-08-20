import { useEffect, useRef, useState } from 'react'
import './App.css'
import planeImg from './assets/slice1.png'
import { geminiUrl } from './constants'
import Result from './Components/Result'
import menu from './assets/menu.png'
import close from './assets/close.png'


function App() {

  const [query, setQuery] = useState("")
  const [results , setResults] = useState([])
  const [onFocus, setOnFocus] = useState(false)
  const[isOpen , setOpen]=useState(false)
  const [pastQuery , setPastQuery] = useState([])
  const [CureentQuery , setcurrentQuery] = useState([])
  const [Loading , setloading] = useState(false)



  function setQueryLocally() {
  let oldQueries = JSON.parse(localStorage.getItem("pastQuery")) || [];
  let newQueries = [...oldQueries, query];
  localStorage.setItem("pastQuery", JSON.stringify(newQueries));
  let CureentQueryVar = [...CureentQuery , query]
  setcurrentQuery(CureentQueryVar)
  setPastQuery(newQueries);
}



  
  const askQuestion = async() => {
  setQueryLocally()
  setloading(true)
  const payload = {
  "contents":[{
  "parts":[{"text":query}],
  }]
  }

    let response = await fetch(geminiUrl ,{method:"POST", body:JSON.stringify(payload)})
    response = await response.json()
    let DataString = response.candidates[0].content.parts[0].text
    DataString = DataString.split("* ")
    DataString.map((item)=>item.trim())
    setResults((prev)=>[...prev , DataString])
    setloading(false)
  }

  return (
  <div className='relative'>
  <div className=' grid grid-cols-5 h-screen text-center text-white '>
    {isOpen? <span className='w-15 h-15 absolute left-2 top-9'><img src={close} alt="" onClick={()=>setOpen(false)} /> </span> : <span className='w-15 h-15 absolute left-2 top-9' onClick={()=>setOpen(true)}><img src={menu} alt="" /></span> }
   
    {/* side bar */}
    <div className={` ${isOpen? "max-sm:col-span-5 col-span-1" : "hidden"}  bg-[#44403b]  transition-all duration-300 `}  >
      <h1 className='mt-20 text-left pl-2'>Search History</h1>
      <div className='flex flex-col gap-2 overflow-y-scroll scrollable overflow-hidden h-screen text-left pl-2 mt-2   '>{pastQuery.map((el)=>(<div>{el}</div>))}</div>
    </div>

    {/* main section */}
    <div className={`  ${isOpen? " max-sm:hidden col-span-4 " : "col-span-5 p-2 "}  col-span-4 bg-gradient-to-tl from-[#ed6aff] via-[#a684ff] to-[#4f39f6] transition-all duration-300`}>
      
      <div className=''><h1 className='text-3xl p-5 capitalize font-medium text-transparent bg-clip-text bg-gradient-to-tr from-pink-800 via-blue-200 to-purple-800 tracking-tight '>hii how can i help you</h1></div>


      <div className='h-full max-h-[78vh] overflow-y-scroll scrollable flex flex-col'>
  {CureentQuery.map((query, index) => (
    <div key={index} className='min-w-1/2 mt-10 '>
      {/* Query aligned left */}
      <div className='text-right text-black flex-col'>
            {index == CureentQuery.length - 1 ? (
              <>
                <Result ans={query} />
                {Loading && <p>Loading..</p>}
              </>
            ) : (
              <Result ans={query} />
            )}
      </div>

      {/* Results aligned right */}
      {results && results[index] && (
        <div className='flex flex-col mt-5 '>
          {results[index].map((el, i) => (
            <div key={`${index}-${i}`} className='min-w-1/2 text-left'>
              <Result ans={el} />
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>





      <div className={`w-full ${onFocus ? "max-w-xl" : "max-w-md"} hover:max-w-xl m-auto p-4 rounded-full bg-zinc-700 border-gray-300/80 border-2 flex transition-all duration-300`}>
          <input type='text' onFocus={()=>(setOnFocus(true))} onBlur={()=>{setOnFocus(false)}} placeholder='Ask me anything' className='flex-1 outline-none font-light text-gray-300' value={query} onChange={(e)=>setQuery(e.target.value)} ></input>
          <button  onClick={()=>askQuestion()} className='w-10 h-8 drop-shadow-sm drop-shadow-white hover:drop-shadow-md hover:drop-shadow-white hover:scale-115 transition-all duration-300 ' > <img src={planeImg} className='' alt="" /></button>
      </div>
    
    
    </div>




  </div>
  
  </div>  
  
  )
}

export default App
