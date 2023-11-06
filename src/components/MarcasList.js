import React, {Component} from "react";
import { Button, ButtonGroup, Container, Table } from "reactstrap";
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom'
import { Tab } from "bootstrap";

class MarcaList extends React.Component{
    constructor(props){
        super(props);
        this.state = {marcas:[]};
        this.remove = this.remove.bind(this);
    }

   componentDidMount(){
    fetch('http://localhost:8080/marcas')
    .then(response => response.json())
    .then(data => this.setState({marcas:data}));
   }
   async remove(id){
    await fetch(`http://localhost:8080/marcas/${id}`,{
        method:'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(() => {
        let updatedMarca = [...this.state.marcas].filter(i => i,_id !==id);
        this.setState({marcas:updatedMarca});
    });
}

render(){
    const {marcas, isLoading} = this.state;

    if (isLoading){
        return <p>Cargando...</p>;
    }

    const marcasList = marcas.map(marca => {
        return <tr key={marca._id}>
            <td style={{whiteSpace: 'nowrap'}}>{marca.nombre_marca} </td>
            <td>{marca.num_expediente}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/marcas/" + marca._id}>Editar</Button>
                    <Button size="sm" color="danger" onClick={() => this.remove(marca._id)}>Eliminar</Button>
                </ButtonGroup>
            </td>
        </tr>
    
    });

    return(
        <div>
            <AppNavbar/>
            <Container fluid>
                <div className="float-right">
                    <Button color="success" tag={Link} to="/marcas/new" >Registrar Marca</Button>
                </div>
                <h3>Marcas</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Nombre</th>
                            <th width="30%">Numero de Expediente</th>
                            <th widtd="40%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marcasList}
                    </tbody>
                </Table>
            </Container>
        </div>
    )





}
}

export default MarcaList;

