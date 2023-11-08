import React, { Component } from "react";
import MarcaDataService from "../services/marca.service"
import { withRouter } from '../with-router';


class Marcas extends Component{
    constructor(props){

        super(props);

        this.onChangeName= this.onChangeName.bind(this);
        this.onChangeDetalle = this.onChangeDetalle.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.updateMarca= this.updateMarca.bind(this);
        this.deleteMarca= this.deleteMarca.bind(this);

        this.state = {
           currentMarca: {
            _id: null,
            nombre_marca: "",
            nombre_solicitante:"",
            clase_niza: null,
            num_expediente: "",
            fecha_registro: "",
            detalle:"",
            logo:"",
            tipo_solicitud:"",
            subtipo_solicitud:"",
            estado: "",
           },
           msj: ""

    };

}

componentDidMount(){
    this.getMarca(this.props.router.params.id);
}

onChangeName(e){
    const name = e.target.value;

    this.setState(function(prevState){
        return{
            currentMarca: {
                ...prevState.currentMarca,
                nombre_marca: name
            }
        };
    });
}

onChangeDetalle(e){
    const detalle = e.target.value;

    this.setState(prevState => ({
        currentMarca : {
            ...prevState.currentMarca,
            detalle:detalle
        }
    }));

}


onChangeLogo(e){
    const logo = e.target.value;

    this.setState(prevState =>({
        currentMarca: {
            ...prevState.currentMarca,
            logo:logo
        }
    }));
}

getMarca(id){
    MarcaDataService.getId(id)
    .then(response =>{
        this.setState({
            currentMarca: response.data
        });
        console.log(response.data)
    })
    .catch(e=>{
        console.log(e);
    });
}

updateMarca(){
    MarcaDataService.update(
        this.state.currentMarca._id,
        this.state.currentMarca
    )
    .then(response =>{
        console.log(response.data);
        this.setState({
            msj: "Marca actualizada correctamente!"
        });
    })
    .catch(e =>{
        console.log(e);
    });
        
    
}

deleteMarca(){
    MarcaDataService.delete(this.state.currentMarca._id)
    .then(response => {
        console.log(response.data);
        this.props.router.navigate('/marcas');
    })
    .catch(e =>{
        console.log(e);
    })
}

render() {
    const { currentMarca } = this.state;

    return (
      <div>
        {currentMarca ? (
          <div className="edit-form">
            <h4>Marca</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Nombre Marca</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentMarca.nombre_marca}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="detalle">Detalle</label>
                <input
                  type="text"
                  className="form-control"
                  id="detalle"
                  value={currentMarca.detalle}
                  onChange={this.onChangeDetalle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="logo">Logo</label>
                <input
                  type="text"
                  className="form-control"
                  id="logo"
                  value={currentMarca.logo}
                  onChange={this.onChangeLogo}
                />
              </div>

            </form>

          

            <button className="badge badge-danger mr-2" onClick={this.deleteMarca}>
              Borrar
            </button>

            <button type="submit"  className="badge badge-success" onClick={this.updateMarca}>
              Actualizar
            </button>
            <p>{this.state.msj}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Selecione una marca...</p>
          </div>
        )}
      </div>
    );
  }


}
export default withRouter(Marcas);