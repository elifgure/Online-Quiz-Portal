import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../Schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Zoom } from "react-toastify";
import { Mail } from 'lucide-react';

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("form verisi:", data);

      toast.success("Başarıyla giriş yaptınız!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });

      // Başarılı girişten sonra yönlendirme yapılabilir
      // navigate('/');
    } catch (errors) {
      toast.error("Giriş yapılırken bir hata oluştu!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> {/* 6'dan 4'e düşürdük */}
        <div className="space-y-1"> {/* 2'den 1'e düşürdük */}
          <label className="text-sm font-mono block">E-posta</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="E-posta adresinizi giriniz"
              className={`w-full pl-10 pr-4 py-3 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("email")}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-mono block">Şifre</label>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Şifrenizi giriniz"
              className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("password")}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2"><input
          id="rememberMe"
          type="checkbox"
          {...register("rememberMe")}
       />
        <label htmlFor="rememberMe" className="font-mono" >Beni hatırla</label></div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-70"
        ></button>
      </form>
    </>
  );
};

export default LoginForm;
