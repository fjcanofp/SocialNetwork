import axios from 'axios';
import AuthService from '../AuthService';

const API_BASE_URL = 'http://localhost:8080';
const SESSION_ID = 'NBA_USER_SECCION';

class UsersService {

    getUserbyId(id) {
        const header = AuthService.getAuthHeader();
        return new Promise((resolve, reject) => {
            axios.get(`${API_BASE_URL}/user/${id}`, header)
                .then(request => {

                    if (!request.data) {
                        reject("No data");
                    }

                    resolve(request.data)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    modifyUser(User , id ) {
        const header = AuthService.getAuthHeader();
        return new Promise((resolve, reject) => {
            axios.put(`${API_BASE_URL}/user/${id}`, User , header)
                    .then(request => {

                        if (!request.data) {
                            reject("No data");
                        }

                        resolve(request.data)
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
    }

    findUserRegex(regex) {
        const header = AuthService.getAuthHeader();
        return new Promise((resolve, reject) => {
            axios.get(`${API_BASE_URL}/users/regex/${regex}`, header)
                .then(request => {

                    if (!request.data) {
                        reject("No data");
                    }

                    resolve(request.data)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }
}

export default new UsersService();