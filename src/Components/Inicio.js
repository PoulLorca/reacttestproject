import React, { Component } from 'react'
import ListarPacientes from './ListarPacientes'
import './Styles/Inicio.css'

class Inicio extends Component {
  render() {
    return (
      <div  id="tablaDatos">
        <h2>Pacientes</h2>
      <ListarPacientes home="true"></ListarPacientes>
      </div>
    )
  }
}
export default Inicio
