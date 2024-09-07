import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Analytics from './Pages/Analytics';
import Profile from './Pages/Profile';
import Candidates from './Pages/Candidates';
import Positions from './Pages/Positions';
import Votes from './Pages/Votes';
import Voters from './Pages/Voters';
import Vote from './Pages/Vote';
import Candidate from './Pages/Candidate';
import Settings from './Pages/Settings';
import Error from './Pages/Error';
import Register from './Pages/Register';

function App() {

  return (
    <div className=''>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/admin/login' element={<Login/>}/>
      {/* <Route path='/otp' element={<Otp/>}/>*/}
      <Route path='/register' element={<Register/>}/>
      <Route path='/admin/register' element={<Register/>}/>
      {/* <Route path='/forgot-password' element={}/> */}
      {/* <Route path='/update-password' element={}/> */}
      <Route path='*' element={<Error/>}/>
      <Route element={<Dashboard/>}>
          <Route path='dashboard/admin/analytics' element={<Analytics/>}/>
          <Route path='dashboard/profile' element={<Profile/>}/>
          <Route path='dashboard/candidates' element={<Candidates/>}/>
          <Route path='dashboard/positions' element={<Positions/>}/>
          <Route path='dashboard/admin/votes' element={<Votes/>}/>
          <Route path='dashboard/admin/voters' element={<Voters/>}/>
          <Route path='dashboard/vote' element={<Vote/>}/>
          <Route path='dashboard/candidate' element={<Candidate/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>
      </Route> 
      </Routes>
    </div>
  )
}

export default App
