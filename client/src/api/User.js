import { ENV } from "../utils";
import axios from "axios"

export class User {
    baseApi = ENV.BASE_API;
    
    async getMe (accessToken){
        try {
            const config = {headers :{Authorization: `Bearer ${accessToken}`}}
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const resp = await axios.get(url,config);
            const result = await resp.data;
            if(resp.status !==200) throw result;
            return result
        } catch (error) {
            throw error
        }
    }
}