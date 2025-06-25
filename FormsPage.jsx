import React from "react";
import FormBuilder from "../components/Forms/FormBuilder";

const FormsPage = () => {
  return (
    <>
     <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
            >
              QuizPortal
            </a>
          </div>
          <div>
            <a
              href="/auth/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Oturum Aç
            </a>
          </div>
        </div>
      </div>
    </header>
    <FormBuilder />
    </>
   
  
  );
};

export default FormsPage;
