import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'

class OrientadorService {
    url_orientadores = API_URL+'orientadores/';

    listaOrientadores(): AxiosPromise{
        return axios.get(this.url_orientadores);
    }

    getInfosOrientador(idOrientador : number): AxiosPromise{
        return axios.get(this.url_orientadores+idOrientador);
    }

    gravaOrientador(data): AxiosPromise{
        return axios.post(this.url_orientadores, data);
    }

    editaOrientador(data): AxiosPromise{
        return axios.put(this.url_orientadores, data);
    }

    removeOrientador(idOrientador : number) :AxiosPromise{
        return axios.delete(this.url_orientadores+idOrientador);
    }
}

export default new OrientadorService();

