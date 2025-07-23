import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/fireBase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          let role = null;

          // Önce öğretmen mi diye kontrol et
          const teacherRef = doc(db, "teachers", firebaseUser.uid);
          const teacherSnap = await getDoc(teacherRef);

          if (teacherSnap.exists()) {
            role = "teacher";
          } else {
            // Öğrenci mi diye kontrol et
            const studentRef = doc(db, "students", firebaseUser.uid);
            const studentSnap = await getDoc(studentRef);
            if (studentSnap.exists()) {
              role = "student";
              // const studentData = studentSnap.data();
              // userData.name = studentData.name;
            }
          }

          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL,
            phoneNumber: firebaseUser.phoneNumber,
            createdAt: firebaseUser.metadata.creationTime,
            lastLoginAt: firebaseUser.metadata.lastSignInTime,
            providerData: firebaseUser.providerData,
            role: role, 
          };

          setUser(userData);
        } catch (err) {
          console.error("Kullanıcı rolü alınamadı:", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isEmailVerified: user?.emailVerified || false,
    userEmail: user?.email,
    userName: user?.name || user?.displayName,
    userId: user?.uid,
    role: user?.role || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
