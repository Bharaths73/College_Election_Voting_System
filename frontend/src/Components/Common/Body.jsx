import React, { useState } from 'react';
import Card from './Card'
import { FaSearch } from "react-icons/fa";
import VotesCard from '../Core/Votes/VotesCard';
import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Core/Position/Modal';
import ConfirmationModal from './ConfirmationModal';

export default function Body({collections,name,edit,deleteFunc,addFunc,reset,search,searchQuery,searchFunc}) {
  const displaySidebar=useSelector(state=>state.sidebar.display);
  const {role}=useSelector(state=>state.authentication)
  const [modal,setModal]=useState(null)
  const [confirmationModal,setConfirmationModal]=useState(null)

  return (
    <div className=''>
        <div className='ml-5 mr-5 pb-10'>
        <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-4'>{name}</h1>
        {
              name==='Positions' && role==="ROLE_ADMIN" &&(
                    <Link className='mt-10'><button className='px-4 py-2 bg-green-400 text-white rounded-md text-base font-semibold' onClick={
                      ()=>setModal({
                      text:"Add Position",
                      btn1Text:'Submit',
                      btn2Text:"Cancel",
                      btn2Handler:()=>setModal(null)
                  })}>Add Position +</button></Link>
                  )
                }
        {
           collections?.length > 0  ? (
             <div className=''>
                   {
                      role==="ROLE_ADMIN" && (
                        <button className='px-4 py-2 bg-red-500 text-white rounded-md text-base font-semibold mt-5' onClick={()=>setConfirmationModal({
                          text1:"Are You Sure?",
                          text2:`${name} will be deleted`,
                          btn1name:'Delete',
                          btn2name:"Cancel",
                          btn1Handler:()=>reset(setConfirmationModal),
                          btn2Handler:()=>setConfirmationModal(null)
                      })}>Reset {name}</button>
                      )
                   }

              <div className='flex sm:justify-end justify-center gap-2 items-center mt-5'>
                  <input type='search' className='sm:w-96 w-72 py-1 px-3 border-2 border-gray-400 rounded-md' placeholder='Search' value={searchQuery} onChange={(e)=>search(e.target.value)}/>
                  <button className='bg-blue-500 p-3 rounded-full'><FaSearch className='text-white' onClick={()=>searchFunc(searchQuery)}/></button>
              </div>

            <div className={`grid ${displaySidebar ? "lg:grid-cols-2":"lg:grid-cols-3"} md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2.5 mt-10`}>
                {
                   name!=='Votes' ? (
                    collections.map((collection,index)=>(
                      <Card collection={collection} key={index} identity={name} edit={edit} deleteFunc={deleteFunc} setConfirmationModal={setConfirmationModal} setModal={setModal}/>
                  ))
                   ) : (
                    collections.map((collection,index)=>(
                      <VotesCard collection={collection} key={index} identity={name}/>
                  ))
                   )
                }
            </div>
             </div>
           ) : (
              <div className='sm:text-4xl text-3xl text-slate-600 flex justify-center mt-40'>No {name} Available</div>
           )
        }


        </div>
        {modal && <Modal modalData={modal} addFunc={addFunc} setModal={setModal} editFunc={edit}/>}
        { 
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
