import React, { Component } from 'react'
import { Redirect } from 'react-router';
import axios from 'axios';
import URL from '../Common/Global';
import SimpleReactValidator from 'simple-react-validator';
import './Styles/AgregarPaciente.css';

class AgregarPaciente extends Component {
  url = URL.API;
  rutRef = React.createRef()
  nombreRef = React.createRef()  
  edadRef = React.createRef()
  sexoRef = React.createRef()
  revisadoRef = React.createRef()
  enfermedadRef = React.createRef()

  state = {
    user: {},
    status: null,
    image: null,
    force: false
  }

  validator = new SimpleReactValidator()

  changeState = () => {
    this.setState({
      user: {
        rut: this.rutRef.current.value,
        nombre: this.nombreRef.current.value,
        edad: this.edadRef.current.value,
        sexo: this.sexoRef.current.value,        
        revisado: this.revisadoRef.current.value,        
        enfermedad: this.enfermedadRef.current.value
      }
    })

    this.validator.showMessageFor()
    this.forceUpdate()
  }

  fileChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  }

  newUser = (e) => {
    e.preventDefault()
    this.changeState()
    if (this.validator.allValid()) {
      axios.post(this.url + "/save-paciente", this.state.user).then(res => {
        if (res.data.newUser) {
          this.setState({
            user: res.data.newUser,
            status: 'Esperando'
          })
          if (this.state.image !== null) {
            console.log(this.state.user);
            var id = this.state.user._id
            const formData = new FormData()
            formData.append('file', this.state.image, this.state.image.name)

            axios.post(this.url + "/upload-image/" + id, formData).then(res => {
              if (res.data.user) {
                this.setState({
                  user: res.data.user,
                  status: 'success',
                  force: true
                })
              } else {
                this.setState({
                  user: res.data.user,
                  status: 'error'
                })
              }
            })
          } else {
            this.setState({
              status: 'success'
            })
          }
        } else {
          this.setState({
            status: 'success'
          })
        }
      })
    } else {
      this.validator.showMessages()
      this.forceUpdate()
      this.setState({
        status: 'error'
      })
    }
  }

  render() {
    return (
      <div id="form">
        <form onSubmit={this.newUser}>
          <table>
            <tr>
              <td>Rut</td>
              <td><input type="text" name="rut" ref={this.rutRef} onChange={this.changeState} /></td>
              {
                this.validator.message('rut', this.state.user.rut, 'required')
              }
            </tr>
            <tr>
              <td>Nombre</td>
              <td><input type="text" name="nombre" ref={this.nombreRef} onChange={this.changeState} /></td>
              {
                this.validator.message('nombre', this.state.user.nombre, 'required|alpha_space')
              }
            </tr>
            <tr>
              <td>Edad</td>
              <td><input type="number" name="edad" ref={this.edadRef} onChange={this.changeState} /></td>
              {
                this.validator.message('edad', this.state.user.edad, 'required')
              }
            </tr>
            <tr>
              <td>Sexo</td>
              <td>
              <select name="sexo" ref={this.sexoRef} onChange={this.changeState}>
                <option value="F">Femenino</option>
                <option value="M">Masculino</option>
              </select>
              </td>
              
            </tr>
            <tr>
              <td>Revisado</td>
              <td>
              <select name="revisado" ref={this.revisadoRef} onChange={this.changeState}>
                <option value="true">SI</option>
                <option value="false">NO</option>
              </select>
              </td>              
            </tr>
            <tr>
              <td>Enfermedad</td>
              <td><input type="text" name="enfermedad" ref={this.enfermedadRef} onChange={this.changeState} /></td>
              {
                this.validator.message('enfermedad', this.state.user.enfermedad, 'required')
              }
            </tr>
            <tr>
              <td>Photo</td>
              <td><input type="file" name="image" onChange={this.fileChange} /></td>
            </tr>
            <tr>
              <td><input type="submit" value="Create User" /></td>
            </tr>
          </table>
        </form>
        {
          this.state.force && <Redirect to="/"></Redirect>
        }
      </div>
    )
  }
}

export default AgregarPaciente;
