import React, { Component } from 'react';
import { variables } from './Variables';

export class Adicionar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            modalTitle: "",
            UserData_nascimento: "",
            UserSobrenome: "",
            UserEmail: "",
            UserNome: "",
            UserId: 0,
        };
    }


    createClick() {
        fetch(variables.API_URL+'user' , {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                UserId: this.UserId,
                UserNome: this.state.UserNome,
                UserSobrenome: this.state.UserSobrenome,
                UserEmail: this.UserEmail,
                UserData_nascimento: this.UserData_nascimento
                 
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

    render() {
        const {
            users,
            modalTitle,
            UserNome,
            UserSobrenome,
            UserEmail,
            UserData_nascimento,
        } = this.state;

        return (
            <div>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nome do Usuario
                                </span>
                                <input type="text" className="form-control"
                                    value={users.UserNome}
                                    onChange={this.changeUserName}></input>
                                <div className="input-group mb-3"></div>
                                <span className="input-group-text">SobreNome do Usuario</span>
                                <input type="text" className="form-control"
                                    value={users.UserSobrenome}
                                    onChange={this.changeUserName}></input>
                                <span className="input-group-text">Email</span>
                                <input type="text" className="form-control"
                                    value={users.UserEmail}
                                    onChange={this.changeUserName}></input>
                            </div>
                        </div>
                        <button type="button"
                                    className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button>
                    </div>
                </div>
            </div>
        );
    }
}
