import { useState,useReducer,useRef } from "react"
import { PropTypes } from "prop-types"
import "./Form.scss"
import {data} from "../../data"
import { useContext } from "react"
import { useEmitter } from "../Context/Emitter"
import { useEffect } from "react"

// use proptype for this
// Simply use the info from the form to check if the class is active or not and then do stuff



const reducer = (state,action) => {
  switch(action.type){
    case "changeTask":
      return({...state,task:action.payload})
    case "changeDate":
      return({...state,date:action.payload})
    case "changeStart":
      return({...state,startTime:action.payload})
    case "changeEnd":
      return({...state,endTime:action.payload})
    case "changeDescription":
      return({...state,description:action.payload})
    case "defaultDate":
      return({...state,date:action.payload})
    case "submit":
        data.push({...state,date:action.payload,hasTasks:true,checked:false})
        // console.log(action.payload)
        localStorage.setItem(action.payload,JSON.stringify(data))
        // push the datat using emitter data as a key to localstorage
        // if date is the same as another append into array of objects
        return({...initialState})
        default:
          return({...state})
        }
      }
      
      const initialState = {
        task:'',
        date:"",
        startTime:"" ,
        endTime:"",
        description:"",
        hasTasks:false,
        checked:false
    // category:""
  }
  
  
  const Form = (props) => {
    const  inputRef = useRef()
    const [color,setColor] = useState("")
    const [state,dispatch] = useReducer(reducer,initialState)
    const { emitterData } = useEmitter()
    
      // for(const key in state){
      //   console.log(`${key}: ${state[key]}`)
      // }
      // console.log(typeof emitterData)

      
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(inputRef.current.value)
    // Have gotten the data now to put it into the form..yippeeeee
    props.setFormOn(false)
  }

  const closeForm = () => {
    // does the same as handleSubmit but just closes the form when close  is clicked
    props.setFormOn (false)
    // console.log(inputRef.current.value)
  }


  return (
    <form onSubmit={(e) => handleSubmit(e)} className={`${props.formOn ? "formOn form" : "formOff form"}`}>
      <button className="back_button" onClick={() => closeForm()}>X</button>
      <div className="form_top">
      <h2>Create New Task</h2>
        <div className="form_name">
          <label htmlFor="name">Task</label>
          <input type="text" autoFocus value={state.task}
          onChange={(e) => dispatch({type:"changeTask",payload:e.target.value})}/>
        </div>
            {/* <div className="form_date"> */}
              {/* <label htmlFor="date">Date</label> */}
              {/* should be current date */}
              {/* make the default date the one on which the person clicked add task */}
              {/* <input type="date" value={state.date}   ref={inputRef} */}
              {/* onChange={(e) => dispatch({type:"changeDate",payload:e.target.value})}/> */}
            {/* </div> */}
      </div>

      <div className="form_bottom">
        <div className="form_bottom_times">
          <label htmlFor="start_time">Start time</label>
          {/* get current time and then for end time add two hours */}
          <input type="time" value={state.startTime} 
          onChange={(e) => dispatch({type:"changeStart",payload:e.target.value})}/>
          <label htmlFor="end_time">End time</label>
          <input type="time" value={state.endTime} 
          onChange={(e) => dispatch({type:"changeEnd",payload:e.target.value})}/>
        </div>

        <div className="descript">
          <label htmlFor="descript">Description</label>
          <input type="text" value={state.description}
          onChange={(e) => dispatch({type:"changeDescription",payload:e.target.value})}/>
        </div>

        <div className="categories">
          <h4>Category</h4>
          <div className="category_items">
            <span style={{background:color,color:""}} onClick={() => setColor("yellow")}>Simple</span>
            <span style={{background:color,color:""}} onClick={() => setColor("yellow")}>Sport</span>
            {/* give set color a chimi call back function */}
            <span>Art Challenge</span>
            <span>Freelance</span>
            <span>Meetings</span>
            <span>Education</span>
          </div>
        </div>
        
        { state === initialState ?
            <button disabled  onClick={() => dispatch({type:"submit"})}>Create Task</button> :
        <button  onClick={() => dispatch({type:"submit",payload: emitterData})}>Create Task</button>
        }
      </div>
    </form>
  )
}

export default Form