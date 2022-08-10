import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { useMemo } from "react";

export const List = (props, {}) => {
  const [userId, setUserId] = useState(props.userId);
  const [registers, setRegisters] = useState(null);
const [field, setField] = useState(null);

  const getRegisterInfo = () => {
    $.ajax({
      cache: false,
      type: "GET",
      url: "https://localhost:44323/Users/GetUserList?userId=" + userId,
      success: function (data, textStatus, jqXHR) {
        var elementList = JSON.parse(data);
        if (elementList.Elements == null) {
          elementList.Elements = [];
        }
        setRegisters(elementList);
        return elementList;
      },
      error: function (jqXHR, textStatus, errorThrown) {
        return null;
      },
    });
  };

  const [list, setList] = useState(getRegisterInfo);

  const deleteRegister = (registerId) => {
    if (window.confirm("¿Seguro que desea eliminar el registro?")) {
      $.ajax({
        cache: false,
        type: "DELETE",
        url:
          "https://localhost:44323/Users/DeleteElementToList?idElement=" +
          registerId,
        success: function (data, textStatus, jqXHR) {
          getRegisterInfo();
        },
        error: function (jqXHR, textStatus, errorThrown) {
          return null;
        },
      });
    }
  };

  const saveRegister = () => {
    var newElementName = $("#register-name").val();
    if (newElementName == "") {
      alert("Debe ingresar un nombre.");
      return;
    }
    var objRegister = {
      listId: registers.Id,
      elementName: newElementName,
    };
    $.ajax({
      cache: false,
      type: "POST",
      url: "https://localhost:44323/Users/InsertElementToList",
      data: JSON.stringify(objRegister),
      headers: { "Content-Type": "application/json" },
      dataType: "json",
      success: function (data, textStatus, jqXHR) {
$("#register-name").val("");
        getRegisterInfo();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        return null;
      },
    });
  };


const setSortedField = useMemo((op)=>{
if(!field) return registers;
if(field==="firstName")
return registers.Elements.sort((a, b) => {
    let fa = a.ElementName.toLowerCase(),
        fb = b.ElementName.toLowerCase();

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
})

if(field==="number")
return registers.Elements.sort((a, b) => {
    return a.Id - b.Id;
})

}, [ registers, field]);
  return (
    <div className="container">
      <div>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addRegister"
        >
          <FontAwesomeIcon icon={faPlus} /> Agregar elemento
        </button>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col"><a href="#" onClick={() => setField("number")}>#</a></th>
              <th scope="col"><a href="#" onClick={() => setField("firstName")}>
              Nombre
            </a></th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {registers !== null ? (
              registers.Elements.length > 0 ? (
                registers.Elements.map((registro, index) => (
                  <tr key={index}>
                    <th>{registro.Id}</th>
                    <td>{registro.ElementName}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-default"
                        onClick={() => deleteRegister(registro.Id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <td colspan="3">No hay registros en la lista</td>
              )
            ) : (
              <td colspan="3">No hay registros en la lista</td>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="modal fade"
        id="addRegister"
        tabindex="-1"
        aria-labelledby="addRegisterLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Agregar elemento
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-3">
                  <label htmlFor="register-name" className="col-form-label">
                    Nombre:
                  </label>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control"
                    id="register-name"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-primary"
data-bs-dismiss="modal"
                onClick={() => saveRegister()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
