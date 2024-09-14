import React, { useState } from 'react'

export default function Modal({modalData,addFunc,setModal}) {
  const [position ,setPosition]=useState({
    positionName:""
  })

  function changeHandler(e){
    const {value}=e.target;
    console.log("value is ",value);
    
    setPosition((prev)=>(
      {
        ...prev,
        positionName:value
      }
    ))
  }

  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='w-11/12 max-w-[350px] rounded-lg border-2 border-slate-700 bg-white p-6 flex flex-col items-center gap-y-4 '>
            <p className='font-semibold text-2xl text-black'>{modalData.text}</p>
            <div className='flex flex-col gap-3 items-center mt-3 '>
                <input type='text' placeholder='Enter position name' onChange={(e)=>changeHandler(e)} required value={position.positionName} className=' py-2 px-2 border-2 border-gray-400 rounded-md w-72'/>
                <div className='flex gap-x-2 mt-3'>
                    <button className='px-3 py-2 bg-blue-400 rounded-md' onClick={modalData.btn2Handler}>Cancel</button>
                    <button className='px-3 py-2 bg-blue-400 rounded-md' onClick={()=>addFunc(position,setModal)}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
