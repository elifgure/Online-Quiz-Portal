import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        QuizPortal
      </Link>

      <nav className="hidden sm:flex gap-4">
        <Link
          to="/quizzes"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Quizlere Göz At
        </Link>
        <Link
          to="/auth/login"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Giriş Yap
        </Link>
        <Link
          to="/auth/register"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Kayıt Ol
        </Link>
      </nav>
    </header>
  );
};

export default Header;
