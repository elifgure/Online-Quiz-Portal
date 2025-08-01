import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuizzes } from "../../features/Quizzes/quizService";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzes = await getAllQuizzes();
      setQuizzes(quizzes);
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#2d6c74]">Quiz Yönetimi</h2>
        <Link
          to="/admin-quizzes/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Yeni Quiz
        </Link>
      </div>
      <table className="w-full table-auto bg-white rounded shadow">
        <thead>
          <tr className="bg-[#f1f5f9] text-left">
            <th className="p-3">Başlık</th>
            <th className="p-3">Kategori</th>
            <th className="p-3">Süre</th>
            <th className="p-3">Soru Sayısı</th>
            <th className="p-3">Öğretmen</th>
            <th className="p-3">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{quiz.title}</td>
              <td className="p-3">{quiz.category || "-"}</td>
              <td className="p-3">{quiz.duration} dk</td>
              <td className="p-3">{quiz.elements?.length || 0}</td>
              <td className="p-3">{quiz.createdBy?.displayName || "-"}</td>
              <Link
                to={`/admin-quizzes/edit/${quiz.id}`}
                className="text-blue-600"
              >
                Düzenle
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default QuizList;
