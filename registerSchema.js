import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required("Ad Soyad alanı zorunludur")
    .min(3, "Ad Soyad en az 3 karakter olmalıdır")
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Ad Soyad sadece harflerden oluşmalıdır"),

  email: yup
    .string()
    .required("E-posta alanı zorunludur")
    .email("Geçerli bir e-posta adresi giriniz")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Geçerli bir e-posta formatı giriniz"
    ),

  password: yup
    .string()
    .required("Şifre alanı zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    //   "Şifre en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir"
    // )
    ,

  terms: yup
    .boolean()
    .oneOf([true], "Kullanım koşullarını kabul etmelisiniz")
    .required("Kullanım koşullarını kabul etmelisiniz"),
});


