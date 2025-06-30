import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../Schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, Zoom } from "react-toastify";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  GraduationCap,
  LogIn,
} from "lucide-react";
import {Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/Auth/authService";
import logo from "../../assets/logo-transparent.png";

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await loginUser(data.email, data.password, role);
      if (result && role === "student") {
        navigate("/student");
      } else if (result && role === "teacher") {
        navigate("/teacher");
      }
      reset();
    } catch (err) {
      console.log("Bilinmeyen hata:", err.message);
      if (err.message.includes("auth/invalid-credential")) {
        toast.error("E-posta veya şifre hatalı", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "colored",
          transition: Zoom,
        });
      } else if (err.message.includes("auth/user-not-found")) {
        setLoginError("Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.");
      } else if (err.message.includes("auth/wrong-password")) {
        setLoginError("Hatalı şifre girdiniz.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100 flex items-center justify-center px-4  relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl"></div>
      <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-200/50 p-8 transition-all duration-300">
          <div className="text-center mb-6">
            {/* Logo */}
            <Link to="/" className="flex justify-center items-center mb-2">
              <img
                src={logo || "/assets/logo-transparent.png"}
                alt="QuizPortal Logo"
                className="h-20 w-32 object-cover transition-all duration-300 hover:scale-105"
              />
            </Link>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#044c5c] via-[#33a393] to-[#21817c] bg-clip-text text-transparent mb-3">
              Hoş Geldin!
            </h1>
            <p className="text-[#2d6c74] font-medium">
              Hesabına giriş yap ve öğrenmeye devam et
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <div className="flex gap-3 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#33a393]/20 shadow-inner">
              {/* Öğrenci Rolü Butonu */}
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${
                  role === "student" 
                    ? "bg-gradient-to-r from-[#33a393] to-[#21817c] text-white shadow-lg transform scale-[1.02]" 
                    : "text-[#2d6c74] hover:bg-white/80 hover:shadow-md"
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                Öğrenci
              </button>
              
              {/* Öğretmen Rolü Butonu */}
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 ${
                  role === "teacher" 
                    ? "bg-gradient-to-r from-[#33a393] to-[#21817c] text-white shadow-lg transform scale-[1.02]" 
                    : "text-[#2d6c74] hover:bg-white/80 hover:shadow-md"
                }`}
              >
                <UserCheck className="w-5 h-5" />
                Öğretmen
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  {/* Email Field */}
<div className="pt-2">
  <fieldset className={`relative border-2 rounded-xl ${errors.email ? "border-red-400" : "border-[#33a393]"} focus-within:border-[#21817c] transition-all duration-200`}>
    <legend className={`text-sm px-4 font-medium ${errors.email ? "text-red-500" : "text-[#33a393]"}`}>
      E-posta
    </legend>
    <div className="flex items-center px-3 py-2">
      <Mail className={`h-5 w-5 ${errors.email ? "text-red-500" : "text-[#33a393]"} mr-2`} />
      <input
        type="email"
        name="email"
        placeholder="E-posta adresinizi giriniz"
        className="w-full h-10 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        {...register("email")}
      />
    </div>
  </fieldset>
  {errors.email && (
    <p className="text-sm text-red-500 font-medium mt-1">
      {errors.email.message}
    </p>
  )}
</div>

{/* Password Field */}
<div className="pt-2">
  <fieldset className={`relative border-2 rounded-xl ${errors.password ? "border-red-400" : "border-[#33a393]"} focus-within:border-[#21817c] transition-all duration-200`}>
    <legend className={`text-sm px-4 font-medium ${errors.password ? "text-red-500" : "text-[#33a393]"}`}>
      Şifre
    </legend>
    <div className="flex items-center px-3 py-2">
      <Lock className={`h-5 w-5 ${errors.password ? "text-red-500" : "text-[#33a393]"} mr-2`} />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Şifrenizi giriniz"
        className="w-full h-10 bg-transparent outline-none text-gray-800 placeholder-gray-400"
        {...register("password")}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="text-[#33a393] hover:text-[#21817c] ml-2"
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  </fieldset>
  {errors.password && (
    <p className="text-sm text-red-500 font-medium mt-1">
      {errors.password.message}
    </p>
  )}
</div>
 {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-[#33a393] to-[#21817c] hover:from-[#21817c] hover:to-[#156b6c] hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Giriş Yapılıyor...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Giriş Yap
                </>
              )}
            </button>


</form>


          {/* Footer Links */}
          <div className="mt-8 text-center space-y-3">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px bg-gradient-to-r from-transparent via-[#33a393]/30 to-transparent flex-1"></div>
              <span className="text-sm text-[#2d6c74] font-medium">veya</span>
              <div className="h-px bg-gradient-to-r from-transparent via-[#33a393]/30 to-transparent flex-1"></div>
            </div>

            <div className="space-y-2">
              <p className="text-[#2d6c74]">
                Hesabın yok mu?{" "}
                <a
                  href="/register"
                  className="text-[#33a393] hover:text-[#21817c] font-semibold hover:underline transition-all duration-200"
                >
                  Kayıt Ol
                </a>
              </p>
              <p>
                <a
                  href="/forgot-password"
                  className="text-orange-500 hover:text-orange-600 font-medium hover:underline transition-all duration-200 text-sm"
                >
                  Şifremi Unuttum
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements - Logo renklerine uygun */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-[#33a393] to-[#21817c] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-[#21817c] to-[#156b6c] rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 -right-6 w-4 h-4 bg-gradient-to-r from-[#33a393] to-[#53b4a6] rounded-full opacity-60 animate-pulse delay-500"></div>
      </div>
    </div>
  );
};

export default LoginForm;