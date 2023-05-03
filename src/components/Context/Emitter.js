import { createContext, useContext,useState } from "react";

const EmitterContext = createContext({
    emitterData:null,
    activeName:"inactive",
    setValue: (value) => {}
})

export const useEmitter = () => useContext(EmitterContext)

const Emitter = ({children}) => {
    const [emitterData,setEmitterData] = useState(null)
    const [activeName,setActiveName] = useState(null)

    const setDataEvent = (data) => {
        setEmitterData(data)
    }

    const setActiveNameCheck = (data) => {
        setActiveName(data)
    }

    const value = {emitterData,setDataEvent,activeName,setActiveName}

    return (
        <EmitterContext.Provider value={value}>
            {children}
        </EmitterContext.Provider>
    )

}

export default Emitter