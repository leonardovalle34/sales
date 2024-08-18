import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { Sale } from "../../models/sale";
import { BASE_URL } from "../../utils/request";
import NotificationButton from "../notificationButton";
import "./styles.css";

const SalesCard = ()=>{
    const min =new Date(new Date().setDate(new Date().getDate()-90))
    const max = new Date()
    const [minDate, setMinDate] = useState(min)
    const [maxDate, setMaxDate] = useState(max)

    const [Sale , setSale] = useState<Sale[]>([])
    
    useEffect(()=>{
      const min = minDate.toISOString().substring(0,10)
      const max = maxDate.toISOString().substring(0,10) 

      axios.get(`${BASE_URL}/sales?minDate=${min}&maxDate=${max}`).then((response)=>{
        setSale(response.data.content)
      })
    },[minDate, maxDate])
    
    return (
      <>
        <div className="dsmeta-card">
          <h2 className="dsmeta-sales-title">Vendas</h2>
          <div>
              <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date)=>setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
              </div>
              <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date)=>setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
              </div>
          </div>

          <div>
            <table className="dsmeta-sales-table">
              <thead>
                  <tr>
                      
                      <th className="show576">Data</th>
                      <th>Vendedor</th>
                      <th className="show992">Visitas</th>
                      <th className="show992">Vendas</th>
                      <th>Total</th>
                      <th>Notificar</th>
                  </tr>
              </thead>
              <tbody>
                {
                  Sale.map(el=>
                    <tr key={el.id}>
                    
                      <td className="show576">{new Date(el.date).toLocaleDateString()}</td>
                      <td>{el.sellerName}</td>
                      <td className="show992">{el.visited}</td>
                      <td className="show992">{el.deals}</td>
                      <td>R$ {el.amount.toFixed(2)}</td>
                      <td>
                        <div className="dsmeta-red-btn-container">
                          <div className="dsmeta-red-btn">
                            <NotificationButton id={el.id}/>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }

export default SalesCard