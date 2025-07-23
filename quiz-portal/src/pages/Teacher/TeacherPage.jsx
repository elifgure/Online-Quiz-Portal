import React from 'react';
import Header from '../../components/Layout/Header'; // Import Header directly
import TeacherDashboard from '../../components/Teacher/TeacherDashboard';

const TeacherPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-gray-100">
      <Header />
      <div className="p-8">
        <TeacherDashboard />
      </div>
    </div>
  );
};

export default TeacherPage;
