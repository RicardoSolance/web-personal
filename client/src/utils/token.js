import jwtDecode from "jwt-decode";

export const hasExpired = (token)=>{
    const {exp} = jwtDecode(token);
    console.log('ha expirado?', exp);
    const currenDate = new Date().getTime();
    if(exp <= currenDate){
        return true
    }

    return false
}