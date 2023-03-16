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

        // bind createClick function to the component instance
        this.createClick = this.createClick.bind(this);
    }

    createClick() {
        fetch(variables.API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: this.state.UserId,
                UserNome: this.state.UserNome,
                UserSobrenome: this.state.UserSobrenome,
                UserEmail: this.state.UserEmail,
                UserData_nascimento: this.state.UserData_nascimento,
                UserData_cadastro: this.state.currentDate,
            })
        })
        .then(res => res.json())
        .then((result) => {
            alert(result);
            this.refreshList();
        }, (error) => {
            alert('Falha');
        });
    }

    render() {
        const {
            users,
            UserNome,
            UserSobrenome,
            UserEmail,
            UserData_nascimento,
        } = this.state;

        return (
            <div className='pad'>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nome do Usuario</span>
                                <input type="text" className="form-control" placeholder='Nome'
                                    value={UserNome}
                                    onChange={(e) => this.setState({ UserNome: e.target.value })}
                                ></input>
                                <div className="input-group mb-3"></div>
                                <span className="input-group-text">SobreNome do Usuario</span>
                                <input type="text" className="form-control" placeholder='Sobrenome'
                                    value={UserSobrenome}
                                    onChange={(e) => this.setState({ UserSobrenome: e.target.value })}
                                ></input>
                                <div className="input-group mb-3"></div>
                                <span className="input-group-text">Email</span>
                                <input type="text" className="form-control" placeholder='email@email.com'
                                    value={UserEmail}
                                    onChange={(e) => this.setState({ UserEmail: e.target.value })}
                                ></input>
                                <div className="input-group mb-3"></div>
                                <span className="input-group-text">Data nascimento</span>
                                <input type="date" className="form-control" 
                                value={UserData_nascimento}
                                onChange={(e) => this.setState({ UserData_nascimento: e.target.value })}></input>


                                <button type="button"
                                    className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>


            {/* )} */}
        </div>

    )
    }}
