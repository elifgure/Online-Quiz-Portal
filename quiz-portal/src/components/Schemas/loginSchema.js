import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Lütfen geçerli bir e-posta adresi giriniz")
    .required("E-posta adresi giriniz"),
  password: yup
    .string()
    .required("Şifre giriniz"),
});