import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import URL from '../Common/Global'
import './Styles/DetallePaciente.css'

class DetallePaciente extends Component {
  url = URL.API

  state = {
    user:false,
    status: null
  }

  componentDidMount(){
    this.getUserById()
  }

  getUserById = () =>{
    var id = this.props.match.params.id
    console.log(this.props)
    axios.get(this.url + "/paciente/" + id).then(res=>{
      this.setState({
        user: res.data.paciente,
        status: 'success'
      })
    }).catch(err=>{
      this.setState({
        user:false,
        status: 'success'
      })
    })
  }

  deleteUserById = (id) =>{
    axios.delete(this.url + "/paciente/" + id).then(res =>{
      this.setState({
        user:res.data.paciente,
        status: 'deleted'
      })
    })
  }

  render() {
    return (
      <div id='form'>
                {
                    this.state.status === 'deleted' && <Redirect to="/"></Redirect>
                }
                {
                    this.state.user &&
                    <div>
                        <table border="1px">
                            <tr>
                                <td>Nombre</td>
                                <td>{this.state.user.nombre}</td>
                            </tr>
                            <tr>
                              <td>Rut</td>
                            <td>{this.state.user.rut}</td></tr>
                            <tr>
                                <td>Edad</td>
                                <td>{this.state.user.edad}</td>
                            </tr>
                            <tr>
                                <td>Sexo</td>
                                <td>{this.state.user.sexo}</td>
                            </tr>
                            <tr>
                                <td>Fecha de Ingreso</td>
                                <td>{this.state.user.fechaIngreso}</td>
                            </tr>
                            <tr>
                                <td>Enfermedad</td>
                                <td>{this.state.user.enfermedad}</td>
                            </tr>
                            <tr>
                                <td>Revisado</td>
                                <td>{this.state.user.revisado}</td>
                            </tr>
                            <tr>
                                <td>Imagen</td>
                                {
                                    this.state.user.photo !== null? (
                                        <img src={this.url+'/get-image/' + this.state.user.fotoPersonal} alt={this.state.user.fotoPersonal} width="275px" height="250px"></img>

                                    ) : (
                                      <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt=""></img>
                                    )   
                                }
                            </tr>
                            <tr>
                                <td><Link to={'/paciente/actualizar/'+this.state.user._id}>Update</Link></td>
                                <td><button onClick={()=>{this.deleteUserById(this.state.user._id)}}>Delete</button></td>
                            </tr>
                        </table>
                    </div>
                }
                {
                    !this.state.user && this.state.status === 'success' &&
                    <div>
                        <h2>User not found</h2>
                        <h3>Try later</h3>
                        <Link to={'/'}>Get back</Link>
                    </div>
                }
                {
                    this.state.status == null &&
                    <div>
                        <h2>cargando.-.-.-.</h2>
                    </div>
                }
            </div>
    )
  }
}

export default DetallePaciente