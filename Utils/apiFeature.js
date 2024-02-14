import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
 GPT_MEMBERSHIP_ADDRESS,
 GPT_MEMBERSHIP_ABI
} from '../Context/constants';

// Check wallet connection
export const CheckIfWalletConnected = async() =>{
 try {
  if(!window.ethereum) return console.log("Install Metamask!");

  const accounts = await window.ethereum.request({
   method: "eth_accounts",
  });

  const firstaccount = accounts[0];
  //console.log(firstaccount);

  return firstaccount;

 } catch (error) {
  console.log(error);
 }
}

// Connect Wallet
export const connectWallet = async() =>{
 try {
  if(!window.ethereum) return console.log("Install Metamask!");

  const accounts = await window.ethereum.request({
   method: "eth_requestAccounts",
  });

  const firstaccount = accounts[0];
  //console.log(firstaccount);
  
  return firstaccount;

 } catch (error) {
  console.log(error);
 }
}

// Fetch Contract
const fetchContract = (signerOrProvider) => 
   new ethers.Contract(
    GPT_MEMBERSHIP_ADDRESS,
    GPT_MEMBERSHIP_ABI,
    signerOrProvider
   );

// Connecting Contract
export const connectingWithContract = async() => {
 try {
  const web3modal = new Web3Modal();
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = fetchContract(signer);

  return contract;
  
 } catch (error) {
  console.log(error);
 }
}