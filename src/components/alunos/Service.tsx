import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'
import { Aluno } from './List';
import { AlunoFormModel } from './Form';

class AlunoService {

    url_alunos = API_URL+'students/';

    listaAlunos() : AxiosPromise{
        return axios.post(this.url_alunos+'dados_completos', {});
    }
    
    getInfosAluno(idAluno : number): AxiosPromise{
        return axios.get(this.url_alunos + idAluno);
    }
    
    gravaAluno(data: AlunoFormModel): AxiosPromise{
        return axios.post( this.url_alunos, data);
    }
    
    editAluno(data : AlunoFormModel): AxiosPromise{
        return axios.put(this.url_alunos, data);
    }
    
    removeAluno(idAluno : number): AxiosPromise{
        return axios.delete(this.url_alunos+idAluno);
    }
}

export default new AlunoService();

