import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import "./Body.css";
import Carou from "./Carou";
import Recommender from "./recommender";

function Body() {
  return (
    <div className="bodyDiv">
      <div className="transparent-div-black">
      <Recommender/>
      </div>
    </div>
  );
}

export default Body;
