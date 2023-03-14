import React, { Component } from 'react';
import { Usuarios } from './Usuarios';
import { variables } from './Variables';

export class Deletar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedUser: null,
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch(variables.API_URL)
            .then(response => response.json())
            .then(data => {
                this.setState({ users: data });
            });
    }

    
    

    handleUserChange = (event) => {
        const userId = parseInt(event.target.value);
        const selectedUser = this.state.users.find(user => user.UserId === userId);
        this.setState({ selectedUser });
    }


    deleteClick(pk) {
        if (window.confirm('Tem certeza?')) {
            fetch(variables.API_URL + 'user/' + pk, {
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
            const { users, selectedUser } = this.state;
    
            return (
                <div>
                    <select value={selectedUser ? selectedUser.UserId : ''} onChange={this.handleUserChange}>
                        <option value="">Selecione um usuário</option>
                        {users.map(user =>
                            <option key={user.UserId} value={user.UserId}>{user.UserNome} {user.UserSobrenome}</option>
                        )}
                    </select>
    
                    {selectedUser && (
                        <table className='table table-striped'>
                            <th>ID: <br></br>{selectedUser.UserId}</th>
                            <th>Nome:<br></br> {selectedUser.UserNome}</th>
                            <th>Sobrenome: <br></br>{selectedUser.UserSobrenome}</th>
                            <th>Email:<br></br> {selectedUser.UserEmail}</th>
                            <th>Data de nascimento: <br></br>{selectedUser.UserData_nascimento}</th>
                            <th>Data de criação:<br></br> {selectedUser.UserData_cadastro}</th>
                        </table>
                    )   
        }
                         
                                <button type="button"
                                    className="btn btn-primary float-center"  onClick={() => this.deleteClick(selectedUser.UserId)}>Deletar</button>
                               
                                   
                </div>
            );
        }
    }