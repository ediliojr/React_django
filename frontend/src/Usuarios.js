import React, { Component } from 'react';
import {variables} from './Variables.js';
import { tsConstructorType } from '@babel/types'

export class Usuarios extends Component {

    // construtor para definir as variveis, usada para chamar o construtor pela sua classe de origem
    constructor(props) {
        super(props);
        // usada para chamar o construtor pela sua classe de origem
        this.state = {
            // populado com dados do API
            users: [],
            // variaveis usadas para janela de modificação
            modalTitle: "",
            UserData_cadastro: new Date(),
            UserData_nascimento: "",
            UserSobrenome: "",
            UserEmail: "",
            UserNome: "",
            UserId: 0,
        }
    }
    // Refresh para pegar os dados do metodo GET da APi e converte para JSON 
    refreshList() {
        fetch(variables.API_URL+'')
            .then(response => response.json())
            .then(data => {
                this.setState({ users:data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    changeUserName =(e)=>{
        this.setState({UserNome:e.target.value});
    }
    
    changeUserLastName =(e)=>{
        this.setState({UserSobrenome:e.target.value});
    }
    
    changeUserEmail =(e)=>{
        this.setState({UserEmail:e.target.value});
    }

    changeUserNascimento =(e)=>{
        this.setState({UserData_nascimento:e.target.value});
    }

    addClick(use) {
        this.setState({
            modalTitle: "Adicionar Usuario",
            UserId: "",
            UserNome: "",
            UserSobrenome: "",
            UserEmail: "",
            UserData_nascimento: "",
            UserData_cadastro: "",
        })
    }

    editClick(use) {
        this.setState({
            modalTitle: "Editar Usuario",
            UserId: use.UserId,
            UserNome: use.UserNome,
            UserSobrenome: use.UserSobrenome,
            UserEmail: use.UserEmail,
            UserData_nascimento: use.UserData_nascimento,
            UserData_cadastro: use.UserData_cadastro,

        })
    }

    createClick() {
        fetch(variables.API_URL, {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                UserId: this.state.UserId,
                UserNome: this.state.UserNome,
                UserSobrenome: this.state.UserSobrenome,
                UserEmail: this.state.UserEmail,
                UserData_nascimento: this.state.UserData_nascimento,
                UserData_cadastro: this.state.currentDate,
                 
            }
            )

        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Falha');
            })
    }

    updateClick() {
        fetch(variables.API_URL+'user/'+this.state.UserId, {
            method: 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                UserId: this.state.UserId,
                UserNome: this.state.UserNome,
                UserSobrenome: this.state.UserSobrenome,
                UserEmail: this.state.UserEmail,
                UserData_nascimento: this.state.UserData_nascimento,
                UserData_cadastro: this.state.UserData_cadastro,             
               
                
            })

        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Falha');
            })
    }

    deleteClick(pk) {
        if (window.confirm('Tem certeza?')) {
            fetch(variables.API_URL + 'user/' +pk, {
                method: 'DELETE',
          

            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Falha');
                })
        }
    }


    render() {
        // Declaração de variaveis para ser visivel no html
        const {
            users,
            modalTitle,
            UserId,
            UserNome,
            UserSobrenome,
            UserEmail,
            UserData_nascimento,
            currentDate = new Date(),
            isDate = currentDate.toISOString(),

        } = this.state;

        return (
            <div>
                <button type="button"
                    className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>Adicionar Usuario</button>

                <table className='table table-striped'>
                    <thead>

                        <th>
                            ID
                        </th>
                        <th>
                            Nome
                        </th>
                        <th>
                            Sobrenome
                        </th>
                        <th>
                            email
                        </th>
                        <th>
                            nascimento
                        </th>
                        <th>
                            data_criacao
                        </th>

                    </thead>
                    <tbody>
                        {users.map(use =>
                            <tr key={use.UserId}>
                                <td>{use.UserId}</td>
                                <td>{use.UserNome}</td>
                                <td>{use.UserSobrenome}</td>
                                <td>{use.UserEmail}</td>
                                <td>{use.UserData_nascimento}</td>
                                <td>{use.UserData_cadastro}</td>
                                <td>
                                    <button type="button"
                                        className="btn btn-light mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => this.editClick(use)}>Editar
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>

                                    <button type="button"
                                        className="btn btn-light mr-1" onClick={() => this.deleteClick(use.UserId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>)}

                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="True">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Nome do Usuario
                                    </span>
                                    <input type="text" className="form-control" placeholder='Nome'
                                        value={users.UserNome}
                                        onChange={this.changeUserName}></input>
                                    
                                    <div className="input-group mb-3"></div>
                                    <span className="input-group-text">SobreNome do Usuario</span>
                                    <input type="text" className="form-control" placeholder='Sobrenome'
                                        value={users.UserSobrenome}
                                        onChange={this.changeUserLastName}></input>
                                    <div className="input-group mb-3"></div>
                                    <span className="input-group-text">Email</span>
                                    <input type="text" className="form-control" placeholder='email@email.com'
                                        value={users.UserEmail}
                                        onChange={this.changeUserEmail}></input>
                                    <div className="input-group mb-3"></div>
                                    <span className="input-group-text">Data nascimento</span>
                                    <input type="date" className="form-control" 
                                        value={users.UserData_nascimento}
                                        onChange={this.changeUserNascimento}></input>
                                    
                                    
                                    
                                </div> </div>

                            {UserId == 0 ?
                                <button type="button"
                                    className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button>
                                : null}

                            {UserId != 0 ?
                                <button type="button"
                                    className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button>
                                : null}
                        </div> </div>



                </div>
            </div>



        )
    }
}