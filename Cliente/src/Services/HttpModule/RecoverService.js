import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

class RecoverService {

    /**
     * This will be send when a user apply to
     * recover password
     */
    doRecoveryRequest( data ){
        return axios.post(API_BASE_URL+'/recovery', data )
    }
    /*
    *   This make the request to change the password 
    *   on Data service
    */
    doRecovery( data ){
        return axios.put(API_BASE_URL+'/recovery', data )
    }
}

export default new RecoverService();