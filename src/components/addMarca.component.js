import React, { Component } from "react";

import MarcaDataService from "../services/marca.service"


export default class AddMarca extends Component{
    

    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeNombreSolicitante = this.onChangeNombreSolicitante.bind(this);
        this.onChangeClaseNiza = this.onChangeClaseNiza.bind(this);
        this.onChangeDetalle = this.onChangeDetalle.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.onChangeNumExpediente = this.onChangeNumExpediente.bind(this);
        this.onChangeFecha = this.onChangeFecha.bind(this);
      

        this.state = {
            _id: null,
            nombre_marca: "",
            nombre_solicitante:"",
            clase_niza: "",
            num_expediente: "",
            fecha_registro: '',
            detalle:"",
            logo:"",

            submitted: false


        };
    }



    onChangeName(e){
        this.setState({
            nombre_marca: e.target.value
        });
    }



    onChangeNombreSolicitante(e){
        this.setState({
            nombre_solicitante:e.target.value
        });
    }



    onChangeClaseNiza(e){
        this.setState({
            clase_niza: e.target.value
        });
    }

    onChangeDetalle(e){
        this.setState({
            detalle: e.target.value
        });
    }

    onChangeLogo(e){
        this.setState({
            logo: e.target.value
        });
    }
    onChangeFecha(e){
        this.setState({
            fecha_registro: e.target.value
        });
    }
    onChangeNumExpediente(e){
        this.setState({
            num_expediente: e.target.value
        });
    }

    saveMarca(){
        var data = {
            nombre_marca: this.state.nombre_marca,
            nombre_solicitante: this.state.nombre_solicitante,
            clase_niza: this.state.clase_niza,
            num_expediente: this.state.num_expediente,
            fecha_registro: this.state.fecha_registro,
            detalle: this.state.detalle,
            logo: this.state.logo
        };
        MarcaDataService.create(data).then(response =>{
            this.setState({
                _id:response.data._id,
                nombre_marca: response.data.nombre_marca,
                nombre_solicitante: response.data.nombre_solicitante,
                clase_niza: response.data.clase_niza,
                num_expediente: response.data.num_expediente,
                fecha_registro: response.data.fecha_registro,
                detalle: response.data.detalle,
                logo: response.data.logo,

                submitted:true
            });
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e);
        });
    }

    newMarca(){
        this.setState({
            _id: null,
            nombre_marca: "",
            nombre_solicitante:"",
            clase_niza: null,
            num_expediente: "",
            fecha_registro: "",
            detalle:"",
            logo:"",

            submitted: false
        });
    }

    render(){

        return(
            <div className="submit-form" >
                {this.state.submitted ? (
                    <div>
                        <h4>Marca Registrada</h4>
                        <button className="btn btn-success" onClick={this.newMarca}>
                            Registrar
                        </button>
                    </div>
                ): (
                    <div>
                     <div className="form-group">
                        <label htmlFor="name">Nombre de la marca</label>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={this.state.nombre_marca}
                        onChange={this.onChangeName}
                        name="name"
                        />

                     </div>
                     <div className="form-group">
                        <label htmlFor="nombre_solicitante">Nombre del solicitante</label>
                        <input
                        type="text"
                        className="form-control"
                        id="nombre_solicitante"
                        required
                        value={this.state.nombre_solicitante}
                        onChange={this.onChangeNombreSolicitante}
                        name="nombre_solicitante"
                        />
                        
                     </div>
                     <div className="form-group">
                        <label htmlFor="clase_niza">Clase niza</label>
                        <input
                        type="text"
                        className="form-control"
                        id="clase_niza"
                        required
                        value={this.state.clase_niza}
                        onChange={this.onChangeClaseNiza}
                        name="clase_niza"
                        />
                        
                     </div>
                     <div className="form-group">
                        <label htmlFor="fecha">Fecha registro</label>
                        <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        required
                        value={this.state.fecha_registro}
                        onChange={this.onChangeFecha}
                        name="fecha"
                        />
                        
                     </div>
                     <div className="form-group">
                        <label htmlFor="num_expediente">Numero expediente</label>
                        <input
                        type="text"
                        className="form-control"
                        id="num_expediente"
                        required
                        value={this.state.num_expediente}
                        onChange={this.onChangeNumExpediente}
                        name="num_expediente"
                        />
                        
                     </div>
                     <div className="form-group">
                        <label htmlFor="detalle">Detalle</label>
                        <input
                        type="text"
                        className="form-control"
                        id="detalle"
                        
                        value={this.state.detalle}
                        onChange={this.onChangeDetalle}
                        name="detalle"
                        />
                        
                     </div>
                     <div className="form-group">
                        <label htmlFor="logo">Logo</label>
                        <input
                        type="text"
                        className="form-control"
                        id="logo"
                        
                        value={this.state.logo}
                        onChange={this.onChangeLogo}
                        name="logo"
                        />
                     </div>
                     <button onClick={this.saveMarca} className="btn btn-success">Guardar</button>
                    </div>
                    )}
            </div>


        );
    }

    
}