import React from "react";
import { useAuth } from "../../context/AuthContext";

const AdminHomePage = () => {
  const { user } = useAuth();

  return (
    <div className="text-center mt-40">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        Hoşgeldiniz, {user.displayName}!
      </h1>
      <p className="text-gray-700 text-2xl max-w-xl mx-auto">
        Bu panelden kullanıcıları, quizleri ve sistem ayarlarını yönetebilirsiniz. 
        Sol menüden dilediğiniz bölüme geçiş yapabilirsiniz.
      </p>
    </div>
  );
};

export default AdminHomePage;
