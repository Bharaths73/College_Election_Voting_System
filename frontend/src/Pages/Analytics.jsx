import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Chart,ArcElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement, scales} from 'chart.js'
import {Pie,Line} from 'react-chartjs-2';
import { getAllPositions } from '../Services/Operations/Positions';
import { getAllCandid, getAllCandidates } from '../Services/Operations/Candidates';
import { getDashboardDetails } from '../Services/Operations/Dashboard';
import { Link } from 'react-router-dom';
import { getElectionActiveStatus, updateElectionActiveStatus } from '../Services/Operations/Election';
import ConfirmationModal from '../Components/Common/ConfirmationModal';

Chart.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,PointElement,LineElement)

export default function Analytics() {
  const {token}=useSelector(state=>state.authentication)
  const{display}=useSelector(state=>state.sidebar)
  const [positions,setPositions]=useState([])
  const [candidates,setCandidates]=useState([])
  const [dashboard,setDashboard]=useState({})
  const [isActive,setIsActive]=useState(false)
  const [confirmationModal,setConfirmationModal]=useState(null)

  const getCandidates=async()=>{
    const result=await getAllCandid(token);
    if(result){
      console.log("candidates result is ",candidates);
      setCandidates(result)
    }
  }

  const getPositions=async()=>{
      const result=await getAllPositions(token)
      if(result){
        setPositions(result)
      }
  }

  const getRandomColors=(numColors)=>{
    const colors=[];
    for(let i=0;i<numColors;i++){
        const color=`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
        colors.push(color);
    }
    return colors;
}

function filterCandidate(position){
  return candidates.filter((candidate)=>candidate.position.positionName===position.positionName);
}

function filterResults(position){
  const result=filterCandidate(position).map(result=>result.registerNumber)
    return result
}

function filterVotes(position){
  const result=filterCandidate(position).map(result=>result.votes)
    return result
}

const getAllDetails=async()=>{
  const result=await getDashboardDetails(token);
  if(result){
    console.log("dashboard result is ",result);
    setDashboard(result)
  }
}

const getElectionStatus=async()=>{
  const result=await getElectionActiveStatus(token);
  if(result){
    setIsActive(result?.startOrStop)
  }
}

const  updateElectionStatus=async()=>{
  setConfirmationModal(null)
  const result=await updateElectionActiveStatus(token,isActive);
  if(result){
    setIsActive(result?.startOrStop)
  }
}

useEffect(()=>{
  const fetchData = async () => {
      await getElectionStatus();
      await getAllDetails()
      await getPositions(); 
      await getCandidates();
  };
  fetchData();
},[])


  
  const options={
    responsive: true,
    plugins: {
      legend: {
        display:true,
        position: 'top',
        labels: {
          color: 'black', // Set the label "Votes" to dark (black)
          font: {
            size: 20, // Set font size to large
            weight: 'bold', // Optional: Make the label bold
          },
        },
      },
      title: {
        display: true,
        text: 'Election Results',
        position: 'top',
      },  
    },
    scales:{
      x: {
        position: 'bottom', 
        ticks: {
          display: true, 
          color:"black"
        },
        // grid: {
        //   color: 'gray', // Set grid line color to gray
        // },
      },
      y: {
        beginAtZero: true,
        color:"black"
        // grid: {
        //   color: 'gray', // Set grid line color to gray
        // },
      },
    },
    maintainAspectRatio: false,
  }
  
  return (
    <div className=''>
    <div className='text-black w-full ml-5 mr-5 pb-10'>
      <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-4'>Election Analytics</h1>
      <div className='flex md:flex-row flex-col md:justify-between w-full sm:pr-10 pr-5'>
      <button className={`px-7 py-3 ${isActive ? "bg-red-500" :"bg-green-500"} text-white rounded-md text-base font-semibold mt-5`} onClick={()=>setConfirmationModal({
                          text1:"Are You Sure?",
                          text2:`${isActive ? "Election will be stoped" : "Election will start"}`,
                          btn1name:`${isActive ? "STOP" : "START"}`,
                          btn2name:"Cancel",
                          btn1Handler:()=>updateElectionStatus(),
                          btn2Handler:()=>setConfirmationModal(null)
                      })}>{`${isActive ? "STOP ELECTION" : "START ELECTION"}`}</button>
      </div>
      <div className='mt-10 flex flex-col w-full sm:pr-10 pr-5 gap-y-16'>
      {/* <div className='mt-20 w-80 h-80'>
        <Pie data={{
              labels:filterResults(position),
              datasets:[{
                label:position.positionName,
                data:filterVotes(position),
                backgroundColor:getRandomColors(10),
                hoverOffset: 30,
                borderColor: getRandomColors(10), 
              }, 
            ]
            }} options={options} />
      </div> */}
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grids-cols-1 gap-5'>
        <Link to='/dashboard/positions' className='flex flex-col p-6 bg-blue-400 rounded-xl shadow border border-slate-400 gap-y-2 hover:bg-blue-300 cursor-pointer items-center'>
          <p className='text-lg font-semibold text-white'>Number of Positions</p>
          <p className='text-2xl text-white font-semibold'>{dashboard.noOfPositions}</p>
        </Link>

        <Link to='/dashboard/candidates' className='flex flex-col p-6 bg-blue-400 rounded-xl shadow border border-slate-400 gap-y-2 hover:bg-blue-300 cursor-pointer items-center'>
          <p className='text-lg font-semibold text-white'>Number of Candidates</p>
          <p className='text-2xl text-white font-semibold'>{dashboard.noOfCandidates}</p>
        </Link>

        <Link to='/dashboard/admin/voters' className='flex flex-col p-6 bg-blue-400 rounded-xl shadow border border-slate-400 gap-y-2 hover:bg-blue-300 cursor-pointer items-center'>
          <p className='text-lg font-semibold text-white'>Number of Voters</p>
          <p className='text-2xl text-white font-semibold'>{dashboard.noOfVoters}</p>
        </Link>

        <Link to='/dashboard/admin/votes' className='flex flex-col p-6 bg-blue-400 rounded-xl shadow border border-slate-400 gap-y-2 hover:bg-blue-300 cursor-pointer items-center'>
          <p className='text-lg font-semibold text-white'>Number of Voters Voted</p>
          <p className='text-2xl text-white font-semibold'>{dashboard.noOfVotes}</p>
        </Link>
      </div>
      <div className={`grid ${display ? "lg:grid-cols-1":"lg:grid-cols-2"} grid-cols-1 w-full gap-y-16 items-center justify-center`}>
        {
          positions.map((position,index)=>(
                <div className={`w-[100%] h-96`} key={index}>
              <Line data={{
              labels:filterResults(position),
              datasets:[{
                label:position.positionName,
                data:filterVotes(position),
                hoverOffset: 30,
                borderColor: "blue", 
                fill:true,
                backgroundColor:getRandomColors(10),
                tension: 0.4, 
                pointStyle:"rect",
                pointRadius:7,
                pointHoverRadius:10,
                pointBackgroundColor:"blue",
                pointHoverBackgroundColor:"blue",
              }, 
            ]
            }} options={options} />
            </div>
              ))
        }
      </div>
      </div>
    </div>
    {
      confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
    }
    </div>
  )
}

