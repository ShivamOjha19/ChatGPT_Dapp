import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  GPT_MEMBERSHIP_ADDRESS,
  GPT_MEMBERSHIP_ABI,
} from "../Context/constants";

// Check wallet connection
export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask!");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstaccount = accounts[0];
    //console.log(firstaccount);

    return firstaccount;
  } catch (error) {
    console.log(error);
  }
};

// Connect Wallet
export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install Metamask!");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstaccount = accounts[0];
    //console.log(firstaccount);

    return firstaccount;
  } catch (error) {
    console.log(error);
  }
};

// Fetch Contract
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    GPT_MEMBERSHIP_ADDRESS,
    GPT_MEMBERSHIP_ABI,
    signerOrProvider
  );

// Connecting Contract
export const connectingWithContract = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    console.log(contract);
    return contract;
  } catch (error) {
    console.log(error);
  }
};
export const fetchData = async () => {
  try {
    // Loading data from local Storage
    const freeTrial = localStorage.getItem("FreeTrial");
    const FREE_TRIAL = JSON.parse(freeTrial);
    //setFree(freeTrial);

    //Get The contract data
    const contract = await connectingWithContract();
    const connectAccount = await connectWallet();
    setAddress(connectAccount);

    //console.log(contract);
    const oneMonth = await contract.getMemberships(1);
    const sixMonth = await contract.getMemberships(2);
    const oneYear = await contract.getMemberships(3);

    console.log(oneMonth);
    /*
  // Get Membership
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
  setContractMembership(contractMembership);

  // Get User Membership
  const userMembership = await contract.getUsermembership(connectAccount);

  userMembership = {
   addressUser: userMembership.addressUser.toLowerCase(),
   expiredate: userMembership.expiredate,
   cost: ethers.utils.formatUnits(userMembership.cost.toString(), "ether"),
   membershipId: userMembership.membershipId.toNumber(),
   id: userMembership.id.toNumber(),
  };

  console.log(userMembership);*/
  } catch (error) {
    console.log(error);
  }
};
