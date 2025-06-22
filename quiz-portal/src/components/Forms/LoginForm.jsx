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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
      if (result.success && role === "student") {
        navigate("/student");
        console.log("Merhaba", typeof navigate);
      } else {
        navigate("/");
      }

      console.log("Giriş başarılı, rol:", role, result);
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
            <div className="flex justify-center items-center mb-2">
              <img
                src={logo || "/assets/logo-transparent.png"}
                alt="QuizPortal Logo"
                className="h-20 w-32 object-cover transition-all duration-300 hover:scale-105"
              />
            </div>

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
            <div className="space-y-3">
              <label className="text-sm font-semibold text-[#044c5c] block">
                E-posta
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-[#33a393] group-focus-within:text-[#21817c] transition-colors duration-200" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="E-posta adresinizi giriniz"
                  className={`w-full pl-12 pr-4 py-4 border-2 ${
                    errors.email
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#33a393]/30 focus:border-[#33a393]"
                  } rounded-xl focus:outline-none focus:ring-4 focus:ring-[#33a393]/20 bg-white/80 backdrop-blur-sm transition-all duration-200 placeholder-gray-400`}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="absolute -bottom-6 left-0">
                    <p className="text-sm text-red-500 font-medium">
                      {errors.email.message}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="pt-2">
              <fieldset className="relative border-2 rounded-xl border-[#33a393] focus-within:border-[#21817c] transition-all duration-200">
                <legend className="text-sm text-[#33a393] px-2 font-medium">
                  Şifre
                </legend>
                <div className="flex items-center px-3">
                  <Lock className="h-5 w-5 text-[#33a393] mr-2 mt-2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Şifrenizi giriniz"
                    className="w-full py-3 bg-white/80 backdrop-blur-sm outline-none text-gray-800 placeholder-gray-400"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#33a393] hover:text-[#21817c] mt-1"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </fieldset>
              {errors.password && (
                <p className="text-sm text-red-500 font-medium mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 pt-2">
              <div className="relative flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="w-5 h-5 text-[#33a393] bg-white border-2 border-[#33a393]/50 rounded focus:ring-[#33a393] focus:ring-2 transition-all duration-200"
                  {...register("rememberMe")}
                />
              </div>
              <label
                htmlFor="rememberMe"
                className="text-[#044c5c] font-medium cursor-pointer"
              >
                Beni hatırla
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group bg-gradient-to-r from-[#33a393] to-[#21817c] hover:from-[#21817c] hover:to-[#156b6c] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Giriş Yapılıyor...
                  </>
                ) : (
                  "Giriş Yap"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>

            {/* Error Message */}
            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600 font-medium text-center">
                  {loginError}
                </p>
              </div>
            )}
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