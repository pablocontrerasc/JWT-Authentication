import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);

    
    useEffect(() => {
       
          if (store.token && store.token != "" && store.token != undefined)
            actions.getMessage();
        
     
      }, [store.token]);

      const mensaje = store.message;
    console.log(store.message)  


      
    return (
        <>
 <div className="row justify-content-center registro noCompra">
              <div className="col-6">
              <p>{mensaje}</p>
              </div>
            </div>
       
        </>
    )

}