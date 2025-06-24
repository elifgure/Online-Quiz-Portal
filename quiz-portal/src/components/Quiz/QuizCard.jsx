import React, { useState } from "react";
import Header from "../Layout/Header";
import { Clock, Search, Star, Trophy, Users } from "lucide-react";
import { quizMockData } from "../../data/quizMockData";

const QuizCard = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
   const filteredQuizzes = quizMockData.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || quiz.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-orange-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#044c5c] via-[#2d6c74] to-[#37747c] bg-clip-text text-transparent mb-4 leading-tight">
              QuizPortal
            </h1>
            <p className="text-xl sm:text-2xlbg-gradient-to-r from-[#044c5c] via-purple-600 to-orange-500 bg-clip-text mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Bilginizi test edin, yeteneklerinizi keşfedin ve
              <span className="bg-gradient-to-r from-[#044c5c] via-purple-600 to-orange-500 bg-clip-text font-semibold">
                {" "}
                kendinize meydan okuyun.
              </span>
            </p>
            <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/30 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <Search className="text-[#2d6c74] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Quiz ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-[#044c5c] placeholder-[#2d6c74] outline-none text-lg"
                />
              </div>
            </div>
          </div>
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {quizMockData.map((quiz) => (
              <button
                key={quiz.category}
                onClick={() => setSelectedCategory(quiz.category)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategory === quiz.category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl border-2 border-purple-600 scale-105"
                    : "bg-white/60 backdrop-blur-sm text-[#044c5c] hover:bg-white/80 border border-purple-400/30 shadow-lg hover:shadow-xl"
                }`}
              >
                {quiz.category}
              </button>
            ))}
          </div>
      {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-purple-200 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              {/* Category Badge */}
              <div className={`inline-block px-4 py-2 rounded-2xl text-white text-sm font-semibold mb-4  bg-[#1a6b7daf] ${quiz.category || 'from-gray-500 to-gray-600'} group-hover:scale-110 transition-transform duration-300`}>
                {quiz.category}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#044c5c] mb-3 group-hover:text-purple-600 transition-colors">
                {quiz.title}
              </h3>

              {/* Description */}
              <p className="text-[#2d6c74] mb-4 leading-relaxed line-clamp-1">
                {quiz.description}
              </p>

              {/* Quiz Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#37747c]" />
                    <span className="text-sm text-[#2d6c74]">{quiz.duration}</span>
                  </div>
                  
                </div>

                <div className="flex items-center justify-between">
                  {/* <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#37747c]" />
                    <span className="text-sm text-[#2d6c74]">{quiz.participants.toLocaleString()} katılımcı</span>
                  </div> */}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-[#044c5c]">{quiz.rating}</span>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button className="group w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-purple-600 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Quiz'i Başlat
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredQuizzes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-[#044c5c] mb-2">Quiz bulunamadı</h3>
            <p className="text-[#2d6c74]">Arama kriterlerinizi değiştirip tekrar deneyin.</p>
          </div>
        )}

        {/* Floating Cards */}
        <div className="absolute top-1/4 left-8 hidden lg:block z-5 opacity-5">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-purple-400/30 transform rotate-12 hover:rotate-6 transition-transform duration-300">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-2"></div>
            <div className="w-16 h-2 bg-purple-200 rounded"></div>
            <div className="w-12 h-2 bg-pink-200 rounded mt-1"></div>
          </div>
        </div>

        <div className="absolute top-1/3 right-8 hidden lg:block z-5 opacity-5">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-orange-400/30 transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full mb-2"></div>
            <div className="w-16 h-2 bg-orange-200 rounded"></div>
            <div className="w-12 h-2 bg-yellow-200 rounded mt-1"></div>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-1/4 hidden lg:block z-5 opacity-5">
          <div className="bg-white/60 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-blue-400/30 transform rotate-6 hover:rotate-3 transition-transform duration-300">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mb-1"></div>
            <div className="w-12 h-1.5 bg-blue-200 rounded"></div>
            <div className="w-8 h-1.5 bg-cyan-200 rounded mt-0.5"></div>
          </div>
        </div>
      </div>


    </div>
    </>
  );
}
export default QuizCard;
