import { BarChart3, Pencil, LogOut, User, BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Layout/Header";
import { useAuth } from "../context/AuthContext";
import { getRecentActivities, getResultsByStudent } from "../features/Quizzes/resultService";

const StudentLayout = () => {
  const { user } = useAuth();
  const [averageScore, setAverageScore] = useState(0);
  const [results, setResults] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Aktiviteleri formatla
  const formatTimeAgo = (date) => {
    if (!date) return "";
    
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} gün önce`;
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} saat önce`;
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} dakika önce`;
    
    return "Az önce";
  };

  // Tüm fetch işlemlerini tek bir useEffect'te toplayalım
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Sonuçları ve aktiviteleri paralel olarak çekelim
        const [studentResults, activities] = await Promise.all([
          getResultsByStudent(user.uid),
          getRecentActivities(user.uid)
        ]);



        // Sonuçları işle
        if (studentResults.length > 0) {
          const totalScore = studentResults.reduce((acc, result) => {
            const percentage = (result.score / result.totalQuestions) * 100;
            return acc + percentage;
          }, 0);
          setAverageScore(Math.round(totalScore / studentResults.length));
        }
        setResults(studentResults);

        // Aktiviteleri formatla ve state'e kaydet
        if (activities?.length > 0) {
          const formattedActivities = activities.map(activity => ({
            id: activity.id,
            activity: `${activity.quizTitle}  Sınavı Tamamlandı`,
            time: formatTimeAgo(activity.createdAt),
            score: `${Math.round((activity.score / activity.totalQuestions) * 100)}%`,
            color: getScoreColor(activity.score / activity.totalQuestions),
            createdAt: activity.createdAt
          }));
          setRecentActivities(formattedActivities);
        }

      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
// cleanup function
    return () => {
      setResults([]);
      setRecentActivities([]);
      setAverageScore(0);
    };
  }, [user?.uid]); 

  
  const getScoreColor = (percentage) => {
    if (percentage >= 0.8) return "purple";
    if (percentage >= 0.6) return "orange";
    return "pink";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#044c5c] text-lg font-medium">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    {
      title: "Sınavlarım",
      icon: Pencil,
      path: "/student-quizzes",
    },
    {
      title: "Raporlarım",
      icon: BarChart3,
      path: "/results",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl"></div>

        {/* Welcome Section */}
        <div className="mb-8 relative z-10">
          <h2 className="text-4xl font-bold text-[#044c5c] mb-2">
            Hoş Geldiniz! 👋 
          </h2>
          <p className="text-[#2d6c74] text-lg mt-2">
            Sınavlarınızı yönetin ve raporlarınızı inceleyin.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-purple-200 hover:border-purple-400 hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${
                      index === 0
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-orange-500 to-red-500"
                    } p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className={`w-2 h-2 ${
                        index === 0 ? "bg-purple-500" : "bg-orange-500"
                      } rounded-full`}
                    ></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#044c5c] mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#37747c] text-sm">
                  {item.title === "Sınavlarım"
                    ? "Sınavlarınızı görüntüleyin ve yönetin"
                    : "Performans raporlarınızı inceleyin"}
                </p>
              </div>
              <div
                className={`h-1 ${
                  index === 0
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-orange-500 to-red-500"
                } rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              ></div>
            </Link>
          ))}

          {/* Quick Stats Card */}
          <div className="bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-white hover:-translate-y-2">
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {results.length > 0 ? `${averageScore}%` : "Henüz sınav yok"}
                  </div>
                  <div className="text-sm opacity-90">
                    {results.length} Sınav
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Genel Başarı</h3>
              <p className="text-white/90 text-sm">
                {results.length > 0
                  ? `${results.length} sınavdaki genel performansınız`
                  : "Henüz sınav sonucunuz bulunmuyor"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 relative z-10">
          <h3 className="text-2xl font-bold text-[#044c5c] mb-6">
            Son Aktiviteler
          </h3>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200">
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-purple-50 transition-colors duration-200 border border-purple-100"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 ${
                            item.color === "purple"
                              ? "bg-purple-500"
                              : item.color === "orange"
                              ? "bg-orange-500"
                              : "bg-pink-500"
                          } rounded-full`}
                        ></div>
                        <div>
                          <p className="font-medium text-[#044c5c]">
                            {item.activity}
                          </p>
                          <p className="text-sm text-[#37747c]">{item.time}</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.score}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    Henüz aktivite bulunmuyor
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
