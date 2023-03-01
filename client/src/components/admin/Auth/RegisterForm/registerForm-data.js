import * as Yup from "yup";

export function initialValue() {
  return {
    email: "",
    password: "",
    repeatepassword: "",
    conditionAcepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Este email no es válido").required("este Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
    repeatepassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password"), "Las contraseñas no coinciden"]),
    conditionAcepted: Yup.bool().isTrue(true),
  });
}
