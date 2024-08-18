import React  from 'react'
import "./styles.css"
import logo from "../../assets/img/logogrande.png"

const Header = ()=>{
    return(
        <header>
            <div className='dsmeta-logo-container'>
                <img src={logo} alt="dsmeta" />
                <h1>SalesApp</h1>
                <p>
                    Desenvolvidor por:
                    <a href='https://leonardovalle34.github.io/cv' target="_blank"> LV Software house </a>
                </p>
            </div>
        </header>
    )
}

export default Header