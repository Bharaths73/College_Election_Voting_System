import React, { useEffect, useState } from 'react';
import CandidateCard from '../Components/Core/Candidate/CandidateCard';
import { useSelector } from 'react-redux';
import { confirmCandidate, regsiterAsCandidates } from '../Services/Operations/Candidates';
import { positionApi } from '../Services/Api';
import { getAllPositions } from '../Services/Operations/Positions';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Components/Common/ConfirmationModal';

export default function Candidate() {
  const [isCandidate,setIsCandidate]=useState(false);
  const [candidateDetails,setCandidatesDetails]=useState({})
  const [loading,setLoading]=useState(false)
  const[positions,setPositions]=useState([])
  const {token,user}=useSelector(state=>state.authentication)
  const [register,setRegister]=useState(
    {
      email:user.email || "",
      registerNumber:user.registerNumber || "",
      password:"",
      position:{
        id:"",
        positionName:""
      }
    }
  );
  const[confirmationModal,setConfirmationModal]=useState(null)

  const isACandidate=async()=>{
      const result=await confirmCandidate(token,register);

      if(result.candidate){
        toast.success("You are already registered as candidate");
      }

      if(result){
         setIsCandidate(result.candidate)
         setCandidatesDetails(result)
      }
  }

  const getPositions=async()=>{
    setLoading(true)
    const result=await getAllPositions(token)
    if(result){
      setPositions(result)
    }
    setLoading(false)
  }
  
  const registerCandidate=async(e)=>{
    e.preventDefault();
    console.log("candidate register details are ",register);
    
    const result=await regsiterAsCandidates(token,register)
    if(result){
      setIsCandidate(true)
      setCandidatesDetails(result)
    }
  }

  function changeHandler(e){
    const { name, value } = e.target;
    if(name==='position'){
      console.log(value);
      console.log(positions);
      
      console.log(positions.filter(pos=>pos.id===value));
      
      const selectedPos=positions.find(pos=>String(pos.id)===value)
      setRegister((prev)=>(
        {
          ...prev,
          position:selectedPos
        }
      ))
    }
    else{
      setRegister((prev)=>(
        {
          ...prev,
          [name]:value
        }
      ))
    }
  }

  useEffect(()=>{
    const fetchData = async () => {
      await isACandidate();  // Check if the user is a candidate
      await getPositions();  // Get available positions
    };
  
    fetchData();
},[])

  return (
    <div className='ml-5 mr-5 pb-10'>
      <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-1'>Register Yourself as Candidate</h1>
      <div className='flex w-full justify-center mt-10'>
      {
         isCandidate ? (
           <div className=' flex flex-col gap-5 justify-center'>
              <p className='sm:text-4xl text-2xl text-slate-600'>Thank you for registering as candidate</p>
              <div className='flex justify-center mt-5'>
                 <CandidateCard candidate={candidateDetails} setConfirmationModal={setConfirmationModal} setIsCandidate={setIsCandidate}/>
              </div>
           </div>
         ) : (
          <form className='flex flex-col gap-7 max-h-max max-w-max bg-gray-100 py-5 pb-10 px-5 border-2 border-gray-400 rounded-xl mb-32 shadow-xl' onSubmit={registerCandidate}>
          <input type='text' value={register.registerNumber} placeholder='Register Number' disabled name='registerNo' id='registerNo' className='sm:w-96 w-72 py-2 px-3 border-2 border-gray-400 rounded-md'/>
          <input type='text' value={register.email} placeholder='Email' disabled  name='email' id='email' className='sm:w-96 w-72 py-2 px-3 border-2 border-gray-400 rounded-md'/>
          <input type='password' value={register.password} placeholder='Password' onChange={changeHandler} name='password' id='password' className='sm:w-96 py-2 px-3 border-2 border-gray-400 rounded-md'/>
          <select className='sm:w-96 w-72 md:py-2 py-1 px-3 border-2 border-gray-400 rounded-md' required defaultValue="" name='position' id='position' onChange={changeHandler}>
          <option selected disabled>Select</option>
            {
              loading ? (
                <div>Loading...</div>
              ) : (
                positions?.map((position,index)=>(
                  <option value={position.id} key={index}>{position.positionName}</option>
                ))
              )
            }
          </select>
  
          <button className='bg-blue-500 px-2 py-2 rounded-md hover:bg-blue-400 text-white text-lg'>
                  Register Candidate
          </button>
        </form>
         )
      }
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
