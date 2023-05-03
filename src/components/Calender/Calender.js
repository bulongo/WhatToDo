// checkmark inside calender when tasks on day are complete
// ah fuck now I have to create a new date item in the details component
// Image if the app could tell the use the expected weather for the day they want to add a task to
import { useState,useEffect } from "react"
import "./calender.scss"
import MenuModal from "../modal/MenuModal"
import Emitter, { useEmitter } from "../Context/Emitter"
import { Checker } from "../OtherFunctions/Checker"
import { data } from "../../data"
// import sound from "../../Assets/Bulo-click.m4a"

// just find the day in the date and then slice it out. Then use that as a comparison to the days and add
// a start to those that are keys


const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]



// make me swipable so we don't rely on arow buttons to move months
// double click on day and it will expand and bring you the task adding menu

const Calender = ({setFormOn,highlight}) => {
    const {setDataEvent,emitterData,activeName } = useEmitter()
    const [burgerClass,setBurgerClass] = useState("inactive_burger")
    const [day,setDay] = useState(new Date().getDate())
    const [dayInWeek,setDayInWeek]  = useState(new Date().getDay())
    const [month,setMonth] = useState(new Date().getMonth())
    const [year,setYear] = useState(new Date().getFullYear())
    const numberOfDaysinMonth = new Date(year,month + 1,0).getDate()
    const dateString1 = new Date(year,month,1)
    const dateString2 = new Date(year,month + 1,0)
    const dateString3 = new Date(year,month,0)
    const daysInMonth = []
    const dataSet =  JSON.parse(localStorage.getItem(emitterData)) 

    
    // const {emitterData} = useEmitter()
    // no idea how to make it such that choosing a date will change the day
    //  **FIgured it out
    // console.log(emitterData)

    useEffect(() => {

        // console.log(new Date(`${year}-01-${day}`))
        // This is my ID to figure out how to show if day has tasks or not
        setDayInWeek(new Date(`${year}-${month + 1}-${day}`).getDay())
        setDataEvent(`${year}-${month + 1}-${day}`)
    },[day,setDataEvent])
    
    // const clickDayChanger = () => {
    //     if()
    // }
    
    const firstDayOfMonth = dateString1.toLocaleDateString("en-us",{
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })
    
    
    const lastDayOfMonth = dateString2.toLocaleDateString("en-us",{
        weekday:'long',
        year: 'numeric',
        month:'numeric',
        day:'numeric'
    })
    
    const lastDayOfPrevMonth = dateString3.toLocaleDateString("en-us",{
        weekday:'long',
        year: 'numeric',
        month:'numeric',
        day:'numeric'
    })
    
    
    const lastOfPrev = lastDayOfPrevMonth.split("/")[1]
    // used to get last day of previous month
    
    
    
    const startPaddingDays = daysOfWeek.indexOf(firstDayOfMonth.split(", ")[0])
    const endPaddingDays = daysOfWeek.length - (daysOfWeek.indexOf(lastDayOfMonth.split(", ")[0])  + 1)
    

    const daysAtEndOfMonth = new Date(year,month,- startPaddingDays)
    // used to get the days in the padding squares at end of last month
    
    const daysAtStartPadding = daysAtEndOfMonth.toLocaleDateString("en-us",{
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })

    // weird bug when dealing with padding days
    
    // const prevEndPadding = daysAtStartPadding.split("/")[1]
    // console.log(lastDayOfMonth.split("/")[1])
    
    for(let i = 1;i <= startPaddingDays + numberOfDaysinMonth;i++){
        if(i > startPaddingDays){
            daysInMonth.push(i - startPaddingDays)
        }else{
            daysInMonth.push("")
        }
    }
    
    // for(let i = prevEndPadding;i <=  lastDayOfMonth.split("/")[1];i++){
        // }

        if(daysInMonth[daysInMonth.length - 1] === numberOfDaysinMonth){
        for(let i = 1;i <= endPaddingDays;i++){
            daysInMonth.push(<div className="padding_day" onClick={(e) => nextMonthDays(e)}>{""}</div>)
        }
    }
    
    const openMenu = (e) => {
        if(burgerClass === "inactive_burger"){
            setBurgerClass("active_burger")
        }else{
            setBurgerClass("inactive_burger")
        }
    }
    
    const nextMonthDays = (e) => {
        // setMonth(month + 1)
        // e.target.classList.remove("day_cell")
    }
    
const handleChangeDay = (value) => {
    if(value === "lt"){
        setDay(day - 1)
        if(dayInWeek === 0){
            setDayInWeek(6)
        }else{
            setDayInWeek(dayInWeek - 1)
        }
        
        if(day <= 1){
            setDay(Number(lastOfPrev))
            if(month === 0){
                setMonth(11)
                setYear(year - 1)
            }else{
                setMonth(month - 1)
            }
            // const dayInWeek = (firstDayOfMonth.split(",")[0])
        }
    }else if(value === "gt"){
        if(day >= numberOfDaysinMonth){
            if(month <= months.length){
                if(month === 11){
                    setMonth(0)
                    setYear(year + 1)
                }else{
                    setMonth(month + 1)
                    setDayInWeek(dayInWeek + 1)
                }
                setDay(1)
            }
            return
        }
        if(dayInWeek === 6){
            setDayInWeek(0)
        }else{
            setDayInWeek(dayInWeek + 1)
        }
        setDay(day + 1)
        // Need to put limit on how high and low dayInWeek can go
        // Done th task
    }else {
        if(value.target.innerText !== ""){
            if(value.detail === 1){
                setDay(Number(value.target.innerText))
            }else if(value.detail > 1){
                setDay(Number(value.target.innerText))
                setFormOn(true)
            }
            //  new Audio(sound).play()

            // was using below code to  figure out click to change day name
            // let something = new Date(`${year}-${month + 1}-${day}`)
            // console.log(something.getDay())
            // check  todos for the day
        }else{
            return
        }
    }
}


return (
    <div id='calender'>
        {burgerClass === "active_burger" ? <MenuModal />:<></>}
        <div id="header">
            <div id="header_left">

                <div className="arrows">
                    <span className="less_than" onClick={() => handleChangeDay("lt")}>&lt;</span>
                    <span className="more_than" onClick={() => handleChangeDay("gt")}>&gt;</span>
                </div>
                <div className="dates">
                    {/* create function that changes the year */}
                    <div className="day_of_week">
                        <h3>{daysOfWeek[dayInWeek]}</h3>
                        <h3 >{day}</h3>
                    </div>
                    {/* <h2>{year}</h2> */}
                    {day === new Date().getDate() && month === new Date().getMonth() ? <p className="today">Today</p> : <span></span>}
                </div>
            </div>
            {/* <div className={`${burgerClass}`} onClick={(e) => openMenu(e)}>
                <span></span>
                <span ></span>
                <span></span>
            </div> */}
            {/* <span className="less_than" onClick={() => handleChangeDay("lt")}>&lt;</span> */}
            <h3 id="month">{months[month]}</h3>
            {/* <span className="more_than" onClick={() => handleChangeDay("gt")}>&gt;</span> */}
        </div>

        <main>
            {/* Maybe we should make the today (day) light up */}
            {/* Done with this task */}
        <div className='weekdays'>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
        </div>

        <div className="days">
        {daysInMonth.map((dim,index) => {
                return(
                    <div className={day === dim ? "selected_cell": "day_cell"} key={index} 
                    onClick={(e) => handleChangeDay(e)}>
                        {/* {dataSet ? console.log(dataSet[index]) : console.log("nothing here")} */}
                        {dim}
                    </div>
                    )
            })}
    </div>
        </main>
    </div>
  )
}

export default Calender