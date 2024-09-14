import React from 'react'

export default function ConfirmationModal({modalData}) {

    console.log("confirmation modal data is ",modalData);
  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
    <div className='w-11/12 max-w-[350px] rounded-lg border-2 border-slate-700 bg-white p-6 flex flex-col items-center gap-y-4 '>
        <p className='font-semibold text-2xl text-black'>{modalData.text1}</p>
        <p className='text-md text-black'>{modalData.text2}</p>
        <div className='flex flex-col gap-3 items-center mt-3 '>
            <div className='flex gap-x-2 mt-3'>
                <button className='px-3 py-2 bg-blue-400 rounded-md' onClick={modalData.btn2Handler}>{modalData?.btn2name}</button>
                <button className='px-3 py-2 bg-blue-400 rounded-md' onClick={modalData?.btn1Handler}>{modalData?.btn1name}</button>
            </div>
        </div>
    </div>
</div>
    
  )
}
