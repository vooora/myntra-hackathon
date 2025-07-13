import React, { useState } from "react";  
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import "./HeaderTop.css";
import "./WhiteH.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Switch, Route, useNavigate } from "react-router-dom";

function getToken() {
  let loggedIn = localStorage.getItem("Token");
  return loggedIn;
}

function WhiteH() {
  const navigate = useNavigate();
  const [isSearching, setIsSearching] = useState(true);
  const [searchedPro, setSearchedPro] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // function handleChange(event) {
  //   fetch(`http://localhost:3001/products?name=${event.target.value}`).then(
  //     (res)=>{console.log(res.json());}
  //   );
  // }

  const handler = async (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };
  const handleChange = async (event) => {
    event.preventDefault();
    if (event.target.value != "") {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }

    const fetchData = await fetch(`http://localhost:3001/products/find/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name: event.target.value }),
    });

    const dataRes = await fetchData.json();

    setSearchedPro([dataRes]);
    if (event.key !== "Enter") return;
    if (dataRes[0]) navigate(`/products/id/${dataRes[0]._id}`);
    window.location.reload(0);
    // if(!dataRes.message)
    // {
    //     navigate(`/products/${dataRes.name}`);
    //     window.location.reload(0);
    // }
  };

  return (
    <div className="whiteH">
      <Link to="/">
        <div>
          <img
            className="brandlogo"
            src={require("../images/myntra.png")}
            alt="brand logo"
          />
        </div>
      </Link>
      {/* <div className="dwd">
        <Link to="/sell">
          <div>
            <a href="">Sell </a>
          </div>
        </Link>
      </div> */}
      <div className="searchbarsb">
        <input
          type="text"
          placeholder="Search products"
          className="input-box"
          id="searcher"
          onKeyUp={handleChange}
          onInput={handler}
          value={searchQuery}
        ></input>
        <SearchIcon sx={{ fontSize:50 }} />
        <div className="srch" style={isSearching ? { display: "none" } : {}}>
          {searchedPro[0] && searchedPro[0].length > 0
            ? searchedPro[0].map((p) => {
                if (p) {
                  let lnk = `/products/id/${p._id}`;
                  return (
                    <div>
                      <Link
                        to={lnk}
                        onClick={() => {
                          setIsSearching(1);
                          setSearchQuery("");
                        }}
                      >
                        <div className="srchpro">
                          <div className="srchproimg">
                            <img
                              src={p.image}
                              alt="product-img"
                              className="srchimg"
                            />
                          </div>
                          <div className="srchdet">
                            <h3>{p.name}</h3>
                            <p className="srchp">{p.description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })
            : "No Products Found"}
        </div>
      </div>
      <div className="iconss">
        <div className="searchbar">
          {getToken() == 1 ? (
            <Link to="/profile">
              <AccountCircleOutlinedIcon sx={{ fontSize: 40 }}/>{" "}
            </Link>
          ) : (
            <Link to="/login">
              <AccountCircleOutlinedIcon sx={{ fontSize: 50 }}/>{" "}
            </Link>
          )}
        </div>

        <div className="searchbar">
        <Link to="/chat">
            <FavoriteBorderIcon sx={{ fontSize: 50 }} />{" "}
       </Link>
        </div>
        <div className="searchbar">
          <Link to="/cart">
            <ShoppingBagOutlinedIcon  sx={{ fontSize: 50 }}/>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WhiteH;
