import axios from 'axios';
import AuthService from '../AuthService';

const API_BASE_URL = 'http://localhost:8080';

class PostService {

    getPostbyID( id ){
        const header  = AuthService.getAuthHeader();
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
        const header  = AuthService.getAuthHeader();
        return new Promise((resolve , reject )=>{
            axios.get(API_BASE_URL+'/posts', header)
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
        
    doPost( post ){
        const header  = AuthService.getAuthHeader();
        return new Promise((resolve , reject )=>{
            axios.post(API_BASE_URL+'/posts', post , header)
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

    delete(id){
        let header  = AuthService.getAuthHeader();
        return axios.delete( API_BASE_URL+'/posts/'+id, header)
    }
}

export default new PostService();