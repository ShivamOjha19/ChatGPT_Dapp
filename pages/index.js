import React, { useState, useEffect } from "react";

//Internal Import
import { useStateContext } from "../Context/index";
import { fetchData } from "../Utils/apiFeature";
const index = () => {
  //State Management Variable
  const { DAPP_NAME, listMembership } = useStateContext();
  return (
    <div className="icon-custom">
      <p>{DAPP_NAME}</p>
      <button onClick={() => listMembership()}>List Membership</button>
    </div>
  );
};

export default index;
