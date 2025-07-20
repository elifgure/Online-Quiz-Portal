import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getResultsByStudent } from "../../features/Quizzes/resultService";

const ResultsPage = () => {
  const { userId } = useAuth();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    if (!userId) return;
    const data = await getResultsByStudent(userId);
    setResults(data);
    setLoading(false);
  };
  fetchResults();
  if (loading) return <p>Sonuçlar Yükleniyor...</p>;
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Sonuçlarım</h2>
      <ul className="space-y-4">
        {results.map((result) => (
          <li key={result.id} className="border rounded p-4 shadow">
            <p>
              <strong>Quiz:</strong> {result.quizTitle}
            </p>
            <p>
              <strong>Kategori:</strong> {result.category}
            </p>
            <p>
              <strong>Puan:</strong> {result.score} / {result.total}
            </p>
            <p>
              <strong>Tarih:</strong>{" "}
              {new Date(result.createdAt?.seconds * 1000).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
