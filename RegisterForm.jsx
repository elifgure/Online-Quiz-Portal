import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../Schemas/registerSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Zoom } from "react-toastify";
import { Mail, Lock, User, Phone } from "lucide-react";
import { registerUser } from "../../features/Auth/authService";
import { useNavigate } from "react-router-dom";

const RoleButton = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-md transform scale-105"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
  >
    {children}
  </button>
);

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  });

  // doğru yola göre ayarla

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { fullName, email, password } = data;

      const result = await registerUser(fullName, password, email, role);

      if (result.success) {
        toast.success(result.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });
        setTimeout(() =>{
          navigate("/login", {
            state:{
              message: "Kayıt başarılı! Lütfen giriş yapınız.",
              email:email,
            }
          }, 2000)
        })
      } else {
        toast.error(result.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Zoom,
        });
      }
    } catch (error) {
      toast.error("Kayıt olurken bir hata oluştu!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        transition: Zoom,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <RoleButton active={role === "teacher"} onClick={() => setRole("teacher")}>Öğretmen</RoleButton>
        <RoleButton active={role === "student"}onClick={() => setRole("student")}>Öğrenci</RoleButton>
        <RoleButton active={role === "admin"} onClick={() => setRole("admin")}>Admin</RoleButton>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-mono block">Ad Soyad</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="fullName"
              placeholder="Ad ve soyadınızı giriniz"
              className={`w-full pl-10 pr-4 py-3 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
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
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-mono block">Şifre</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Şifrenizi giriniz"
              className={`w-full pl-10 pr-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input id="terms" type="checkbox" {...register("terms")} />
          <label htmlFor="terms" className="font-mono text-sm">
            Kullanım koşullarını kabul ediyorum
          </label>
          {errors.terms}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-70"
        >
          {isSubmitting ? "Kayıt olunuyor..." : "Kayıt Ol"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
