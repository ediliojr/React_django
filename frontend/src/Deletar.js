import React, { Component } from 'react';
import { variables } from './Variables';

export class Deletar extends Component {

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

    deleteClick(id) {
        if (window.confirm('Tem certeza?')) {
            fetch(variables.API_URL + 'user/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }


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
        const {
            users,
            modalTitle,
            UserNome,
            UserSobrenome,
            UserEmail,
            UserData_nascimento,
        } = this.state;


        return (
            <div class="dropdown ">

       
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {users.map(use =>
                        <tr key={use.UserId}>
                            <td>{use.UserId}</td>
                            <td>{use.UserNome}</td></tr>)}
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                    <a className="dropdown-item" href="#" onClick={() => this.deleteUser(users.id)}>Delete {users.UserNome}</a>




                </div>
                <button type="button"
                    className="btn btn-primary d-flex-justify-center" onClick={() => this.deleteClick()}>Delete</button>


            </div>


        )
    }
}