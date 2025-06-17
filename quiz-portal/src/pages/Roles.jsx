import React from "react";
import Header from "../components/Layout/Header";
import { UserCog, GraduationCap, School, Shield } from "lucide-react";

const RoleCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 cursor-pointer group">
      <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-sm text-gray-600 text-center">{description}</p>
    </div>
  );
};

const Roles = () => {
  const roles = [
    {
      icon: Shield,
      title: "Admin",
      description: "Sistem yönetimi ve tam kontrol yetkisi",
    },
    {
      icon: School,
      title: "Öğretmen",
      description: "Quiz oluşturma ve öğrenci takibi",
    },
    {
      icon: GraduationCap,
      title: "Öğrenci",
      description: "Quizlere katılım ve gelişim takibi",
    },
    {
      icon: UserCog,
      title: "Yönetici",
      description: "Kullanıcı yönetimi ve içerik denetimi",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Hesap Türünü Seçin
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Lütfen sisteme giriş yapmak için rolünüzü seçin
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roles.map((role, index) => (
            <RoleCard
              key={index}
              icon={role.icon}
              title={role.title}
              description={role.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roles;
