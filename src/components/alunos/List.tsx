import * as React from 'react';
import Titulo from '../Titulo';
import { Link } from "react-router-dom";
import { Orientador } from '../orientadores/List';

interface ListAlunosProps {
}

interface State {
    alunos : Aluno[];
    alunoSelecionado : Aluno
}

export interface Aluno {
    id : number;
    name : string;
    orientador : Orientador
}



export default class ListAlunos extends React.Component<ListAlunosProps, any> {
    constructor(props : ListAlunosProps) {
        super(props);
        
        this.state = {
            alunos: [],
            alunoSelecionado : {},
            dadosTabela : []
        }

        this.setAlunoSelecionado = this.setAlunoSelecionado.bind(this);
        this.redirectEditAluno = this.redirectEditAluno.bind(this);
        this.removeAluno = this.removeAluno.bind(this);
        this.transformDataToTable = this.transformDataToTable.bind(this);
    }


    setAlunoSelecionado(aluno : Aluno){
        this.setState({alunoSelecionado : aluno === this.state.alunoSelecionado ? 0 : aluno });    
    }

    redirectEditAluno(){
        window.location.href = `aluno/edit/${this.state.alunoSelecionado.id}`;
    }

    removeAluno(){
        if (window.confirm("Confirma deletar Aluno?")) {
            AlunosService.removeAluno(this.state.alunoSelecionado.id) 
              .then(res => {
                alert("Aluno Removido com sucesso");
                const { dadosTabela }  = this.state;
                const index = dadosTabela.indexOf(this.state.alunoSelecionado);
                dadosTabela.splice(index, 1);
                this.setState({dadosTabela});
            }).catch(erro =>{
                console.log(erro)
            })
        }
    }

    transformDataToTable( dados ) {
        const json = [];
        if(dados){ 
            for (let i = 0; i < dados.length; i++) {
                json.push({ "id" : dados[i].id,
                            "name" : dados[i].name,
                            "orientador" : dados[i].orientador.name,
                            "area" : dados[i].orientador.area
                })
            }
        }
        this.setState({ dadosTabela : json })
    }
  
    public render() {
        return (
        <div>
            List Alunos
            <Titulo texto="Alunos"/>

            <div className="col-3 mt-3">
                <Link to="/aluno/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                <button type="button" className="btn btn-info ml-1" disabled={!this.state.alunoSelecionado} onClick={this.redirectEditAluno}>Alterar</button>
                <button type="button" className="btn btn-danger ml-1" disabled={!this.state.alunoSelecionado} onClick={this.removeAluno}>Excluir</button>
            </div>
        </div>
        );
    }
}
