import * as React from 'react';
import Titulo from '../Titulo';
import { Link } from "react-router-dom";
import OrientadorService from './Service'
import Table from '../Table';

interface ListOrientadoresProps {
}
interface State {
    orientadores : Orientador[];
    orientadorSelecionado : Orientador
}

export interface Orientador {
  id : number;
  name : string;
  area : string;
}

export default class ListOrientadores extends React.Component<ListOrientadoresProps, State> {
  constructor(props : ListOrientadoresProps){
    super(props);

    this.state = {
      orientadores : [],
      orientadorSelecionado : { id : 0, name : "", area : ""},
    }
    
    this.setOrientadorSelecionado = this.setOrientadorSelecionado.bind(this);
    this.redirectEdit = this.redirectEdit.bind(this);
    this.removeOrientador = this.removeOrientador.bind(this);
  }

  componentDidMount() :void{
    OrientadorService.listaOrientadores()
      .then(res => {
        this.setState({ orientadores : res.data });
    }).catch(erro =>{
        console.log(erro)
    })
  }

  redirectEdit() : void{
    window.location.href = `orientador/edit/${this.state.orientadorSelecionado.id}`;
  }

  setOrientadorSelecionado(orientador : Orientador) : void{
    this.setState({orientadorSelecionado : orientador === this.state.orientadorSelecionado ? { id: 0, name: "", area: ""} : orientador });    
  }

  removeOrientador() : void{
    if (window.confirm("Confirma deletar Orientador?")) {
      OrientadorService.removeOrientador(this.state.orientadorSelecionado.id)
          .then(res => {
            const { orientadores } = this.state;
            const index = orientadores.indexOf(this.state.orientadorSelecionado);
            orientadores.splice(index, 1);
            this.setState({orientadores});
            alert("Orientador Removido com sucesso");
        }).catch(erro => {
            if(erro.response.status === 400)
                alert("Orientador tem alunos ligado a Ele");
            console.log(erro)
        })
    }
  }

  public render() {
    const { orientadores } = this.state;
    return (
      <div className="fadeIn">
        <Titulo texto="Orientadores"/>
        
        <Table dados={orientadores} selecionado={this.state.orientadorSelecionado} setSelecionado={this.setOrientadorSelecionado}/>             
        
        <div className="col-3 mt-3">        
            <Link to="/orientador/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
            <button type="button" className="btn btn-info ml-1"  onClick={this.redirectEdit}>Alterar</button>
            <button type="button" className="btn btn-danger ml-1"  onClick={this.removeOrientador}>Excluir</button>
        </div>
      </div>
    );
  }
}
