
import {Navigate, Route, Routes } from 'react-router'
import HomePage from './Pages/HomePage.jsx'
import ProblemsPage from './Pages/ProblemPage.jsx';

// import ProblemPage from './Pages/ProblemPage.jsx'
import { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

function App() {
  const {isSignedIn,isLoaded}=useUser();

  if(!isLoaded) return null; // to get rid of flickering effect
  return (
    <>
    <Routes>
     <Route path="/" element={<HomePage/>}/> 
     <Route path="/problems" element={isSignedIn?<ProblemsPage/>:<Navigate to="/"/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App