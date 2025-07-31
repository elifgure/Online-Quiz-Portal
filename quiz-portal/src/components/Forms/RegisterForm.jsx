import { useState } from "react"
import { useForm } from "react-hook-form"
import { registerSchema } from "../Schemas/registerSchema"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast, Zoom } from "react-toastify"
import { Mail, Lock, User, Eye, EyeOff, UserCheck, GraduationCap, Shield} from "lucide-react"
import { registerUser } from "../../features/Auth/authService"
import { useNavigate, Link } from "react-router-dom"
import logo from "../../assets/logo-transparent.png"

const RoleButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-[#33a393] to-[#21817c] text-white shadow-lg transform scale-105 border-2 border-[#33a393]"
        : "bg-white/70 backdrop-blur-sm text-[#044c5c] hover:bg-white/90 border-2 border-[#33a393]/30 hover:border-[#33a393]/60 hover:shadow-md"
    } focus:outline-none focus:ring-2 focus:ring-[#33a393]/30`}
  >
    <Icon className="h-4 w-4" />
    <span className="text-xs font-bold">{children}</span>
  </button>
)

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [role, setRole] = useState("student")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onBlur",
  })

  const handleTermsChange = (e) => {
    setIsTermsAccepted(e.target.checked)
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const { fullName, email, password } = data

      const result = await registerUser(fullName, password, email, role)

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
        })

        // Role göre yönlendirme
        const redirectPath = {
          student: '/student',
          teacher: '/teacher',
          admin: '/admin'
        }[role] || '/'

        setTimeout(() => {
          navigate(redirectPath, {
            state: {
              message: "Kayıt başarılı! Yönlendiriliyorsunuz...",
              email: email,
              role: role,
            },
          })
        }, 2000)
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
        })
      }
    } catch (error) {
      toast.error("Kayıt olurken bir hata oluştu!", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "colored",
        transition: Zoom,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden relative flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100/50 via-transparent to-orange-100/50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(51,163,147,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(51,163,147,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Logo - Sol üst köşe */}
      <div className="absolute top-6 left-6 z-20">
        <Link to="/" className="block group hover:scale-105 transition-all duration-300">
          <img
            src={logo || "/assets/logo-transparent.png"}
            alt="QuizPortal Logo"
            className="h-20 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Main Content - Tam ekran merkezi */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 py-4">
        <div className="w-full max-w-2xl">
          {/* Welcome Section - Kompakt */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#33a393] to-[#21817c] rounded-2xl mb-3 shadow-lg">
              <User className="h-7 w-7 text-white" />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#044c5c] via-[#33a393] to-[#21817c] bg-clip-text text-transparent mb-2 leading-tight">
              Aramıza Katıl!
            </h1>
            <p className="text-base text-[#2d6c74] font-medium max-w-sm mx-auto leading-relaxed">
              Hesap oluştur ve öğrenme yolculuğuna başla
            </p>
          </div>

          {/* Registration Card - Kompakt */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-5 md:p-6">
            {/* Role Selection - Kompakt */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-[#044c5c] mb-3 text-center">Rolünüzü Seçin</h3>
              <div className="grid grid-cols-3 gap-2">
                <RoleButton active={role === "student"} onClick={() => setRole("student")} icon={GraduationCap}>
                  Öğrenci
                </RoleButton>
                <RoleButton active={role === "teacher"} onClick={() => setRole("teacher")} icon={UserCheck}>
                  Öğretmen
                </RoleButton>
                <RoleButton active={role === "admin"} onClick={() => setRole("admin")} icon={Shield}>
                  Admin
                </RoleButton>
              </div>
            </div>

            {/* Form - Kompakt */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#044c5c] block">Ad Soyad</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <User className="h-4 w-4 text-[#33a393] group-focus-within:text-[#21817c] transition-colors duration-200" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Ad ve soyadınızı giriniz"
                      className={`w-full pl-10 pr-3 py-2.5 border-2 ${
                        errors.fullName
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#33a393]/20 focus:border-[#33a393]"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33a393]/20 bg-white/90 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 text-[#044c5c] font-medium text-sm`}
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 font-medium mt-1 ml-1">{errors.fullName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#044c5c] block">E-posta</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-4 w-4 text-[#33a393] group-focus-within:text-[#21817c] transition-colors duration-200" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-posta adresinizi giriniz"
                      className={`w-full pl-10 pr-3 py-2.5 border-2 ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-[#33a393]/20 focus:border-[#33a393]"
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33a393]/20 bg-white/90 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 text-[#044c5c] font-medium text-sm`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium mt-1 ml-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#044c5c] block">Şifre</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-4 w-4 text-[#33a393] group-focus-within:text-[#21817c] transition-colors duration-200" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Güçlü bir şifre oluşturun"
                    className={`w-full pl-10 pr-10 py-2.5 border-2 ${
                      errors.password
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#33a393]/20 focus:border-[#33a393]"
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#33a393]/20 bg-white/90 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 text-[#044c5c] font-medium text-sm`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#33a393] hover:text-[#21817c] transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-xs text-red-500 font-medium mt-1 ml-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox - Kompakt */}
              <div className="bg-gradient-to-r from-[#33a393]/5 to-[#21817c]/5 rounded-xl p-3 border border-[#33a393]/20">
                <div className="flex items-start gap-3">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-5 h-5 text-[#33a393] bg-white border-2 border-[#33a393]/50 rounded focus:ring-[#33a393] focus:ring-2 transition-all duration-200"
                      {...register("terms")}
                      onChange={(e) => {
                        register("terms").onChange(e)
                        handleTermsChange(e)
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="terms" className="text-[#044c5c] font-medium cursor-pointer leading-relaxed text-sm">
                      <span className="text-[#33a393] hover:text-[#21817c] hover:underline transition-all duration-200 font-semibold">
                        Kullanım koşullarını
                      </span>{" "}
                      ve{" "}
                      <span className="text-[#33a393] hover:text-[#21817c] hover:underline transition-all duration-200 font-semibold">
                        gizlilik politikasını
                      </span>{" "}
                      okudum ve kabul ediyorum
                    </label>
                    {errors.terms && <p className="text-xs text-red-500 font-medium mt-1">{errors.terms.message}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button - Kompakt */}
              <button
                type="submit"
                disabled={isSubmitting || !isTermsAccepted}
                className="w-full group bg-gradient-to-r from-[#33a393] to-[#21817c] hover:from-[#21817c] hover:to-[#156b6c] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Kayıt Olunuyor...
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4" />
                      Hesap Oluştur
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </form>

            {/* Footer - Kompakt */}
            <div className="mt-4 text-center">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="h-px bg-gradient-to-r from-transparent via-[#33a393]/30 to-transparent flex-1"></div>
                <span className="text-xs text-[#2d6c74] font-semibold bg-white/80 px-3 py-1 rounded-full">veya</span>
                <div className="h-px bg-gradient-to-r from-transparent via-[#33a393]/30 to-transparent flex-1"></div>
              </div>

              <p className="text-[#2d6c74] text-sm">
                Zaten hesabın var mı?{" "}
                <Link
                  to="/login"
                  className="text-[#33a393] hover:text-[#21817c] font-bold hover:underline transition-all duration-200"
                >
                  Giriş Yap
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 w-3 h-3 bg-gradient-to-r from-[#33a393] to-[#21817c] rounded-full opacity-60 animate-pulse hidden lg:block"></div>
      <div className="absolute top-1/3 right-12 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 animate-pulse delay-1000 hidden lg:block"></div>
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-50 animate-pulse delay-500 hidden lg:block"></div>
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-45 animate-pulse delay-700 hidden lg:block"></div>
    </div>
  )
}

export default RegisterForm