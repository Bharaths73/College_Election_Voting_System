import React from 'react'
import Body from '../Components/Common/Body'
import { DummyCandidate } from '../Data/DummyCandidates' 

export default function Candidates() {
  return (
    <Body collections={DummyCandidate} name="Candidates"/>
  )
}
