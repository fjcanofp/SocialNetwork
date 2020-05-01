import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080';
const SESSION_ID = 'NBA_USER_SECCION';

class AuthService {

    loginManager(User){
        return new Promise(( resolve , reject )=>{
            this.login(User)
            .then(( response )=>{
                this.setUserInfo({
                    user : response.data.user ,
                    token : response.data.token
                 });
                resolve(response)
            })
            .catch(( error )=>{
                reject(error)
            })
        })
    }

    registerManager(User){
        return new Promise(( resolve , reject )=>{
            this.register(User)
            .then(( response )=>{
                this.setUserInfo({
                   user : response.data.user ,
                   token : response.data.token
                });
                resolve(response)
            })
            .catch(( error )=>{
                reject(error)
            })
        })
    }

    login(credentials){
        return axios.post(USER_API_BASE_URL + "/login", credentials);
    }
    
    register(credentials){
        return axios.post(USER_API_BASE_URL + "/register", credentials);
    }

    setUserInfo( User ){
        sessionStorage.setItem(SESSION_ID , JSON.stringify(User));
    }

    getUserInfo(){
        return JSON.parse(sessionStorage.getItem(SESSION_ID)).user;
    }

    getAuthHeader() {
       return { "headers": {"Authorization": 'Bearer ' + this.getUserInfo().token }};
    }

    logOut() {
        sessionStorage.removeItem(SESSION_ID);
        //return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }
}

export default new AuthService();