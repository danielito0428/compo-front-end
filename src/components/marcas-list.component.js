import React, { Component } from "react";
import MarcaDataService from "../services/marca.service"
import { Link } from "react-router-dom";


export default class MarcasList extends Component{
    constructor(props){
        super(props);

        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveMarcas = this.retrieveMarcas.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveMarca = this.setActiveMarca.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state= {
            marcas: [],
            currentMarca: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount(){
        this.retrieveMarcas();
    }

    onChangeSearchName(e){
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveMarcas(){
        MarcaDataService.getAll()
        .then(response => {
            this.setState({
                marcas: response.data
            });
            console.log(response.data)
        })
        .catch(e=> {
            console.log(e);
        });

    }


    refreshList(){
        this.retrieveMarcas();
        this.setState({
            currentMarca: null,
            currentIndex: -1
        });
    }

    setActiveMarca(marca, index){
        this.setState({
            currentMarca:marca,
            currentIndex: index
        });
    }



    searchName(){
        MarcaDataService.findByTitle(this.state.searchName)
        .then(response => {
            this.setState({
                marcas: response.data
            });
            console.log(response.data);
        })
        .catch(e=>{
            console.log(e)
        });
    }


    render(){

        const {searchName, marcas, currentMarca, currentIndex} = this.state;
        return (
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Busqeuda por nombre"
                    value={searchName}
                    onChange={this.onChangeSearchName}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchName}
                    >
                      Buscar
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Listado de Marcas</h4>
      
                <ul className="list-group">
                  {marcas &&
                    marcas.map((marca, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveMarca(marca, index)}
                        key={index}
                      >
                        {marca.nombre_marca}
                      </li>
                    ))}
                </ul>
      
                {/* <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.removeAllTutorials}
                >
                  Remove All
                </button> */}
              </div>
              <div className="col-md-6">
                {currentMarca ? (
                  <div>
                    <h4>Marcas</h4>
                    <div>
                      <label>
                        <strong>Detalle:</strong>
                      </label>{" "}
                      {currentMarca.detalle}
                    </div>
                    <div>
                      <label>
                        <strong>Logo:</strong>
                      </label>{" "}
                      {currentMarca.logo}
                    </div>
                    <div>
                      <label>
                        <strong>Marca:</strong>
                      </label>{" "}
                      {currentMarca.nombre_marca}
                    </div>
                    <div>
                      <label>
                        <strong>Numero de expediente:</strong>
                      </label>{" "}
                      {currentMarca.num_expediente}
                    </div>
                    <div>
                      <label>
                        <strong>Fecha:</strong>
                      </label>{" "}
                      {currentMarca.fecha_registro}
                    </div>
                    <div>
                      <label>
                        <strong>Nombre del solicitante:</strong>
                      </label>{" "}
                      {currentMarca.nombre_solicitante}
                    </div>
                    <div>
                      <label>
                        <strong>Clase de Niza:</strong>
                      </label>{" "}
                      {currentMarca.clase_niza}
                    </div>
      
                    <Link
                      to={"/marcas/" + currentMarca._id}
                      className="badge badge-warning"
                    >
                      Editar
                    </Link>
                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Selecione una marca...</p>
                  </div>
                )}
              </div>
            </div>
          );

       
    }


























}