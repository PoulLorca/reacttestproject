import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import URL from '../Common/Global';
import SimpleReactValidator from 'simple-react-validator';
import './Styles/ActualizarPaciente.css'

class ActualizarPaciente extends Component {
  url = URL.API
  rutRef = React.createRef()
  nombreRef = React.createRef()
  edadRef = React.createRef()
  sexoRef = React.createRef()
  revisadoRef = React.createRef()
  enfermedadRef = React.createRef()
  userId = null

  state = {
    user: {},
    status: null,
    photo: null,
    new: ''
  }

  componentDidMount() {
    this.userId = this.props.match.params.id
    this.getUserById(this.userId)
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

    this.validator.showMessages()
    this.forceUpdate()
  }

  fileChange = (e) => {
    this.setState({
      photo: e.target.files[0]
    })
  }

  getUserById = (id) => {
    axios.get(this.url + '/paciente/' + id).then(res => {
      console.log(res.data);
      this.setState({
        user: res.data.paciente,
        new: res.data.paciente.fotoPersonal
      })
    })
  }

  UpdateUser = (e) => {
    e.preventDefault()
    this.changeState()
    if (this.validator.allValid()) {
      axios.put(this.url + "/paciente/" + this.userId, this.state.user).then(res => {
        console.log(this.state.user)
        if (res.data.user) {
          this.setState({
            user: res.data.user,
            status: 'waiting'
          })
          if (this.state.photo !== null) {
            var id = this.state.user._id
            const formData = new FormData()
            formData.append('file', this.state.photo, this.state.photo.name)

            axios.post(this.url + "/upload-image/" + id, formData).then(res => {
              if (res.data.user) {
                this.setState({
                  user: res.data.user,
                  status: 'success'
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
    if (this.state.status === 'success') {
      return <Redirect to={'/'}></Redirect>
    }
    var user = this.state.user
    return (
      <div id='form'>
        <form onSubmit={this.UpdateUser}>
          <table>
            <tr>
              <td>Rut</td>
              <td><input type="text" name="rut"  defaultValue={user.rut} ref={this.rutRef} onChange={this.changeState} /></td>
              {
                this.validator.message('rut', this.state.user.rut, 'required')
              }
            </tr>
            <tr>
              <td>Nombre</td>
              <td><input type="text" name="nombre" defaultValue={user.nombre} ref={this.nombreRef} onChange={this.changeState} /></td>
              {
                this.validator.message('nombre', this.state.user.nombre, 'required|alpha_space')
              }
            </tr>
            <tr>
              <td>Edad</td>
              <td><input type="number" name="edad" defaultValue={user.edad} ref={this.edadRef} onChange={this.changeState} /></td>
              {
                this.validator.message('edad', this.state.user.edad, 'required')
              }
            </tr>
            <tr>
              <td>Sexo</td>
              <td>
                <select name="sexo" ref={this.sexoRef} onChange={this.changeState} defaultValue={user.sexo}>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                </select>
              </td>

            </tr>
            <tr>
              <td>Revisado</td>
              <td>
                <select name="revisado" ref={this.revisadoRef} onChange={this.changeState} defaultValue={user.revisado}>
                  <option value="true">SI</option>
                  <option value="false">NO</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Enfermedad</td>
              <td><input type="text" name="enfermedad" ref={this.enfermedadRef} onChange={this.changeState}  defaultValue={user.enfermedad}/></td>
              {
                this.validator.message('enfermedad', this.state.user.enfermedad, 'required')
              }
            </tr>
            <tr>
              <td>Photo</td>
              <td><input type="file" name="file" onChange={this.fileChange} /></td>
              {
                this.state.user.photo !== null ? (
                  <img src={this.url + '/get-image/' + this.state.new} alt={this.state.user.fotoPersonal} width="275px" height="250px" id="photo"></img>
                ) : (
                  <img src="https://pbs.twimg.com/media/ERfnjPtWoAYbAad.jpg" alt="" id="photo"></img>
                )
              }
            </tr>
            <tr>
              <td><input type="submit" value="Create User" /></td>
            </tr>
          </table>
        </form>
      </div>
    )
  }
}


export default ActualizarPaciente