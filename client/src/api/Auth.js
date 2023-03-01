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
      if(resp.status !== 200) throw result
      return result
    } catch (error) {
      throw error
    }
  }

  setAccessToken(token){
    localStorage.setItem(ENV.JWT.ACCESS, token)
  }
  getAccessToken(){
    return localStorage.getItem(ENV.JWT.ACCESS)
  }

  setRefreshToken(token){
    localStorage.setItem(ENV.JWT.REFRESH, token)
  }
  getRefreshToken(){
    return localStorage.getItem(ENV.JWT.REFRESH)
  }

  removeTokens(){
    localStorage.removeItem(ENV.JWT.ACCESS)
    localStorage.removeItem(ENV.JWT.REFRESH)
  }
}
