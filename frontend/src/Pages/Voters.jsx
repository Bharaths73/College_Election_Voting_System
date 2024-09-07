import React from 'react'
import Card from '../Components/Common/Card'
import { DummyVoter } from '../Data/DummyVoters'


export default function Voters() {
  
  return (
    <div className='ml-5 mr-5'>
      <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4'>Voters</h1>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2.5 mt-5'>
        {
          DummyVoter.map((voter,index)=>(
            <Card voter={voter} key={index}/>
          ))
        }
      </div>
    </div>
  )
}
