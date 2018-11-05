import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'
import { Orientador } from './List';

class OrientadorService {
    url_orientadores = API_URL+'orientadores/';

    getInfosOrientador(idOrientador : number): AxiosPromise<Orientador>{
        return axios.get(this.url_orientadores+idOrientador);
    }

    listaOrientadores(): AxiosPromise<Orientador[]>{
        return axios.get(this.url_orientadores);
    }

    gravaOrientador(data): AxiosPromise<Orientador>{
        return axios.post(this.url_orientadores, data);
    }

    editaOrientador(data): AxiosPromise<Orientador>{
        return axios.put(this.url_orientadores, data);
    }

    removeOrientador(idOrientador : number) :AxiosPromise{
        return axios.delete(this.url_orientadores+idOrientador);
    }
}

export default new OrientadorService();

