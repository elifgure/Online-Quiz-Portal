import { useEffect, useState } from "react";
import { getQuizzesByUser } from "../../features/Quizzes/quizService";
import { useAuth } from "../../context/AuthContext";

const MyQuiz = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (user) {
      getQuizzesByUser(user.uid).then(setQuizzes);
    }
  }, [user]);

  return (
    <div>
      <h2>Oluşturduğum Quizler</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>{quiz.title} - Süre: {quiz.duration} dk</li>
        ))}
      </ul>
    </div>
  );
};

export default MyQuiz;
