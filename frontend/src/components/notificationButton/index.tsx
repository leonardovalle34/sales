import axios from "axios"
import React from "react"
import icon from "../../assets/img/notification-icon.svg"
import { BASE_URL } from "../../utils/request"
import "./styles.css";
import { toast } from 'react-toastify';

type Props= {
    id : number
}

const handleNotification = (saleId : number)=>{
    axios(`${BASE_URL}/sales/${saleId} /notification`).then(response => {
        toast.info("SMS enviado com sucesso!")
    })
}

const NotificationButton = ({id} : Props)=>{

    return(
        <div className="dsmeta-red-btn" onClick={()=>handleNotification(id)}>
            <img src={icon} alt="icone vendedor" />
        </div>
    )    
}

export default NotificationButton