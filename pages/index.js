import React, {useState, useEffect} from 'react'

//Internal Import
import { useStateContext } from '../Context/index'
const index = () => {
  //State Management Variable
  const { DAPP_NAME } = useStateContext();
  return (
    <div className="icon-custom">{DAPP_NAME}</div>
  )
}

export default index