import * as  YUP from "yup";

export function initialValues(){
    return {
        email :"",
        password: ""
    };
}

export function validationSchema(){
    return YUP.object({
        email: YUP.string().email("El email no es valido").required("Campo Obligatorio"),
        password: YUP.string().required("Campo obligaorio")
    })
}