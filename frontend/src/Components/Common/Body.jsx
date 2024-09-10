import React from 'react';
import Card from './Card'
import { FaSearch } from "react-icons/fa";
import VotesCard from '../Core/Votes/VotesCard';
import {useSelector} from 'react-redux';

export default function Body({collections,name}) {
  const displaySidebar=useSelector(state=>state.sidebar.display);
  return (
    <div className=''>
        <div className='ml-5 mr-5 pb-10'>
        <h1 className='text-slate-700 font-semibold text-3xl font-mono mt-4 mb-4'>{name}</h1>

        {
           collections?.length > 0  ? (
             <div>
                    <div className='w-full flex sm:justify-end justify-center gap-2 items-center'>
                <input type='search' className='sm:w-96 w-72 py-1 px-3 border-2 border-gray-400 rounded-md' placeholder='Search'/>
                <button className='bg-blue-500 p-3 rounded-full'><FaSearch className='text-white'/></button>
            </div>

            <div className={`grid ${displaySidebar ? "lg:grid-cols-2":"lg:grid-cols-3"} md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2.5 mt-5`}>
                {
                   name!=='Votes' ? (
                    collections.map((collection,index)=>(
                      <Card collection={collection} key={index} identity={name}/>
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
    </div>
  )
}
