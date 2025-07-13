  import React,{useState} from 'react';
  import './calculator.css';
  import { Link } from "react-router-dom";
  
    const Calculator = () => {
      const [showResult, setShowResult] = useState(false);
    
      const handleCalculate = (e) => {
        e.preventDefault();
        setShowResult(true);
      };
    
    return (
      <div className="whiteebox">
        <div>
        <h2>Body Type Calculator</h2>
        {!showResult && ( <form>
          <div className="input-group">
            <label htmlFor="bust">Bust Size</label>
            <div className="input-with-unit">
              <input type="number" id="bust" name="bust" />
              <select>
                <option value="in">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="waist">Waist Size</label>
            <div className="input-with-unit">
              <input type="number" id="waist" name="waist" />
              <select>
                <option value="in">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="high-hip">High Hip Size</label>
            <div className="input-with-unit">
              <input type="number" id="high-hip" name="high-hip" />
              <select>
                <option value="in">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="hip">Hip Size</label>
            <div className="input-with-unit">
              <input type="number" id="hip" name="hip" />
              <select>
                <option value="in">in</option>
                <option value="cm">cm</option>
              </select>
            </div>
          </div>
          {!showResult && (
          <button type="submit" className="calculate-button" onClick={handleCalculate}>CALCULATE</button>
          )}
        </form> )}
        {showResult && (
          <div className="result">
           <img  className="tri-img" src={require("../images/pear.png")} alt="Triangle Body Type" />
            <p className='random'> You are a Triangle!</p>
          </div>
        )}
         <Link to="/triangle">
        {showResult && (<button className="continuee-button">  CONTINUE</button>)}
        </Link>
        </div>
      </div>
    );
  };

  export default Calculator;
