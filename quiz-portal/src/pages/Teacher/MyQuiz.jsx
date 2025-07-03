import { useEffect, useState } from "react";
import { getQuizzesByUser, deleteQuizById } from "../../features/Quizzes/quizService";
import { useAuth } from "../../context/AuthContext";
import { Loader2, FileText, Trash2, Eye, Pencil } from "lucide-react";
import SingleQuiz from "../../components/Teacher/SingleQuiz";

const MyQuiz = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    if (user) {
      getQuizzesByUser(user.uid).then((data) => {
        setQuizzes(data);
        setLoading(false);
      });
    }
  }, [user]);

  const handleDelete = async (quizId) => {
    setDeletingId(quizId);
    const result = await deleteQuizById(quizId);
    if (result.success) {
      setQuizzes((prev) => prev.filter((q) => q.id !== quizId));
    } else {
      alert("Quiz silinemedi: " + result.error);
    }
    setDeletingId(null);
  };

  if (selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 py-12 px-4">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="mb-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow"
        >
          ← Geri
        </button>
        <SingleQuiz quiz={selectedQuiz} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="animate-spin w-10 h-10 text-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#044c5c] mb-8 text-center">Oluşturduğum Quizler</h2>
        {quizzes.length === 0 ? (
          <div className="bg-white/80 rounded-2xl shadow-lg p-10 text-center text-[#37747c]">
            Henüz hiç quiz oluşturmadınız.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white/90 rounded-2xl shadow-md p-6 flex flex-col gap-4 border border-purple-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-purple-500" />
                  <h3 className="text-xl font-semibold text-[#044c5c]">{quiz.title}</h3>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    disabled={deletingId === quiz.id}
                    className="ml-auto p-2 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"
                    title="Quiz'i Sil"
                  >
                    {deletingId === quiz.id ? (
                      <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="w-5 h-5 text-red-500" />
                    )}
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 text-[#37747c] text-sm">
                  <span className="bg-purple-50 px-3 py-1 rounded-lg">
                    Süre: <span className="font-bold">{quiz.duration}</span> dk
                  </span>
                  <span className="bg-pink-50 px-3 py-1 rounded-lg">
                    Soru Sayısı: <span className="font-bold">{quiz.elements?.length || 0}</span>
                  </span>
                  <span className="bg-green-50 px-3 py-1 rounded-lg">
                    Kategori: <span className="font-bold">{quiz.category || "-"}</span>
                  </span>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => alert(`Düzenle: ${quiz.title}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 font-semibold shadow hover:shadow-md"
                  >
                    <Pencil className="w-4 h-4" />
                    Düzenle
                  </button>
                  <button
                    onClick={() => setSelectedQuiz(quiz)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-200 text-[#044c5c] rounded-lg hover:bg-purple-50 transition-all duration-200 font-medium shadow"
                  >
                    <Eye className="w-4 h-4 text-purple-500" />
                    Detay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyQuiz;
