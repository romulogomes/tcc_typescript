import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'
import { Aluno } from './List';

class AlunoService {

    url_alunos = API_URL+'students/';

    listaAlunos() : AxiosPromise{
        return axios.post(this.url_alunos+'dados_completos', {});
    }
    
    getInfosAluno(idAluno : number){
        return axios.get(this.url_alunos + idAluno);
    }
    
    gravaAluno(data : any){
        return axios.post( this.url_alunos, data);
    }
    
    editAluno(data){
        return axios.put(this.url_alunos, data);
    }
    
    removeAluno(idAluno : number){
        return axios.delete(this.url_alunos+idAluno);
    }
}

export default new AlunoService();

