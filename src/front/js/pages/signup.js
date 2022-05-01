
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleClick = (e) => {

        if (email != "" && password != "" && password != undefined) {

            e.preventDefault()
            actions.registrarse(email, password).then((data) => {
                console.log(data, "data")
                if (data && data.mensaje && data.mensaje.toLowerCase() === "ok") {
                    setEmail("")
                    setPassword("")
                    alert("Usuario registrado ok")
                  }
                if (data.Error != undefined) {
                    alert("Correo ya registrado")
                }

            });

        };

    }

    return (
        <>

            <div className="container-fluid login-container">

                <form name="form1" action="#">
                    <div className="row justify-content-center">
                        <div className="col-6 login-form-1">
                            <h3>Registrate </h3>

                            <div className="form-group">
                                <label htmlFor="inputEmail" className="control-label">Email</label>
                                <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <div className="help-block with-errors"></div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputPassword" className="control-label" required>Ingrese Contraseña</label>
                                <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />


                            </div>
                            <div className="btnEntrar">
                                <button className="btn btn-primary" onClick={(e)=>handleClick(e)}>Registrarse</button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>


        </>
    )

}