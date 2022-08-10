import React, { useState, useEffect } from "react";
import $ from "jquery";

export const UserInfo = (props) => {
  const [userId, setUserId] = useState(props.userId);
  const [Id, setId] = useState(1);
  const [address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Picture, setPicture] = useState(null);
  const [PictureB, setPictureB] = useState(null);

  const getUserInfo = () => {
    $.ajax({
      cache: false,
      type: "GET",
      url: "https://localhost:44323/Users/GetUserAddress?userId=" + userId,
      success: function (data, textStatus, jqXHR) {
        var ob = JSON.parse(data);
        setAddress(ob.address);
        setCity(ob.City);
        setCountry(ob.Country);
        setPhone(ob.Phone);
        setEmail(ob.Email);
        if (ob.Picture != null) setPictureB(ob.Picture);
        return ob;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        return "";
      },
    });
  };
  const [userInfo, setUserInfo] = useState(getUserInfo);
  const guardarCambios = (e) => {
    e.preventDefault();
    var body = { Id, address, City, Country, Phone, Email, Picture };
    var form = new FormData();
    form.append("Id", Id);
    form.append("address", address);
    form.append("City", City);
    form.append("Country", Country);
    form.append("Phone", Phone);
    form.append("Email", Email);
    form.append("Picture", Picture);
    $.ajax({
      cache: false,
      type: "POST",
      url: "https://localhost:44323/Users/UpdateUserAddress",
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
      success: function (data, textStatus, jqXHR) {
        getUserInfo();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      },
    });
  };

  const handleChange = (e) => {
    const [f] = e.target.files;
    setPicture(f);
  };
  return (
    <div className="container">
      <form className="" onSubmit={guardarCambios}>
        <div className="row">
          <div className="col-3">
            <label htmlFor="addressTxt" className="form-control-plaintext">
              Dirección
            </label>
            <label htmlFor="cityTxt" className="form-control-plaintext">
              Ciudad
            </label>
            <label htmlFor="countryTxt" className="form-control-plaintext">
              País
            </label>
            <label htmlFor="phoneTxt" className="form-control-plaintext">
              Teléfono
            </label>
            <label htmlFor="emailTxt" className="form-control-plaintext">
              Correo
            </label>
            <label htmlFor="picValue" className="form-control-plaintext">
              Imágen de perfil
            </label>
          </div>
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              id="addressTxt"
              value={address}
              placeholder="Dirección"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control"
              id="cityTxt"
              placeholder="Ciudad"
              value={City}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="countryTxt"
              placeholder="País"
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="phoneTxt"
              placeholder="Teléfono"
              maxLength={10}
              value={Phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              id="emailTxt"
              placeholder="Correo"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="file"
              className="form-control"
              id="picValue"
              onChange={handleChange}
              multiple={false}
              accept=".jpeg, .jpg"
            />
            {PictureB !=null ? (
              <img src={`data:image/jpeg;base64,${PictureB}`} width="200" />
            ) : (
              <p>No se ha cargado imagen.</p>
            )}
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
