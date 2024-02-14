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

  //console.log(contract);
  const oneMonth = await contract.getMemberships(1);
  const sixMonth = await contract.getMemberships(2);
  const oneYear = await contract.getMemberships(3);

  contractMembership = [
   {
    membership_name: oneMonth?.name,
    membership_date: oneMonth?.date,
    membership_id: oneMonth?.id.toNumber(),
    membership_cost: ethers.utils.formatUnits(
     oneMonth?.cost.toString(),
     "ether"
    )
   },
   {
    membership_name: sixMonth?.name,
    membership_date: sixMonth?.date,
    membership_id: sixMonth?.id.toNumber(),
    membership_cost: ethers.utils.formatUnits(
     sixMonth?.cost.toString(),
     "ether"
    )
   },
   {
    membership_name: oneYear?.name,
    membership_date: oneYear?.date,
    membership_id: oneYear?.id.toNumber(),
    membership_cost: ethers.utils.formatUnits(
     oneYear?.cost.toString(),
     "ether"
    )
   }
  ];

  console.log(contractMembership);

  // Get Membership

  //const oneMonth = await contract.getMemberships(1);
  //const sixMonth = await contract.getMemberships(2);
  //const oneYear = await contract.getMemberships(3);


 } catch (error) {
  console.log(error);
 }
}

// Listing Memberships
const listMembership = async () => {
 const amount = 1;
 const MEMBERSHIP_NAME = "One Month";
 const MEMBERSHIP_COST = ethers.utils.parseUnits(
  amount.toString(),
  "ether"
 );
 const MEMBERSHIP_DATE = "January 01 2024";

 const contract = await connectingWithContract();
 const list = await contract.list(
  MEMBERSHIP_NAME,
  MEMBERSHIP_COST,
  MEMBERSHIP_DATE
 );

 await list.wait();
 console.log(list);
}

useEffect(() => {
 fetchData();
}, [])

 return(
  
  <StateContext.Provider value={{DAPP_NAME, listMembership}}>
   {children}
  </StateContext.Provider>
 
 
 );
};

export const useStateContext = () => useContext(StateContext);