import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
export const Login = () => {


    return (<>

        <div className="container-fluid login-container">

            <form name="form1" action="#">
                <div className="row justify-content-center">
                    <div className="col-6 login-form-1">
                        <h3>Inicia sesión </h3>

                        <div className="form-group">
                            <label htmlFor="inputEmail" className="control-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                            <div className="help-block with-errors"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPassword" className="control-label" required>Ingrese Contraseña</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" />


                        </div>
                        <div className="btnEntrar">
                            <button className="btn btn-primary">Entrar</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </>)

}