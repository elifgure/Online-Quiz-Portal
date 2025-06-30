import React from 'react';
import Header from '../../components/Layout/Header'; // Import Header directly
import TeacherDashboard from '../../components/Teacher/TeacherDashboard';

const TeacherPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-rose-50/50">
      <Header />
      <div className="p-8">
        <TeacherDashboard />
      </div>
    </div>
  );
};

export default TeacherPage;
