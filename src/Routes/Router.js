import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Inicio from '../Components/Inicio';
import AgregarPaciente from '../Components/AgregarPaciente';
import ActualizarPaciente from '../Components/ActualizarPaciente';
import DetallePaciente from '../Components/DetallePaciente';
import ListarPacientes from '../Components/ListarPacientes';
import BuscarPaciente from '../Components/BuscarPaciente';
import NotFound from './NotFound';

export class Router extends Component {
  render() {
    return (
        <BrowserRouter>
        <Nav></Nav>
        <Switch>
            {/*<Route exact path='' component={}></Route>*/}
            <Route exact path="/" component={Inicio}></Route>                
            <Route exact path="/inicio" component={Inicio}></Route>
            <Route exact path="/paciente/nuevo" component={AgregarPaciente}></Route>
            <Route exact path="/paciente/actualizar/:id" component={ActualizarPaciente}></Route>
            <Route exact path="/paciente/detalle/:id" component={DetallePaciente}></Route>
            <Route exact path="/paciente/listar" component={ListarPacientes}></Route>
            <Route exact path="/paciente/buscar/:search" component={BuscarPaciente}></Route>
            <Route exact path="/redirect/:search" render={(props)=>{
              var search =  props.match.params.search;
              return(
                <Redirect to={'/search/enfermedad/'+search}></Redirect>
              )
            }}></Route>

            {/*Ruta 404*/}
            <Route path="*" component={NotFound}></Route>
        </Switch>
    </BrowserRouter>
    )
  }
}

export default Router