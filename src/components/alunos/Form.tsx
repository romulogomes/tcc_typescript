import * as React from 'react';
import { Form } from 'react-final-form'

import Select from '../Select';
import AlunoService from './Service'
import OrientadorService from './../orientadores/Service'
import Alerta from '../Alerta';
import InputText from '../Input';
import BotoesCrud from './../BotoesCrud'
import { Aluno } from './List';

export interface FormAlunosProps {
}

export interface AlunoForm{
    id?: number;
    name :string;
    advisor: string | number;
}

export default class FormAlunos extends React.Component<FormAlunosProps, any> {
    constructor(props) {
        super(props);
        
        this.state = {
            idAluno : props.match.params.id ? props.match.params.id : 0,
            name : '',
            orientador : '', 
            sucesso : { ativo : false, mensagem : ''},
            alerta : { ativo : false, mensagem : ''},
            options : []
        }

        this.salvarAluno = this.salvarAluno.bind(this);
        this.selecionaOrientador = this.selecionaOrientador.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
    }

    componentDidMount(){
        OrientadorService.listaOrientadores()
            .then(res => {
                const advisors = res.data;
                this.setState({ advisors });
                this.transformOptions(advisors);
            }).catch(erro =>{ console.log(erro) })

        if(this.state.idAluno)
          this.getInfosAluno();
    }

    dismissAlert(alert){
        if(alert === 'alerta')
            this.setState({ alerta : { ativo : false } })
        else
            this.setState({ sucesso:  { ativo : false } })
    }

    getInfosAluno(){
        AlunoService.getInfosAluno(this.state.idAluno)
            .then(res => {
                console.log(res.data);
                const aluno = res.data;
                this.setState({ name : aluno.name , orientador : { value: aluno.orientador.id, label: aluno.orientador.name } });
            }).catch(erro => { console.log(erro)})
    }

    transformOptions( advisors ) {
        const options = advisors.map(advisor => ({ value: advisor.id, label: advisor.name }))
        this.setState({options});   
    }

    selecionaOrientador(option){
        this.setState({orientador: option});
    }

    salvarAluno(dadosForm : any) {
        const dados : AlunoForm = dadosForm as AlunoForm;
        
        debugger
        
        if(!dados.name || !dados.advisor){
            this.setState({ alerta : { ativo : true, mensagem : 'Preencha todos os campos' }, sucesso : { ativo : false }})
            return;
        }
        
        const jsonSend : any = { name : dados.name, advisor_id : dados.advisor }
        if(this.state.idAluno){
            jsonSend.id = this.state.idAluno;
            AlunoService.editAluno(jsonSend)
                .then(res => {
                    this.setState( {sucesso : { ativo : true, mensagem : "Editado com Sucesso"}, alerta : { ativo : false} });
                }).catch(erro => { console.log(erro); })    
        }
        else{        
            AlunoService.gravaAluno(jsonSend)
                .then(res => {
                    this.setState( {sucesso : { ativo : true, mensagem : "Cadastrado com Sucesso"} , alerta : { ativo : false} });
                }).catch(erro => { console.log(erro); })
        }
    }

    render() {
        return (
            <div className="fadeIn mt-4 p-4">
                <Form onSubmit={this.salvarAluno}
                      initialValues={{ name: this.state.name, advisor : this.state.orientador.value}}
                      render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                            <InputText label="Nome" name="name"/>
                            
                            <Select label="Orientador" name="advisor" options={this.state.options} />

                            <BotoesCrud labelCadastrar="Cadastrar" linkVoltar="/aluno" submitting={submitting} pristine={pristine}/>
                        </form>
                    )}
                />
                <Alerta tipo="sucesso" show={this.state.sucesso.ativo} mensagem={this.state.sucesso.mensagem} clickFechar={() => this.dismissAlert('sucesso')} />
                <Alerta tipo="alerta" show={this.state.alerta.ativo} mensagem={this.state.alerta.mensagem} clickFechar={() => this.dismissAlert('alerta')} />
            </div>
        );
    }
}
