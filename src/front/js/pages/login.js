import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/login.css";



export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault()
       
        actions.login(email, password).then((data)=>{
            console.log(data,"data")
            if(data==undefined){
                alert("Error en correo o contraseña")
            }
     })
    }
    if (store.token && store.token != "" && store.token != undefined) history.push('/private')
    return (<>

        <div className="container-fluid login-container">

            <form name="form1" action="#">
                <div className="row justify-content-center">
                    <div className="col-6 login-form-1">
                        <h3>Inicia sesión </h3>

                        <div className="form-group">
                            <label htmlFor="inputEmail" className="control-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <div className="help-block with-errors"></div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="inputPassword" className="control-label" required>Ingrese Contraseña</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>


                        </div>
                        <div className="btnEntrar">
                            <button className="btn btn-primary" onClick={(e)=>handleClick(e)}>Entrar</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </>)

}