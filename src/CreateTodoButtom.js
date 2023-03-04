import React from "react";
import './CreateTodoButtom.css';

function CreateTodoButtom(props){

    const onClickButton = (msg) =>{
        alert(msg)
    }

    return(
        <button 
        className="CreateTodoButtom"
        onClick={() => onClickButton ('Aquí se debería abrir un modal')}
        >
            +
        </button>
    );
}

export { CreateTodoButtom};