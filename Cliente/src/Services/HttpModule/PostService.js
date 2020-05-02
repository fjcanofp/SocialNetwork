import axios from 'axios';
import AuthService from '../AuthService';

const API_BASE_URL = 'http://localhost:8080';

class PostService {

    getPostbyID( id ){
        let header  = AuthService.getAuthHeader();
        return new Promise((resolve , reject )=>{
            axios.get(API_BASE_URL+'/posts/'+id , header)
            .then(request=>{
                
                if(!request.data){
                    reject("No data");
                }

                resolve(request.data)
            })
            .catch(error=>{
                reject(error);
            })
        }) 
    }

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