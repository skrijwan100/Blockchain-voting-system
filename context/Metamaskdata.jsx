import React, {createContext, useContext, useState } from 'react'
export const Metamaskdata=createContext()

const MetamaskdataProvider=({Children})=>{
    const [data,setData]=useState({address:"",blance:""})
    return(
        <Metamaskdata.Provider value={[data,setData]}>
        
        {Children}
        </Metamaskdata.Provider>
    )
}
export default MetamaskdataProvider;
export function usedata(){
    return useContext(Metamaskdata)
}