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
import Public from './Components/Auth/Public';
import Private from './Components/Auth/Private';

function App() {

  return (
    <div className=''>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Public><Login/></Public>}/>
      <Route path='/admin/login' element={<Public><Login/></Public>}/>
      {/* <Route path='/otp' element={<Otp/>}/>*/}
      <Route path='/register' element={<Public><Register/></Public>}/>
      <Route path='/admin/register' element={<Register/>}/>
      {/* <Route path='/forgot-password' element={}/> */}
      {/* <Route path='/update-password' element={}/> */}
      <Route path='*' element={<Error/>}/>
      <Route element={<Private><Dashboard/></Private>}>
          <Route path='dashboard/admin/analytics' element={<Private><Analytics/></Private>}/>
          <Route path='dashboard/profile' element={<Private><Profile/></Private>}/>
          <Route path='dashboard/candidates' element={<Private><Candidates/></Private>}/>
          <Route path='dashboard/positions' element={<Private><Positions/></Private>}/>
          <Route path='dashboard/admin/votes' element={<Private><Votes/></Private>}/>
          <Route path='dashboard/admin/voters' element={<Private><Voters/></Private>}/>
          <Route path='dashboard/vote' element={<Private><Vote/></Private>}/>
          <Route path='dashboard/candidate' element={<Private><Candidate/></Private>}/>
          <Route path='dashboard/settings' element={<Private><Settings/></Private>}/>
      </Route> 
      </Routes>
    </div>
  )
}

export default App
