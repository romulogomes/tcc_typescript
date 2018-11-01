import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'
import { Orientador } from './List';

class OrientadorService {
    url_orientadores = API_URL+'orientadores/';

    listaOrientadores() : AxiosPromise{
        return axios.get(this.url_orientadores);
    }

    // getInfosOrientador(idOrientador){
    //     return axios.get(this.url_orientadores+idOrientador);
    // }

    // gravaOrientador(data){
    //     return axios.post(this.url_orientadores, data);
    // }

    // editaOrientador(data){
    //     return axios.put(this.url_orientadores, data);
    // }

    removeOrientador(idOrientador : number) :AxiosPromise{
        return axios.delete(this.url_orientadores+idOrientador);
    }
}

export default new OrientadorService();

