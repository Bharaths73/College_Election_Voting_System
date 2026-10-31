import React from 'react'
import Profile from '../../../assets/profile.jpg'
import arrow from '../../../assets/arrow.webp'

export default function VotesCard({collection,identity}) {
  return (
    <article className='vote-record'>
        <div className='vote-record-person vote-voter'>
            <div className='vote-record-heading'>
                <img src={Profile} loading='lazy' alt=''/>
                <div>
                    <span className='vote-record-role'>Name</span>
                    <h2>{collection?.voter?.firstName+" "+collection?.voter?.lastName}</h2>
                </div>
            </div>
            <dl className='vote-record-details'>
                <div className='vote-record-detail'>
                    <dt>Register number</dt>
                    <dd>{collection.voter.profile.registerNumber}</dd>
                </div>
                <div className='vote-record-detail'>
                    <dt>Department</dt>
                    <dd>{collection.voter.profile.department}</dd>
                </div>
            </dl>
        </div>

        <div className='vote-record-connector' aria-hidden='true'>
            <span/>
            <img src={arrow}/>
            <span/>
        </div>

        <div className='vote-record-person vote-candidate'>
            <div className='vote-record-heading'>
                <img src={Profile} loading='lazy' alt=''/>
                <div>
                    <span className='vote-record-role'>Name</span>
                    <h2>{collection.candidate.firstname+" "+collection.candidate.lastName}</h2>
                </div>
            </div>
            <dl className='vote-record-details'>
                <div className='vote-record-detail'>
                    <dt>Register number</dt>
                    <dd>{collection.candidate.registerNumber}</dd>
                </div>
                <div className='vote-record-detail'>
                    <dt>Department</dt>
                    <dd>{collection.candidate.department}</dd>
                </div>
                <div className='vote-record-detail'>
                    <dt>Position</dt>
                    <dd>{collection.candidate.position.positionName}</dd>
                </div>
            </dl>
        </div>
    </article>
  )
}
