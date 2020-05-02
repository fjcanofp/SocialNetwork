import axios from 'axios';
import AuthService from '../AuthService';

const API_BASE_URL = 'http://localhost:8080';

class PostService {

    getPost(){
        let header  = AuthService.getAuthHeader();
        return axios.get(API_BASE_URL+'/posts', header)
    }

    doPost( post ){
        let header  = AuthService.getAuthHeader();
        return axios.post( API_BASE_URL+'/posts', post , header)
    }

}

export default new PostService();