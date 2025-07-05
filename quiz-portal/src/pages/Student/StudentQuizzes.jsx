import { BookOpen, Clock, Play } from "lucide-react";
import React from "react";

const StudentQuizzesPage = () => {
  const Header = () => (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#044c5c] to-purple-600 bg-clip-text text-transparent">
              Öğrenci Paneli
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-purple-100 rounded-full px-4 py-2">
              <span className="text-[#044c5c] font-medium">Öğrenci</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const availableQuizzes = [
    {
      id: 1,
      title: "Matematik Quiz",
      category: "Matematik",
      duration: "30 dk",
      description: "Türev ve integral konularını içeren quiz"
    },
    {
      id: 2,
      title: "Fizik Quiz",
      category: "Fizik", 
      duration: "45 dk",
      description: "Mekanik ve hareket konularından sorular"
    },
    {
      id: 3,
      title: "Kimya Quiz",
      category: "Kimya",
      duration: "25 dk",
      description: "Organik kimya ve reaksiyonlar"
    },
    {
      id: 4,
      title: "Biyoloji Quiz",
      category: "Biyoloji",
      duration: "35 dk",
      description: "Hücre biyolojisi ve genetik"
    },
    {
      id: 5,
      title: "Tarih Quiz",
      category: "Tarih",
      duration: "40 dk",
      description: "Osmanlı İmparatorluğu dönemi"
    },
    {
      id: 6,
      title: "Coğrafya Quiz",
      category: "Coğrafya",
      duration: "30 dk",
      description: "Fiziki coğrafya ve iklim"
    }
  ];

  const getCategoryColor = (index) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-orange-500 to-red-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Background Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl"></div>

        {/* Page Header */}
        <div className="mb-8 relative z-10">
          <div className="flex items-center mb-4">
            <button className="text-[#2d6c74] hover:text-purple-600 transition-colors duration-200 mr-4">
              ← Geri Dön
            </button>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#044c5c] via-purple-600 to-orange-500 bg-clip-text text-transparent mb-2">
            Mevcut Sınavlar 📚
          </h2>
          <p className="text-[#2d6c74] text-lg">
            Öğretmeniniz tarafından hazırlanan sınavları görüntüleyin ve başlatın.
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {availableQuizzes.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-purple-200 hover:border-purple-400 hover:-translate-y-2"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${getCategoryColor(index)} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-2 h-2 ${index % 2 === 0 ? 'bg-purple-500' : 'bg-orange-500'} rounded-full`}></div>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-[#044c5c] mb-2 group-hover:text-purple-600 transition-colors duration-300">
                  {quiz.title}
                </h3>
                <p className="text-[#37747c] text-sm mb-4">
                  {quiz.description}
                </p>

                {/* Quiz Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <span className="text-[#37747c] text-sm">Kategori:</span>
                    </div>
                    <span className="font-medium text-[#044c5c]">{quiz.category}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span className="text-[#37747c] text-sm">Süre:</span>
                    </div>
                    <span className="font-medium text-[#044c5c]">{quiz.duration}</span>
                  </div>
                </div>

                {/* Start Quiz Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105">
                  <Play className="h-4 w-4" />
                  <span>Quizi Başlat</span>
                </button>
              </div>
              
              {/* Bottom accent */}
              <div className={`h-1 bg-gradient-to-r ${getCategoryColor(index)} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentQuizzesPage;