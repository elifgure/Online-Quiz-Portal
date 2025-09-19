import React from 'react';
import QuizForm from '../Forms/FormCreate'; 

const AdminQuizForm = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-purple-200 p-6">
          <QuizForm />
        </div>
      </div>
    </div>
  );
};

export default AdminQuizForm;