import React from 'react'
import { DummyPositions } from '../Data/DummyPositions'
import Body from '../Components/Common/Body'

export default function Positions() {
  return (
    <Body collections={DummyPositions} name="Positions"/>
  )
}
