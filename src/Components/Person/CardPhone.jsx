import React from "react";

function CardPhone ({indice, number, is_whatsapp, removerPhone}) {
    return (
        <section style={{background:"#cdcdcd","border-radius":"5px", width:"135px",height:"65px",position:"relative",padding:"5px",float:"left",margin:"5px"}}>
            <div style={{position:"absolute",right:"5px",top:0,cursor:"pointer"}} onClick={() => { removerPhone(indice) }}>x</div>
            <p>
                {number}
                <br/>
                <small>{is_whatsapp ? "WhatsApp" : ""}</small>
            </p>
        </section>
    );
}

export default CardPhone;