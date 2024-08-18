import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/request";
import "./styles.css";

const SaleInsertForm = () => {
  const [sellers, setSellers] = useState<string[]>([]);
  const [sellerName, setSellerName] = useState<string>("");
  const [visited, setVisited] = useState<number>(0);
  const [deals, setDeals] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [success, setSuccess] = useState<boolean>(false);
  const [sale , setSale] = useState<any>()

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sales/sellers`);
        setSellers(response.data);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchSellers();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const newSale = {
        sellerName,
        visited,
        deals,
        amount,
        date: `${year}-${month + 1}` // Formato YYYY-MM
      };

      await axios.post(`${BASE_URL}/sales`, newSale);
      setSuccess(true);
      setSellerName("");
      setVisited(0);
      setDeals(0);
      setAmount(0);
      setMonth(new Date().getMonth());
      setYear(new Date().getFullYear());
    } catch (error) {
      console.error("Error inserting sale:", error);
      setSuccess(false);
    }
  };

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const years = Array.from(new Array(10), (val, index) => new Date().getFullYear() - index);

  const loadComponent = async()=>{
    await axios.get(`${BASE_URL}/sales?minDate=2024-05-20&maxDate=2024-08-31`).then((response)=>{
        setSale(response.data.content)
      })
  }

  useEffect(()=>{
    loadComponent()
  },[])

  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Inserir Venda</h2>
      <form onSubmit={handleSubmit} className="dsmeta-form">
        <div className="dsmeta-form-control-container">
          <label htmlFor="sellerName">Vendedor:</label>
          <select
            id="sellerName"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="dsmeta-form-control"
            required
          >
            <option value="">Selecione um vendedor</option>
            {sale?.map((seller:any, index:number) => (
              <option key={index} value={seller}>
                {seller?.sellerName}
              </option>
            ))}
          </select>
        </div>

        <div className="dsmeta-form-control-container">
          <label htmlFor="visited">Visitas:</label>
          <input
            type="number"
            id="visited"
            value={visited}
            onChange={(e) => setVisited(Number(e.target.value))}
            required
          />
        </div>

        <div className="dsmeta-form-control-container">
          <label htmlFor="deals">Vendas:</label>
          <input
            type="number"
            id="deals"
            value={deals}
            onChange={(e) => setDeals(Number(e.target.value))}
            required
          />
        </div>

        <div className="dsmeta-form-control-container">
          <label htmlFor="amount">Total:</label>
          <input
            type="number"
            id="amount"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div className="dsmeta-form-control-container">
          <label htmlFor="month">Mês:</label>
          <select
            id="month"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="dsmeta-form-control"
          >
            {months.map((monthName, index) => (
              <option key={index} value={index}>
                {monthName}
              </option>
            ))}
          </select>
        </div>

        <div className="dsmeta-form-control-container">
          <label htmlFor="year">Ano:</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="dsmeta-form-control"
          >
            {years.map((yearOption) => (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="dsmeta-btn">Salvar</button>
      </form>

      {success && <p className="success-message">Venda inserida com sucesso!</p>}
    </div>
  );
};

export default SaleInsertForm;
