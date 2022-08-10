import React, { useState } from "react";
import {NavLink} from "react-router-dom"
import { UserInfo } from "./UserInfo";
import {List} from "./List";

export const Menu = (props) =>{

const [userId, setUserId] = useState(props.userId);
const [userInf, setUserInf] = useState("");
const [lst, setLst] = useState("");

function cerrarSesion(){
document.getElementById("div-menu").style.display = "none";
document.getElementById("formLogin").style.display = "block";
document.getElementById("usrTxt").value = "";
document.getElementById("passTxt").value= "";
}

function goToAddress(){
setUserInf("true");
setLst("false");
}

function goToList(){
setUserInf("false");
setLst("true");
}
    return (
<div id="div-menu">
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Inicio</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="" className="nav-link" onClick={goToList}>Listas</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="" className="nav-link" onClick={goToAddress}>Direcci&oacute;n</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#" onClick={cerrarSesion}>Cerrar sesión</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
{userInf==="true" && <UserInfo userId={userId}/>}
{lst==="true" && <List userId={userId}/>}
</div>
)
}