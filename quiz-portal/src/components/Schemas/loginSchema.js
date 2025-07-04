import * as yup from 'yup';

export const loginSchema = yup.object({
 email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi girmeniz gerekiyor"),
  password: yup
    .string()
    .required("Şifre girmeniz gerekiyor"),
});