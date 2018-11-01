import * as React from 'react';
import { Form } from 'react-final-form'

import Select from '../Select';
import AlunoService from './Service'
import OrientadorService from './../orientadores/Service'
import Alerta from '../Alerta';
import InputText from '../Input';
import BotoesCrud from './../BotoesCrud'

export interface FormAlunosProps {
}

export default class FormAlunos extends React.Component<FormAlunosProps, any> {
    constructor(props) {
        super(props);
        
        this.state = {
            idAluno : props.match.params.id ? props.match.params.id : 0,
            name : '',
            orientador : '', 
            success : { ativo : true, mensagem : ''},
            warning : { ativo : true, mensagem : ''},
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
        if(alert === 'warning')
            this.setState({ warning : { ativo : false } })
        else
            this.setState({ success:  { ativo : false } })
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

    salvarAluno(dados : any) {
        if(!dados.name || !dados.advisor){
            this.setState({ warning : { ativo : true, mensagem : 'Preencha todos os campos' }, success : { ativo : false }})
            return false;
        }
        
        const jsonSend : any = { name : dados.name, advisor_id : dados.advisor }
        if(this.state.idAluno){
            jsonSend.id = this.state.idAluno;
            AlunoService.editAluno(jsonSend)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Editado com Sucesso"}, warning : { ativo : false} });
                }).catch(erro => { console.log(erro); })    
        }
        else{        
            AlunoService.gravaAluno(jsonSend)
                .then(res => {
                    this.setState( {success : { ativo : true, mensagem : "Cadastrado com Sucesso"} , warning : { ativo : false} });
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
                <Alerta tipo="success" show={this.state.success.ativo} mensagem={this.state.success.mensagem} clickFechar={() => this.dismissAlert('sucess')} />
                <Alerta tipo="warning" show={this.state.warning.ativo} mensagem={this.state.warning.mensagem} clickFechar={() => this.dismissAlert('warning')} />
            </div>
        );
    }
}
