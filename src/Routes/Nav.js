import React, { Component } from 'react'
import {NavLink}  from 'react-router-dom'
import Search from '../Components/Search'
import './Nav.css';


class Nav extends Component {    
    
    render() {
        var header = "EL ALERCE"
        return (
            <div>
                <h1>{header}</h1>
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/paciente/nuevo">Nuevo Paciente</NavLink></li>
                    <li><NavLink to="/paciente/list">Lista de Pacientes</NavLink></li>
                </ul>
                <Search></Search>
            </div>
        )
    }
}
export default Nav