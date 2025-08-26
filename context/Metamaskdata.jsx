import React, {createContext, useContext, useState } from 'react'
export const Tnx=createContext()

const TnxProvider=({children })=>{
       const [TnxHash, setTnxHash] = useState('')
    return(
        <Tnx.Provider value={[TnxHash,setTnxHash]}>
        
        {children }
        </Tnx.Provider>
    )
}
export default TnxProvider;
export function useTnx(){
    return useContext(Tnx)
}