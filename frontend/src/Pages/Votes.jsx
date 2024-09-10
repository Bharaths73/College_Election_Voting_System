import React from 'react'
import Body from '../Components/Common/Body'
import { DummyVotes } from '../Data/DummyVotes'

export default function Votes() {
  return (
    <Body collections={DummyVotes} name='Votes'/>
  )
}
