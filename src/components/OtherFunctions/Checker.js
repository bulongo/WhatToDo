import { useState } from "react"

export const Checker = (data) => {
    const [tasked,setTasked] = useState(null)
    if(data){
        setTasked(data)
        data.map((datum) => {
            console.log(datum.hasTasks)
        })
        // console.log(data)
    }else{
        console.log("nothing to see here")
    }
}