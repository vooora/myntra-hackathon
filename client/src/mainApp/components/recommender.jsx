import React from "react";
import "./recommender.css";
import { Link } from "react-router-dom";


function Recommender() {
  return (
    <div className="whitebox">
   
      <h2>Select your body type</h2>
      <p>Unsure of your body type? 
      <span>  <Link to="/calculator"> <a>Use our calculator!</a> </Link> </span> </p>
      <div className="grid-container">
        <div className="grid-item">    <Link to="/triangle"> <img  className="hourglass" src={require("../images/hourglass.png")} alt="hourglass" />  </Link></div>
        <div className="grid-item">  <Link to="/triangle"> <img  className="apple"src={require("../images/apple.png")} alt="Body Type 2" />  </Link></div>
        <div className="grid-item">  <Link to="/triangle"> <img  className="rectl" src={require("../images/rectangle.png")} alt="Body Type 3" />  </Link></div>
        <div className="grid-item">  <Link to="/triangle"> <img  className="pear" src={require("../images/pear.png")} alt="Body Type 3" />  </Link></div>
        <div className="grid-item">  <Link to="triangle"> <img  className="inverti" src={require("../images/inverti.png")} alt="Body Type 4" /> </Link></div>
        {/* <div className="grid-item">  <Link to="/"> <img  className="rectangle"src={require("../images/rect.png")} alt="Body Type 5" /></Link></div> */}
      </div>
      {/* <button className="continue-button">CONTINUE</button> */}
    </div>
  );
}

export default Recommender;
