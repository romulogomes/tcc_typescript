import * as React from 'react';
import { Form } from 'react-final-form'
import { Link } from 'react-router-dom'

import Alerta from '../Alerta';
import InputText from '../Input';
import OrientadorService from './Service'
import { Orientador } from './List';

export interface FormOrientadoresProps {
}

export interface OrientadorForm {
    id? : number;
    name: string;
    area: string;
}

export default class FormOrientadores extends React.Component<FormOrientadoresProps, any> {
    constructor(props){
        super(props);

        this.state = {
            idOrientador : props.match.params.id ? props.match.params.id : 0,
            name : '',
            area : '', 
            success : { ativo : false, mensagem : ''},
            warning : { ativo : false, mensagem : ''}
        }

        this.salvarOrientador = this.salvarOrientador.bind(this); 
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    salvarOrientador(dadosForm: any) : void{
        // Duvida 01
        const dados : OrientadorForm = dadosForm as OrientadorForm;

        debugger
        if(!dados.name || !dados.area){
            this.setState({ warning : { ativo : true, mensagem : 'Preencha todos os campos' }, success : { ativo : false }})
            return;
        }
        
        if(this.state.idOrientador){
            dados.id = this.state.idOrientador;
            OrientadorService.editaOrientador(dados)
                .then(res => {
                    if(res.data.id)
                        this.setState( {success : { ativo : true, mensagem : "Editado com Sucesso"}, warning : { ativo : false} });
                    else
                        this.setState( { success : { ativo : false }, warning : { ativo : true, mensagem : "Não foi possível concluir sua Requisicao - Nome ja existe" } }); 
                }).catch(erro => { 
                    this.setState( { success : { ativo : false }, 
                                     warning : { ativo : true, mensagem : "Erro" } }); 
                })    
        }
        else{        
            OrientadorService.gravaOrientador(dados)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Cadastrado com Sucesso"} , warning : { ativo : false} });
                    if(res.data.id)
                        this.setState( {success : { ativo : true, mensagem : "salvo com Sucesso"}, warning : { ativo : false} });
                    else
                        this.setState( { success : { ativo : false }, warning : { ativo : true, mensagem : "Não foi possível concluir sua Requisicao - Nome ja existe" } }); 
                }).catch(res => { 
                    const erros = res.response.data;
                    const mensagem = erros["name"] ? `Nome já existe - Server: ${erros["name"][0]}` : "Não foi possível concluir sua Requisicao";
                    this.setState( { success : { ativo : false }, warning : { ativo : true, mensagem } }); 
                })
        }
    }

    dismissAlert(alert){
        alert === 'warning' ?  this.setState({ warning : { ativo : false } }) :  this.setState({ success:  { ativo : false } })
    }

    public render() {
        return (
            <div className="fadeIn mt-4 p-4">
                <Form onSubmit={this.salvarOrientador}
                      initialValues={{ name: this.state.name, area: this.state.area }}
                      render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                            
                            <InputText label="Nome" name="name"/>

                            <InputText label="Area" name="area"/>

                                                         
                            <div className="mt-3">
                                <button type="submit" disabled={submitting || pristine} className="btn btn-primary">Cadastrar</button>
                                <Link to='/orientador'> <button type="button" className="btn btn-light ml-2">Voltar</button> </Link>
                            </div>
                        </form>
                    )}
                />

                <Alerta tipo="success" show={this.state.success.ativo} mensagem={this.state.success.mensagem} clickFechar={() => this.dismissAlert('sucess')}/>
                <Alerta tipo="warning" show={this.state.warning.ativo} mensagem={this.state.warning.mensagem} clickFechar={() => this.dismissAlert('warning')}/>
            </div>
        );
    }
}
