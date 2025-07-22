import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import {
  fetchAllResults,
  fetchStudentResults,
} from "../../redux/slices/resultsSlice";
import Header from "../../components/Layout/Header";
import StudentReports from "../../components/Teacher/StudentReports";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const { user, role } = useAuth();
  const {
    items: results,
    status,
    error,
  } = useSelector((state) => state.results);
  useEffect(() => {
    if (role === "teacher") {
      dispatch(fetchAllResults());
    } else if (role === "student") {
      dispatch(fetchStudentResults(user?.uid));
    }
  }, [dispatch, role, user?.uid]);
  // Eğer öğrenci bu sayfaya erişmeye çalışırsa yönlendir
  if (role === 'student') {
    return <Navigate to="/results" replace />;
  }

  if (status === 'loading') {
    return <div className="text-center p-4">Yükleniyor...</div>;
  }

  if (status === 'failed') {
    return <div className="text-red-500 text-center p-4">Hata: {error}</div>;
  }
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {role === 'teacher' ? 'Tüm Öğrenci Raporları' : 'Sonuçlarım'}
        </h1>
        
        <div className="space-y-4">
          {results.map(result => (
            <StudentReports key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
