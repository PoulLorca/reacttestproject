import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import URL from '../Common/Global'

class ListarPacientes extends Component {
  url = URL.API

  state = {
    users: [],
    status: null
  }

  componentDidMount() {    
    var search = this.props.search
    if (search && search !== null && search !== undefined) {
      this.getUsersBySearch(search)
    } else {
      this.getUsers()
    }
  }

  getUsers = () => {
    axios.get(this.url + '/pacientes').then(res => {
      this.setState({
        users: res.data.pacientes,
        status: 'success'
      })
    })
  }

  getUsersBySearch = (search) => {
    axios.get(this.url + '/search/enfermedad/' + search).then(res => {
      if (res.data.user) {
        this.setState({
          users: res.data.pacientes,
          status: 'sucess'
        })
      } else {
        this.state({
          users: res.data.pacientes,
          status: 'error'
        })
      }
    })
  }

  render() {
    if (this.state.users.length >= 1) {
      return (<table border="1">
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Rut</td>
            <td>Edad</td>
            <td>Sexo</td>
            <td>Fecha de ingreso</td>
            <td>Enfermedad</td>
            <td>Revisado</td>
            <td>Foto Personal</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {
            this.state.users.map((u) => {
              return (<tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.rut}</td>
                <td>{u.edad}</td>
                <td>{u.sexo}</td>
                <td>{u.fechaIngreso}</td>
                <td>{u.enfermedad}</td>
                <td>{u.revisado === true ? ("Si"):("No")}</td>
                <td>{u.fotoPersonal != null ? (
                  <img src={this.url + '/get-image/' + u.fotoPersonal} alt={u.nombre} height="100px" width="100px" />
                ) : (<img src="https://media.tenor.com/YwK6lFqdG_QAAAAC/dog-dance.gif" alt={u.fullname} height="100px" width="100px" />)}</td>
                <td><Link to={'/paciente/detalle/' + u._id}>Detalles</Link></td>
              </tr>)
            })            
          }
        </tbody>
      </table>)
    } else if (this.state.users.length === 0 && this.state.status === 'success'){
      return(
        <div>
          <h2>No hay usuarios para mostrar</h2>
        </div>
      )
    }else{
      return(
        <div>
          <h2>Esto toma su tiempo...</h2>
        </div>
      )
    }
  }
}

export default ListarPacientes
