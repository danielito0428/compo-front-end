import logo from './logo.svg';
import './App.css';
import React from 'react';



class App extends React.Component {
  state = {
    marcas: []
  };

  async componentDidMount() {
    const response = await fetch('http://localhost:8080/marcas');
    const body = await response.json();
    this.setState({marcas: body});
  }

  render() {
    const {marcas} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Marcas</h2>
              {marcas.map(marca =>
                  <div key={marca._id}>
                    {marca.nombre_marca} ({marca.nombre_solicitante})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;



