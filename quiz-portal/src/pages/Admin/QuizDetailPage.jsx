import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fireBase";
import { useEffect, useState } from "react";

const QuizDetailPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const docRef = doc(db, "quizzes", quizId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setQuiz({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Quiz yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const renderQuestion = (question, index) => {
    switch (question.type) {
      case "shortText":
        return (
          <div key={question.id} className="border p-4 rounded-lg bg-white/80 shadow-sm">
            <p className="font-medium mb-3 text-[#044c5c]">
              Soru {index + 1}: {question.label}
            </p>
            <div className="ml-4 p-2 bg-green-50 rounded-md">
              <p className="text-sm text-gray-700">
                Doğru Cevap: <span className="text-green-700 font-medium">{question.answer}</span>
              </p>
            </div>
          </div>
        );

      case "longText":
        return (
          <div key={question.id} className="border p-4 rounded-lg bg-white/80 shadow-sm">
            <p className="font-medium mb-3 text-[#044c5c]">
              Soru {index + 1}: {question.label}
            </p>
            <div className="ml-4 p-2 bg-green-50 rounded-md">
              <p className="text-sm text-gray-700">
                Örnek Cevap:
                <span className="block mt-1 text-green-700 font-medium whitespace-pre-line">
                  {question.answer}
                </span>
              </p>
            </div>
          </div>
        );

      case "multiChoice":
        return (
          <div key={question.id} className="border p-4 rounded-lg bg-white/80 shadow-sm">
            <p className="font-medium mb-3 text-[#044c5c]">
              Soru {index + 1}: {question.label}
            </p>
            <div className="ml-4">
              {question.options.map((option, i) => (
                <div 
                  key={i}
                  className={`p-2 mb-2 rounded-md ${
                    Number(question.answer) === i 
                      ? 'bg-green-50 text-green-700 font-medium'
                      : 'bg-gray-50'
                  }`}
                >
                  {String.fromCharCode(65 + i)}. {option}
                  {Number(question.answer) === i && 
                    <span className="ml-2 text-xs bg-green-200 px-2 py-0.5 rounded-full">
                      Doğru Cevap
                    </span>
                  }
                </div>
              ))}
            </div>
          </div>
        );

      case "boolean":
        return (
          <div key={question.id} className="border p-4 rounded-lg bg-white/80 shadow-sm">
            <p className="font-medium mb-3 text-[#044c5c]">
              Soru {index + 1}: {question.label}
            </p>
            <div className="ml-4 flex gap-4">
              <div
                className={`px-4 py-2 rounded-md ${
                  question.answer === 'true'
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'bg-gray-50'
                }`}
              >
                Doğru
                {question.answer === 'true' && 
                  <span className="ml-2 text-xs bg-green-200 px-2 py-0.5 rounded-full">
                    Doğru Cevap
                  </span>
                }
              </div>
              <div
                className={`px-4 py-2 rounded-md ${
                  question.answer === 'false'
                    ? 'bg-red-50 text-red-700 font-medium'
                    : 'bg-gray-50'
                }`}
              >
                Yanlış
                {question.answer === 'false' && 
                  <span className="ml-2 text-xs bg-red-200 px-2 py-0.5 rounded-full">
                    Doğru Cevap
                  </span>
                }
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#33a393] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center py-8 text-gray-500">
        Quiz bulunamadı
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Quiz Başlık ve Bilgileri */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-[#044c5c]">{quiz.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p className="flex items-center text-gray-600">
            <span className="font-medium mr-2">Kategori:</span>
            {quiz.category || "Belirtilmemiş"}
          </p>
          <p className="flex items-center text-gray-600">
            <span className="font-medium mr-2">Süre:</span>
            {quiz.duration} dakika
          </p>
        </div>
      </div>

      {/* Sorular */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-6 text-[#044c5c]">Sorular</h3>
        <div className="space-y-4">
          {quiz.elements && quiz.elements.length > 0 ? (
            quiz.elements.map((question, index) => renderQuestion(question, index))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Bu quizde henüz soru bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetailPage;