import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import {Adicionar} from './Adicionar' ;
import {Deletar} from './Deletar';
import {Usuarios} from './Usuarios';
import {BrowserRouter,Routes, Route, NavLink} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter >
    <div className="App container">
      <h3 className="d-flex-content-center m3">
       Teste edesoft
      </h3>

     <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-online-primary" to ="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-online-primary" to ="/usuario">
              Usuario
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-online-primary" to ="/adicionar">
              Adicionar Usuario
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-online-primary" to ="/deletar">
              Deletar Usuario
            </NavLink>
          </li>
        </ul> 
      </nav> 
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usuario" element={<Usuarios />} />
        <Route path="/adicionar" element={<Adicionar />} />
        <Route path="/deletar" element={<Deletar />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
