import axios from 'axios';
import AuthService from '../AuthService';


const API_BASE_URL = 'http://localhost:8080';
const SESSION_ID = 'NBA_USER_SECCION';

class FileService {


    getFile(id) {
        return new Promise((resolve, reject) => {
            //axios.get(API_BASE_URL + '/file/' + id, AuthService.getAuthHeader())
            axios({
                url: API_BASE_URL + '/file/' + id,
                method: 'GET',
                responseType: 'blob', // important
                headers: { "Authorization": 'Bearer ' + JSON.parse(sessionStorage.getItem(SESSION_ID)).token, 'Content-Type': 'multipart/form-data' }
            })
            .then(response => {
                if (!response.data) {
                    reject("No data");
                }
                const url = window.URL.createObjectURL(new Blob([response.data]));
                resolve({ url: url, type: response.data.type })
            })
            .catch(error => {
                reject(error);
            })
        })
    }
}

export default new FileService();