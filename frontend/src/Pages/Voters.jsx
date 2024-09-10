import React from 'react'
import Card from '../Components/Common/Card'
import { DummyVoter } from '../Data/DummyVoters'
import Body from '../Components/Common/Body'


export default function Voters() {
  
  return (
      <Body collections={DummyVoter} name="Voters"/>
  )
}
