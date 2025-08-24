import { useState } from 'react'
import './App.css'
import Homepage from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router'
import VotingResultsPage from './components/ShowResult'
function App() {

  return (
    <>
      <BrowserRouter>
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/result' element={<VotingResultsPage/>}/>

    </Routes>
      </BrowserRouter>
    
      
    </>
  )
}

export default App
