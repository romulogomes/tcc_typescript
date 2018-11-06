import * as React from 'react';
import { Form } from 'react-final-form'
import { Link } from 'react-router-dom'

import Alerta from '../Alerta';
import InputText from '../Input';
import OrientadorService from './Service'

export interface FormOrientadoresProps {
}

interface State{
    idOrientador: number;
    name: string;
    area: string;
    sucesso : AlertaModel;
    alerta : AlertaModel;
}

export interface AlertaModel{
    ativo : boolean;
    mensagem? : string;
}

export interface OrientadorForm {
    id? : number;
    name: string;
    area: string;
}

export default class FormOrientadores extends React.Component<FormOrientadoresProps, State> {
    constructor(props){
        super(props);

        this.state = {
            idOrientador : props.match.params.id ? props.match.params.id : 0,
            name : '',
            area : '', 
            sucesso : { ativo : false, mensagem : ''},
            alerta : { ativo : false, mensagem : ''}
        }

        this.salvarOrientador = this.salvarOrientador.bind(this); 
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    componentDidMount(): void{
        if(this.state.idOrientador)
          this.getInfosOrientador();
    }

    getInfosOrientador(): void{
        OrientadorService.getInfosOrientador(this.state.idOrientador)
        .then(res => {
            const orientador = res.data;
            this.setState({ name : orientador.name, area : orientador.area });
        }).catch(erro => {
            console.log(erro)
        })
    }

    salvarOrientador(dadosForm: any): void{
        // Duvida 01
        // debugger
        const dados :OrientadorForm = dadosForm;
        debugger
        if(!dados.name || !dados.area){
            this.setState({ alerta : { ativo : true, mensagem : 'Preencha todos os campos' }, sucesso : { ativo : false }})
            return;
        }
        
        if(this.state.idOrientador){
            dados.id = this.state.idOrientador;

            OrientadorService.editaOrientador(dados)
                .then(res => {
                    if(res.data.id)
                        this.setState( {sucesso : { ativo : true, mensagem : "Editado com Sucesso"}, alerta : { ativo : false} });
                    else
                        this.setState( { sucesso : { ativo : false }, alerta : { ativo : true, mensagem : "Não foi possível concluir sua Requisicao - Nome ja existe" } }); 
                }).catch(erro => { 
                    this.setState( { sucesso : { ativo : false }, alerta : { ativo : true, mensagem : "Erro" } }); 
                })    
        }
        else{        
            OrientadorService.gravaOrientador(dados)
                .then(res => {
                    this.setState( {sucesso : { ativo : true, mensagem : "Cadastrado com Sucesso"} , alerta : { ativo : false} });
                    if(res.data.id)
                        this.setState( {sucesso : { ativo : true, mensagem : "salvo com Sucesso"}, alerta : { ativo : false} });
                    else
                        this.setState( { sucesso : { ativo : false }, alerta : { ativo : true, mensagem : "Não foi possível concluir sua Requisicao - Nome ja existe" } }); 
                }).catch(res => { 
                    const erros = res.response.data;
                    const mensagem = erros["name"] ? `Nome já existe - Server: ${erros["name"][0]}` : "Não foi possível concluir sua Requisicao";
                    this.setState( { sucesso : { ativo : false }, alerta : { ativo : true, mensagem } }); 
                })
        }
    }

    dismissAlert(alert: string): void{
        alert === 'alerta' ?  this.setState({ alerta : { ativo : false } }) :  this.setState({ sucesso:  { ativo : false } })
    }

    public render() {
        return (
            <div className="fadeIn mt-4 p-4">
                <Form onSubmit={this.salvarOrientador}
                      initialValues={{ name: this.state.name, area: this.state.area }}
                      render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                            
                            <InputText label="Nome" name="name" tipo="text" />

                            <InputText label="Area" name="area" tipo="text" />

                            <div className="mt-3">
                                <button type="submit" disabled={submitting || pristine} className="btn btn-primary">Cadastrar</button>
                                <Link to='/orientador'> <button type="button" className="btn btn-light ml-2">Voltar</button> </Link>
                            </div>
                        </form>
                    )}
                />

                <Alerta tipo="sucesso" show={this.state.sucesso.ativo} mensagem={this.state.sucesso.mensagem} clickFechar={() => this.dismissAlert('sucesso')}/>
                <Alerta tipo="alerta" show={this.state.alerta.ativo} mensagem={this.state.alerta.mensagem} clickFechar={() => this.dismissAlert('alerta')}/>
            </div>
        );
    }
}
