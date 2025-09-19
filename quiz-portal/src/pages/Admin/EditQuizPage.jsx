import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/fireBase';
import { setQuizForEdit } from '../../redux/slices/quizFormSlice';
import { Loader2 } from 'lucide-react';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetQuiz = async () => {
      try {
        const quizDoc = await getDoc(doc(db, "quizzes", quizId));
        if (quizDoc.exists()) {
          const quizData = {
            ...quizDoc.data(),
            id: quizDoc.id
          };
          dispatch(setQuizForEdit(quizData));
          navigate('/admin/quiz-form'); // Admin için doğru path'e yönlendir
        } else {
          console.error("Quiz bulunamadı");
          navigate('/admin/quizzes');
        }
      } catch (error) {
        console.error("Quiz yüklenirken hata:", error);
        navigate('/admin/quizzes');
      }
    };

    fetchAndSetQuiz();
  }, [quizId, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin w-10 h-10 text-purple-500" />
    </div>
  );
};

export default EditQuizPage;