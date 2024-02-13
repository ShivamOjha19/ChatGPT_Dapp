import React, {useEffect, useState, createContext, useContext} from "react";
import { ethers } from "ethers";

//Internal Import
import {CheckIfWalletConnected, connectWallet, connectingWithContract} from '../Utils/apiFeature'

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
 
 const DAPP_NAME = "GPT_MEMBERSHIP";

 return(
  <StateContext.Provider value={{DAPP_NAME}}>
   {children}
  </StateContext.Provider>
 );
};

export const useStateContext = () => useContext(StateContext);