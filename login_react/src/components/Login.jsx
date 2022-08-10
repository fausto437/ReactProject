import React, { useState } from "react";
import { Menu } from "./Menu";
import $ from "jquery";

export const Login = () => {
  const [loginStatus, setLoginStatus] = useState("false");
  const [usr, setUsr] = useState("");
  const [pss, setPass] = useState("");
  

  function loginFn(e) {
    e.preventDefault();
    
    var ustTxtStr = document.getElementById("usrTxt").value;
    var passTxtStr = document.getElementById("passTxt").value;
    //Se valida que se envíe usuario y contraseña
    if (ustTxtStr.length == 0 || passTxtStr.length == 0) {
      alert("Se requiere ingresar los datos de usuario y contraseña");
    } else {
      //Se valida en la base
      $.ajax({
        cache: false,
        type: "GET",
        url:
          "https://localhost:44323/Users/GetUser?usr=" +
          ustTxtStr +
          "&pss=" +
          passTxtStr,
        success: function (data, textStatus, jqXHR) {
          //Si es correcto se muestra el menú
          if (data != 0) {
            setUsr(data);
            setLoginStatus("true");
            document.getElementById("formLogin").style.display = "none";
            document.getElementById("div-menu").style.display = "block";
          }
          //Si NO es correcto se muestra msj de error
          else {
            alert("Los datos ingresados son incorrectos.");
            setLoginStatus("false");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          alert("Los datos ingresados son incorrectos.");
          setLoginStatus("false");
        },
      });
    }
  }

  return (
    <div>
      <form id="formLogin">
        <div className="container">
          <div>
            <label htmlFor="">Usuario</label>
            <input
              type="text"
              className="form-control"
              name=""
              id="usrTxt"
              placeholder=""
              onChange={(e) => setUsr(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Contraseña</label>
            <input
              type="password"
              className="form-control"
              name=""
              id="passTxt"
              placeholder=""
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={loginFn}>
            Conectar
          </button>
        </div>
      </form>
      {loginStatus === "true" ? <Menu userId={usr} /> : ""}
    </div>
  );
};
