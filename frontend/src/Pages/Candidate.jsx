import React, { useEffect, useState } from 'react';
import CandidateCard from '../Components/Core/Candidate/CandidateCard';
import { useSelector } from 'react-redux';
import { confirmCandidate, regsiterAsCandidates } from '../Services/Operations/Candidates';
import { positionApi } from '../Services/Api';
import { getAllPositions } from '../Services/Operations/Positions';
import toast from 'react-hot-toast';
import ConfirmationModal from '../Components/Common/ConfirmationModal';
import { getElectionActiveStatus } from '../Services/Operations/Election';
import { PageSkeleton } from '../Components/Common/Skeleton';

export default function Candidate() {
  const [pageLoading,setPageLoading]=useState(true);
  const [isCandidate,setIsCandidate]=useState(false);
  const [candidateDetails,setCandidatesDetails]=useState({})
  const [loading,setLoading]=useState(false)
  const[positions,setPositions]=useState([])
  const {token,user}=useSelector(state=>state.authentication)
  const[isActive,setIsActive]=useState(false)
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
    
    const result=await regsiterAsCandidates(token,register)
    if(result){
      setIsCandidate(true)
      setCandidatesDetails(result)
    }
  }

  function changeHandler(e){
    const { name, value } = e.target;
    if(name==='position'){
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

  const getElectionStatus=async()=>{
    const result=await getElectionActiveStatus(token);
    if(result){
      setIsActive(result?.startOrStop)
    }
    return result?.startOrStop
  }

  useEffect(()=>{
    const fetchData = async () => {
          try {
            await Promise.all([
              isACandidate(),
              getPositions(),
              getElectionStatus()
            ])
          } finally {
            setPageLoading(false)
          }
      };
  
      fetchData();
  },[])

    return (
      <div className='candidate-page'>
        {pageLoading ? (
          <PageSkeleton variant='form'/>
        ) : (
          <>
        <header className='candidate-page-header'>
        <div className='page-heading'>
          <span className='page-eyebrow'>Candidate registration</span>
          <h1>Step forward for your community</h1>
          <p>Choose a position and put your ideas at the heart of campus life.</p>
        </div>
        <div className={`candidate-election-status ${isActive ? 'is-open' : 'is-closed'}`}>
          <span className='candidate-status-indicator'/>
          Election {isActive ? 'in progress' : 'not started'}
        </div>
      </header>

      <div className='candidate-layout'>
        <aside className='candidate-intro-panel'>
          <div className='candidate-intro-mark'>BMS</div>
          <span className='candidate-intro-eyebrow'>Lead with purpose</span>
          <h2>Your voice can make a difference.</h2>
          <p>Represent your peers, share your ideas, and help shape a stronger campus community.</p>
          <div className='candidate-steps'>
            <div className='candidate-step'>
              <span>01</span>
              <div>
                <strong>Choose a position</strong>
                <p>Select the role you want to represent.</p>
              </div>
            </div>
            <div className='candidate-step'>
              <span>02</span>
              <div>
                <strong>Confirm your details</strong>
                <p>Your account information is ready to go.</p>
              </div>
            </div>
            <div className='candidate-step'>
              <span>03</span>
              <div>
                <strong>Submit your application</strong>
                <p>Review your selection before registering.</p>
              </div>
            </div>
          </div>
          <div className='candidate-intro-footer'>
            <span className='candidate-footer-dot'/>
            One community. Many voices.
          </div>
        </aside>

        <main className='candidate-main'>
          {
            isCandidate ? (
              <section className='candidate-registered'>
                <div className='candidate-registered-heading'>
                  <span className='candidate-success-mark'>✓</span>
                  <div>
                    <span className='candidate-form-eyebrow'>Application submitted</span>
                    <h2>You’re on the ballot.</h2>
                    <p>Thank you for stepping up to represent your community.</p>
                  </div>
                </div>
                <CandidateCard candidate={candidateDetails} setConfirmationModal={setConfirmationModal} setIsCandidate={setIsCandidate} active={isActive}/>
              </section>
            ) : (
              <section className='candidate-form-panel'>
                <div className='candidate-form-heading'>
                  <span className='candidate-form-eyebrow'>Your application</span>
                  <h2>Register as a candidate</h2>
                  <p>Confirm your details and select the position you’re interested in.</p>
                </div>

                <form className='candidate-form' onSubmit={registerCandidate}>
                  <div className='candidate-form-grid'>
                    <div className='candidate-input-group'>
                      <label htmlFor='registerNo'>Register number</label>
                      <input type='text' value={register.registerNumber} placeholder='Register number' disabled name='registerNo' id='registerNo'/>
                    </div>
                    <div className='candidate-input-group'>
                      <label htmlFor='email'>Email address</label>
                      <input type='text' value={register.email} placeholder='Email address' disabled name='email' id='email'/>
                    </div>
                    <div className='candidate-input-group'>
                      <label htmlFor='password'>Account password</label>
                      <input type='password' value={register.password} placeholder='Enter your password' onChange={changeHandler} name='password' id='password'/>
                      <span className='candidate-input-hint'>Enter your password to confirm your identity.</span>
                    </div>
                    <div className='candidate-input-group'>
                      <label htmlFor='position'>Position</label>
                      <select required defaultValue="" name='position' id='position' onChange={changeHandler}>
                        <option value='' disabled>{loading ? 'Loading positions...' : 'Select a position'}</option>
                        {
                          positions?.map((position,index)=>(
                            <option value={position.id} key={index}>{position.positionName}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className='candidate-form-footer'>
                    <p>Your details are only used to verify this application.</p>
                    <button className='action-button action-button-primary candidate-submit'>
                      Register as candidate <span aria-hidden='true'>→</span>
                    </button>
                  </div>
                </form>
              </section>
            )
          }
        </main>
      </div>
        </>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}
