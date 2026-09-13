
import {Navigate, Route, Routes } from 'react-router'
import HomePage from './Pages/HomePage.jsx'
import ProblemsPage from './Pages/ProblemsPage.jsx';
import ProblemPage from './Pages/ProblemPage.jsx';
import DashboardPage from './Pages/DashboardPage.jsx';
import SessionPage from './Pages/SessionPage.jsx'

import { Toaster } from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';

function App() {
  const {isSignedIn,isLoaded}=useUser();

  if(!isLoaded) return null; // to get rid of flickering effect
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn?<HomePage/>:<Navigate to="/dashboard"/>}/> 
      <Route path="/problems" element={isSignedIn?<ProblemsPage/>:<Navigate to="/"/>}/>
      <Route path="/problem/:id" element={isSignedIn?<ProblemPage/>:<Navigate to="/"/>}/>
      <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
      <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App