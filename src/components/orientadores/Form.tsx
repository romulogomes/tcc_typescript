import * as React from 'react';
import Alerta from '../Alerta';

export interface FormOrientadoresProps {
}

export default class FormOrientadores extends React.Component<FormOrientadoresProps, any> {
    constructor(props){
        super(props);

        this.state = {
            idOrientador : props.match.params.id ? props.match.params.id : 0,
            name : '',
            area : '', 
            success : { ativo : true, mensagem : 'AA'},
            warning : { ativo : true, mensagem : ''}
        }

        this.dismissAlert = this.dismissAlert.bind(this);
    }

    dismissAlert(alert){
        alert === 'warning' ?  this.setState({ warning : { ativo : false } }) :  this.setState({ success:  { ativo : false } })
    }

    public render() {
        return (
            <div className="fadeIn mt-4 p-4">
                Form Orientadores
                <Alerta tipo="success" show={this.state.success.ativo} mensagem={this.state.success.mensagem} clickFechar={() => this.dismissAlert('sucess')}/>
                <Alerta tipo="warning" show={this.state.warning.ativo} mensagem={this.state.warning.mensagem} clickFechar={() => this.dismissAlert('warning')}/>
            </div>
        );
    }
}
