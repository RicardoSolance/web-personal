import { ENV } from "../utils";
import axios from "axios"
export class Auth {
  baseApi = ENV.BASE_API;
  headers = { "Content-Type": "application/json" };

  async register(data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.REGISTER}`;
      const resp = await axios.post(url,data,headers)
      const result = await resp.data;
      console.log('resss:', result);
      if(resp.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async login(data){
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.LOGIN}`;
      const resp = await axios.post(url, data, this.headers)
      const result = await resp.data
      if(result.status !== 200) throw result
      return result
    } catch (error) {
      throw error
    }
  }
}
