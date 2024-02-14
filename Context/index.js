import React, {useEffect, useState, createContext, useContext} from "react";
import { ethers } from "ethers";

//Internal Import
import {CheckIfWalletConnected, connectWallet, connectingWithContract} from '../Utils/apiFeature'
import { Divider } from "@material-ui/core";

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
 
 const DAPP_NAME = "GPT_MEMBERSHIP";
 //State Variables
 const [address, setAddress] = useState("");
 const [contractMembership, setContractMembership] = useState([]);
 const [Free, setFree] = useState();
 const [userMembership, setUserMembership] = useState({});

// Fectching Contract Data
const fetchData = async() => {
 try {
  // Loading data from local Storage
  const freeTrial = localStorage.getItem("FreeTrial");
  const FREE_TRIAL = JSON.parse(freeTrial);
  setFree(freeTrial);

  //Get The contract data 
  const contract = await connectingWithContract();
  const connectAccount = await connectWallet();
  setAddress(connectAccount);

  console.log(contract);

  // Get Membership

 } catch (error) {
  console.log(error);
 }
}

 return(
  
  <StateContext.Provider value={{DAPP_NAME}}>
   {children}
  </StateContext.Provider>
 
 
 );
};

export const useStateContext = () => useContext(StateContext);