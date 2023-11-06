import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import App from '../App';

class MarcaEdit extends React.Component{
    emptyItem={
        nombre_marca: '',
        num_expediente: '',
        fecha_registro: '',
        detalle: '',
        nombre_solicitante:'',
        logo:'',
        clase_niza:''
    };

    constructor(props){
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSumbmit = this.handleSumbmit.bind(this);
    }

    async componentDidMount(){
        if(this.props.match.params.id !=='new'){
            const marca = await(await
                fetch(`http://localhost:8080/marcas/${this.props.match.params.id}`)).json();
                this.setState({item:marca});
        }
    }

    handleChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSumbmit(event){
        event.preventDefault();
        const {item} = this.state;

        await fetch('marcas' + (item._id ? '/' + item._id : ''),{
            method: (item._id) ? 'PUT' : 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/marcas');
    }

    render(){
        const {item} = this.state;
        const title = <h2>{item._id ? 'Edit Client' : 'Add Client'}</h2>;


        return <div>
            <AppNavbar/>
            <Container>

                {title}
                <Form onSubmit = {this.handleSumbmit} >
                    <FormGroup>
                        <Label for="denominacion">Denominacion</Label>
                        <Input type="text" name="denominacion" id="denominacion" defaultValue={item.nombre_marca || ''} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="nombre_solicitnate">Nombre del solicitante</Label>
                        <Input type="text" name="nombre_solicitnate" id="nombre_solicitnate" valdefaultValueue={item.nombre_solicitante || ''} onChange={this.handleChange} autoComplete="nombre_solicitnate"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="clase_de_niza">Clase de niza</Label>
                        <Input type="text" name="clase_de_niza" id="clase_de_niza" defaultValue={item.clase_niza || ''} onChange={this.handleChange} autoComplete="clase_de_niza"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="detalle">Detalle</Label>
                        <Input type="file" name="detalle" id="detalle" defaultValue={item.detalle || ''} onChange={this.handleChange} autoComplete="detalle"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="logo">Logo</Label>
                        <Input type="image" name="logo" id="logo" defaultValue={item.logo || ''} onChange={this.handleChange} autoComplete="logo"/>
                    </FormGroup>
                    <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/marcas">Cancel</Button>
                </FormGroup>

                </Form>
            </Container>
        </div>
    }
 
}

export default withRouter(MarcaEdit);