import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddMarca from "./components/addMarca.component";
import MarcasList from "./components/marcas-list.component";
import Marcas from "./components/marcas.component";



class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/marcas" className="navbar-brand">
            Marcas
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/marcas"} className="nav-link">
                Marcas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<MarcasList/>} />
            <Route path="/marcas" element={<MarcasList/>} />
            <Route path="/add" element={<AddMarca/>} />
            <Route path="/marcas/:id" element={<Marcas/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;



