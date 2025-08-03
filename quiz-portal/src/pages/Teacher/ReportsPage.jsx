import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  fetchAllResults,
  fetchStudentResults,
} from "../../redux/slices/resultsSlice";
import Header from "../../components/Layout/Header";
import StudentReports from "../../components/Teacher/StudentReports";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const { user, role } = useAuth();

  const {
    items: results,
    status,
    error,
  } = useSelector((state) => state.results);

  useEffect(() => {
    
  }, [results]);

  useEffect(() => {
    if (role === "teacher") {
      dispatch(fetchAllResults());
    } else if (role === "student") {
      dispatch(fetchStudentResults(user?.uid));
    }
  }, [dispatch, role, user?.uid]);

  // Eğer öğrenci bu sayfaya erişmeye çalışırsa yönlendir
  if (role === 'student') {
    return <Navigate to="/results" replace />;
  }

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem 3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e2e8f0',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <div style={{
            fontSize: '1.1rem',
            color: '#1e293b',
            fontWeight: '600'
          }}>
            Raporlar yükleniyor...
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '2rem 3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          border: '2px solid rgba(239, 68, 68, 0.2)'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem'
          }}>⚠️</div>
          <div style={{
            fontSize: '1.1rem',
            color: '#dc2626',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            Bir Hata Oluştu
          </div>
          <div style={{
            color: '#64748b',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <Header />
      
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 0 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '50%',
          backdropFilter: 'blur(10px)'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <h1 style={{
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '1rem',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              📊 {role === 'teacher' ? 'Öğrenci Raporları' : 'Sonuçlarım'}
            </h1>
            <p style={{
              fontSize: '1.2rem',
              opacity: '0.9',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {role === 'teacher' 
                ? 'Tüm öğrencilerinizin quiz performanslarını detaylı şekilde inceleyin'
                : 'Quiz sonuçlarınızı ve performansınızı takip edin'
              }
            </p>
            
            {/* Stats Cards */}
            <div style={{
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              marginTop: '3rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                minWidth: '120px'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {results?.length || 0}
                </div>
                <div style={{ fontSize: '0.9rem', opacity: '0.9' }}>
                  Toplam Rapor
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{
        marginTop: '-3rem',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {results?.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#1e293b',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Henüz Rapor Yok
              </h3>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>
                {role === 'teacher' 
                  ? 'Öğrencileriniz quiz çözmeye başladığında raporlar burada görünecek.'
                  : 'Quiz çözmeye başladığınızda sonuçlarınız burada görünecek.'
                }
              </p>
            </div>
          ) : (
            <div style={{
              background: 'rgba(255,255,255,0.6)',
              borderRadius: '24px',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid rgba(148, 163, 184, 0.2)'
              }}>
                <div style={{
                  width: '4px',
                  height: '24px',
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  borderRadius: '2px'
                }}></div>
                <h2 style={{
                  fontSize: '1.5rem',
                  color: '#1e293b',
                  fontWeight: '600',
                  margin: 0
                }}>
                  Rapor Listesi
                </h2>
                <div style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  {results?.length} rapor
                </div>
              </div>
              
              <div className="space-y-4">
                {results.map(result => (
                  <StudentReports key={result.id} result={result} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .space-y-4 > * + * {
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ReportsPage;