import { useEffect,useState,useContext } from "react"
import Calender from "./components/Calender/Calender"
import Details from "./components/details/Details"
// import Footer from "./components/footer/Footer"
// need to add something on the day to show that it has tasks in it.nameen
import Form from "./components/form/Form"
import "./App.scss"
import Emitter, { useEmitter } from "./components/Context/Emitter"
// import { data } from "./data"




const App = () => {
  const [formOn,setFormOn] = useState(false)
  // const {emitterData} = useEmitter()

  // console.log(highlight)

  // useEffect(() => {
  //   console.log(data)
  // },[data])

  return (
    <div className="App">
      {/* {formOn ? <Form setFormOn={setFormOn} /> : <div><Calender /> */}
      {/* <chosenDate></chosenDate> */}
      <Emitter>
          <Form setFormOn={setFormOn} formOn={formOn}/> 
          <Calender setFormOn={setFormOn} />
          <button onClick={() => setFormOn(!formOn)} id="addTask">Add task</button>
          <Details />
      </Emitter>
      <div>
      {/* </div> */}
      {/* <Footer /> */}
      {/* <div> */}
      </div>
    </div>
  )
}

// use date as key so 22nd december : ["I need to wash the car","Bungee jumping with the baby"
// I need a  function called show tasks that checks the day and then checks if there are any tasks assigned to that day

export default App
