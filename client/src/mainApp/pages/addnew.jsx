import React from "react";
import "./addnew.css";
const Addnew = () => {
  return (
    <div>
      <h1>List new product</h1>
      <form action="backend.php">
        <table cellspacing="20px">
          <tr>
            <td>
              <label for="pdname">Product Name:</label>
            </td>
            <td>
              <input type="text" id="pdname" placeholder="eg.Headphones" />
            </td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>
              <textarea
                name="desc"
                id=""
                cols="20"
                rows="5"
                placeholder="                                   Describe condition of the product"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>Minimum Bid:</td>
            <td>
              &#8377;
              <input type="number" name="" id="" placeholder="   eg.500" />
            </td>
          </tr>
          <tr>
            <td>Bid End Date:</td>
            <td>
              <input type="date" name="" id="" />
            </td>
          </tr>
          <tr>
            <td>Product Image:</td>
            <td>
              <input type="url" name="" placeholder="Enter URL" id="" />{" "}
            </td>
          </tr>
          <tr></tr>
        </table>
        {/* <label for = "pdname">Product Name:</label>
        <input type="text" id = "pdname"/>
        <div>Description:  <br /> <textarea name="desc" id="" cols="20" rows="5"></textarea></div>
        <div>Minimum Bid: &#8377;<input type="number" name="" id="" /></div>
        <div>Bid End Date: <input type="date" name="" id="" /></div>
        <div>Upload product image URL: <input type="url" name="" id="" /></div> */}
        <div>
          <button type="submit" id="btn-hi">
            START BID
          </button>

          <button type="reset" id="btn-hi">
            RESET
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addnew;
