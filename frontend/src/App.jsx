import { lazy, Suspense, useState } from 'react'
import {Routes,Route} from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
const Login=lazy(()=>import('./Pages/Login'));
const Dashboard=lazy(()=>import('./Pages/Dashboard'));
const Analytics=lazy(()=>import('./Pages/Analytics'));
const Candidates=lazy(()=>import('./Pages/Candidates'));
const Positions=lazy(()=>import('./Pages/Positions'));
const Votes=lazy(()=>import('./Pages/Votes'));
const Vote=lazy(()=>import('./Pages/Vote'));
const Candidate=lazy(()=>import('./Pages/Candidate'));
const Settings=lazy(()=>import('./Pages/Settings'));
const Error=lazy(()=>import('./Pages/Error'));
const Register=lazy(()=>import('./Pages/Register'));
const Voters=lazy(()=>import('./Pages/Voters'));
const Profile=lazy(()=>import('./Pages/Profile'));

import Public from './Components/Auth/Public';
import Private from './Components/Auth/Private';

function App() {

  return (
    <div className=''>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  )
}

export default App
