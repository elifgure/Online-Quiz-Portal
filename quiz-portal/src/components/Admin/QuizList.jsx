import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllQuizzes,
  deleteQuizById,
} from "../../features/Quizzes/quizService";
import { Eye, Trash2 } from "lucide-react";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await getAllQuizzes();
      setQuizzes(quizzes);
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quiz) => {
    const confirmDelete = window.confirm(`"${quiz.title}" quizi silinsin mi?`);
    if (!confirmDelete) return;

    try {
      await deleteQuizById(quiz.id);
      setQuizzes((prev) => prev.filter((q) => q.id !== quiz.id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 p-6">
      {/* Başlık */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#044c5c]">Quiz Yönetimi</h2>
        <Link
          to="/create-quiz2"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          + Yeni Quiz
        </Link>
      </div>

      {/* Sonuç Sayısı */}
      <div className="mb-4">
        <p className="text-sm text-[#37747c]">{quizzes.length} quiz bulundu</p>
      </div>

      {/* Tablo Container */}
      <div className="overflow-x-auto rounded-lg border border-purple-200 z-0">
        <table className="min-w-full bg-white/50">
          <thead className="bg-gradient-to-r from-purple-50 to-orange-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Başlık
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Kategori
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Süre
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Soru Sayısı
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                Öğretmen
              </th>
              <th className="py-3 px-4 text-center text-sm font-semibold text-[#044c5c] border-b border-purple-200">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {quizzes.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-gray-500">
                  Quiz bulunamadı
                </td>
              </tr>
            ) : (
              quizzes.map((quiz, index) => (
                <tr
                  key={quiz.id}
                  className={`hover:bg-gradient-to-r hover:from-purple-25 hover:to-orange-25 transition-all duration-200 ${
                    index % 2 === 0 ? "bg-white/30" : "bg-white/60"
                  }`}
                >
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {quiz.title}
                  </td>
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {quiz.category || "-"}
                  </td>
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {quiz.duration} dk
                  </td>
                  <td className="py-3 px-10 text-[#2d6c74] border-b border-purple-100 ">
                    {quiz.elements?.length || 0}
                  </td>
                  <td className="py-3 px-4 text-[#2d6c74] border-b border-purple-100">
                    {quiz.createdBy?.displayName || "-"}
                  </td>
                  <td className="py-3 px-4 border-b border-purple-100">
                    <div className="flex items-center  justify-center gap-6">
                      <Link
                        to={`/admin/quizzes/detail/${quiz.id}`}
                        className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-medium transition-colors duration-200"
                        title="Detayları Görüntüle"
                      >
                        <Eye size={16} />
                        <span>Detay</span>
                      </Link>
                      <Link
                        to={`/admin-quizzes/edit/${quiz.id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                        title="Quiz'i Düzenle"
                      >
                        <span>Düzenle</span>
                      </Link>
                      <button
                        onClick={() => handleDeleteQuiz(quiz)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors duration-200"
                        title="Quiz'i Sil"
                      >
                        <Trash2 size={16} />
                        <span>Sil</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuizList;
