import { useEffect, useState } from "react"
import "./details.scss"
// Add default in data
import  Emitter, { useEmitter } from "../Context/Emitter"

// So add option for person to click and then the clicked item becomes active and opens options to edit delete or mark as complete
// New problems

//  1 - When I refresh the page  while one items is selected, it goes nuts
//  2 - When an item is selected, clicking another one doesn't take away control from the first one
// 3 - help

const Details = () => {
    const { emitterData,activeName,setActiveName } = useEmitter()
    const [time,setTime] = useState([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
    const [checked,setChecked] = useState(false)
    // problem is its trying to load data from a specific and then when it finds that there is nothing there
    // i.e. emitterData(which is pretty much the selected date), it complains. put Default to stop this from happening
    const [data,setData] = useState(null)
    const dataSet =  JSON.parse(localStorage.getItem(emitterData)) 
    // I need to get the data and do a check and if any of the items has a check on it, turn it off and then update localStorage
    // before I do the rest of the operations
    
    // console.log(dataSet)

    // if items have the same date then  just make the object use the date as the

    const handleClick = (e,datum,dataSet,index) => {
        // console.log(datum)
        // Solution, alert them that they can only select one item at a t ime
        //  although it would make more sense to change the selection on click
        if(dataSet[index].checked === false && checked === false){
            setChecked(true)
            // datum.checked = true
            dataSet[index].checked = true
            localStorage.setItem(emitterData,JSON.stringify(dataSet))
            console.log(checked)
        }else if(dataSet[index].checked === true && checked === true){
            setChecked(false)
            // datum.checked = false
            // dataSet[index].checked = false
            dataSet[index].checked = false
            localStorage.setItem(emitterData,JSON.stringify(dataSet))
        }


        // This fucker is not changing the state of the item in localStorage, just the one it initially got from that is in 
        // dataSet
        
        // put items into array and then render that,  that way we can change the array  by only selecting item we want
        // change item in localstorage
    }   

        const removeTask = (task) => {
            const newTasks = dataSet.filter((datum) => task === datum.task)
            // dataSet.pop(newTasks)
            console.log(dataSet)
        }


        return (
            <div className='details'>
        {/* {time.map((hour) => {
            return(
                <div className="times">
                <div >0{hour}:00</div>
                </div>
                )
            })} */}

            {dataSet ? dataSet.map((datum,index) => {
                return(
                    <Emitter key={index} className="emitter">
                        {/* {dataSet[index] === index && datum.checked === false ? <h1>bulo</h1>:<h1>Hello</h1>} */}
                    {/* <div className={`details_item ${activeName}`} onClick={(e) => handleClick(e,datum,dataSet)}> */}
                    <div className={`details_item ${activeName}`} onClick={(e) => handleClick(e,datum,dataSet,index)}>
                        { datum.checked ? <div className="details_options">
                            {/* mmm ah awe mwe */}
                            <p onClick={(e) => console.log(e.target.innerHTML)}>Edit</p>
                            <p onClick={(e) => removeTask(datum)}>Delete</p>
                            <p onClick={(e) => console.log(e.target.innerHTML)}>Accomplished</p>
                             </div> : ""}
                        {/* Its marking all of them because the activeName class is apllied to every singl one. Need to change this */}
                        {/* <div className="details_left"> */}
                            {/* <div>{datum.startTime}</div> */}
                            {/* Put conditional rendering or if statement to check which one is bigger */}
                            {/* <div>{datum.endTime}</div> */}
                            {/* <div>{datum.date.split("-")[2]}</div> */}
                            {/* <div>Thur</div> */}
                        {/* </div> */}
                        <div className="details_right">
                            <span className="details_right_start-time">{datum.endTime}</span>
                            <h3>{datum.task}</h3>
                            <p>{datum.description}</p>
                            {/* <span className="details_right_state"> */}
                                {/* <span className="details_right_state-active"></span> */}
                            {/* </span> */}
                        </div>
                    </div>
                    </Emitter>
                )
            }) : 
            // give people an option to choose what time the day starts
            <div id="default_task">No tasks assigned here</div>
        } 

    </div>
  )
}
//  unless im viewing all tasks there is no need to put the day 

export default Details
