import React from "react";
import {
  PlusCircle,
  Edit,
  ListChecks,
  BarChart2,
  FileText,
} from "lucide-react";

const features = [
  {
    title: "Quiz Oluştur",
    icon: <PlusCircle className="w-10 h-10 text-purple-500" />,
    desc: "Yeni quizler oluşturun ve paylaşın.",
  },
  {
    title: "Quizleri Düzenle",
    icon: <Edit className="w-10 h-10 text-orange-500" />,
    desc: "Mevcut quizlerinizi yönetin ve güncelleyin.",
  },
  {
    title: "Sonuçlar",
    icon: <FileText className="w-10 h-10 text-green-500" />,
    desc: "Kullanıcıların quiz sonuçlarını inceleyin.",
  },
  {
    title: "Performans Raporları",
    icon: <BarChart2 className="w-10 h-10 text-pink-500" />,
    desc: "Quiz ve öğrenci performansını analiz edin.",
  },
];

const TeacherDashboard = () => {
  return (
    <>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-[#044c5c] mb-8 text-center">
          Öğretmen Paneli
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/90 rounded-3xl shadow-xl p-12 flex flex-col items-center border border-purple-200/30 hover:shadow-2xl transition-shadow duration-300 group min-h-[260px]"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-semibold text-[#044c5c] mb-4 text-center">
                {feature.title}
              </h2>
              <p className="text-[#37747c] text-lg text-center">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
