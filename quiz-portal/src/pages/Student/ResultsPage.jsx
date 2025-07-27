import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import ResultDetails from "../../components/Student/ResultDetails";
import { Award, Calendar, BookOpen, Target } from "lucide-react";
import Header from "../../components/Layout/Header";
import { fetchStudentResults } from "../../redux/slices/resultsSlice";

const ResultsPage = () => {
  const { userId } = useAuth();
  const {
    items: results,
    status,
    error,
  } = useSelector((state) => state.results);

  const dispatch = useDispatch();
  const [openDetailsId, setOpenDetailsId] = useState(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchStudentResults(userId));
    }
  }, [dispatch, userId]);

  const toggleDetails = (id) => {
    setOpenDetailsId(openDetailsId === id ? null : id);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[#37747c] text-lg">Sonuçlar Yükleniyor...</div>
      </div>
    );
  }
  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Hata: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-8 h-8 text-purple-500" />
          <h2 className="text-2xl font-bold text-[#044c5c]">Sonuçlarım</h2>
        </div>

        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white/90 rounded-2xl shadow-lg p-6 border border-purple-100"
            >
              <div
                onClick={() => toggleDetails(result.id)}
                className="cursor-pointer hover:bg-purple-50/30 rounded-lg p-4 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-purple-500" />
                    <h3 className="text-xl font-bold text-[#044c5c]">
                      {result.quizTitle}
                    </h3>
                  </div>
                  <span className="bg-purple-50 px-3 py-1 rounded-lg text-[#37747c] text-sm">
                    {result.category}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#37747c]" />
                    <span className="text-[#044c5c]">
                      <strong>Puan:</strong> {result.score} /{" "}
                      {result.totalQuestions}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#37747c]" />
                    <span className="text-[#044c5c]">
                      <strong>Tarih:</strong>{" "}
                      {result.createdAt
                        ? new Date(result.createdAt).toLocaleString()
                        : "Tarih bulunamadı"}
                    </span>
                  </div>
                </div>

                <div className="text-purple-600 hover:text-purple-700 font-medium underline">
                  Detayları {openDetailsId === result.id ? "Gizle" : "Göster"}
                </div>
              </div>

              {openDetailsId === result.id && <ResultDetails result={result} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
