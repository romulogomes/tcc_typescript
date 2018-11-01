import * as React from 'react';
import Titulo from '../Titulo';
import { Link } from "react-router-dom";
import { Orientador } from '../orientadores/List';
import AlunoService from './Service'
import Table from '../Table';

interface ListAlunosProps {
}

interface State {
    alunos : Aluno[];
    alunoSelecionado : Aluno
    dadosTabela : []
}

export interface Aluno {
    id : number;
    name : string;
    orientador : Orientador
}

export default class ListAlunos extends React.Component<ListAlunosProps, State> {
    constructor(props : ListAlunosProps) {
        super(props);
        
        this.state = {
            alunos: [],
            alunoSelecionado : { id: 0, name: "", orientador : {id: 0, name: "", area: ""}},
            dadosTabela : []
        }

        this.setAlunoSelecionado = this.setAlunoSelecionado.bind(this);
        this.redirectEditAluno = this.redirectEditAluno.bind(this);
        this.removeAluno = this.removeAluno.bind(this);
        this.transformDataToTable = this.transformDataToTable.bind(this);
    }

    componentDidMount(){
        AlunoService.listaAlunos()
            .then(res => {
                const alunos = res.data;
                this.setState({ alunos });
                this.transformDataToTable(alunos);
            }).catch(erro =>{
                console.log(erro)
            })
    }

    setAlunoSelecionado(aluno : Aluno) : void{
        this.setState({alunoSelecionado : aluno === this.state.alunoSelecionado ? { id: 0, name: "", orientador : {id: 0, name: "", area: ""}}  : aluno });    
    }

    redirectEditAluno() : void{
        window.location.href = `aluno/edit/${this.state.alunoSelecionado.id}`;
    }
                 
    removeAluno() : void{
        if (window.confirm("Confirma deletar Aluno?")) {
            AlunoService.removeAluno(this.state.alunoSelecionado.id) 
              .then(res => {
                alert("Aluno Removido com sucesso");
                this.componentDidMount();
            }).catch(erro =>{
                console.log(erro)
            })
        }
    }

    transformDataToTable( dados : Aluno[] ) : void {
        const json : any = [];
        if(dados){ 
            dados.forEach( function (dado) {
                json.push({ id : dado.id,
                            name : dado.name,
                            orientador : dado.orientador.name,
                            area : dado.orientador.area
                })
            })
        }
        this.setState({ dadosTabela : json })
    }
  
    public render() {
        return (
        <div className="fadeIn">
            <Titulo texto="Alunos"/>
            
            <Table dados={this.state.dadosTabela} selecionado={this.state.alunoSelecionado} setSelecionado={this.setAlunoSelecionado}/>

            <div className="col-3 mt-3">
                <Link to="/aluno/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                <button type="button" className="btn btn-info ml-1" disabled={!this.state.alunoSelecionado} onClick={this.redirectEditAluno}>Alterar</button>
                <button type="button" className="btn btn-danger ml-1" disabled={!this.state.alunoSelecionado} onClick={this.removeAluno}>Excluir</button>
            </div>
        </div>
        );
    }
}
