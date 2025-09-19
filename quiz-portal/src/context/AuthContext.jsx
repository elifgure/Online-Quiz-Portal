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
          let userData = null;

          // Önce admin mi diye kontrol et
          const adminRef = doc(db, "admins", firebaseUser.uid);
          const adminSnap = await getDoc(adminRef);

          if (adminSnap.exists()) {
            role = "admin";
            userData = adminSnap.data();
          } else {
            // Admin değilse öğretmen mi diye kontrol et
            const teacherRef = doc(db, "teachers", firebaseUser.uid);
            const teacherSnap = await getDoc(teacherRef);

            if (teacherSnap.exists()) {
              role = "teacher";
              userData = teacherSnap.data();
            } else {
              // Öğrenci mi diye kontrol et
              const studentRef = doc(db, "students", firebaseUser.uid);
              const studentSnap = await getDoc(studentRef);
              if (studentSnap.exists()) {
                role = "student";
                userData = studentSnap.data();
              }
            }
          }

          const finalUserData = {
            ...userData, // Firestore'dan gelen veriler
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData?.displayName,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL || userData?.photoURL,
            phoneNumber: firebaseUser.phoneNumber,
            createdAt: firebaseUser.metadata.creationTime,
            lastLoginAt: firebaseUser.metadata.lastSignInTime,
            providerData: firebaseUser.providerData,
            role: role, 
          };

          setUser(finalUserData);
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
    userName: user?.displayName,
    userId: user?.uid,
    role: user?.role || null,
    isAdmin: user?.role === "admin",
    adminPermissions: user?.permissions || [],
    adminSince: user?.createdAt || null,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
