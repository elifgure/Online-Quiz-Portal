import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../lib/fireBase";
// sonuçları kaydetmek için kullanılan fonksiyon
export const saveStudentResult = async (resultData) => {
  try {
    const docRef = await addDoc(collection(db, "results"), {
      ...resultData,

      createdAt: serverTimestamp(),
    });
    return docRef.id; // yeni eklenen belgenin ID'sini döndür
  } catch (error) {
    console.error("Sonuç kaydedilirken hata oluştu:", error);
    throw error;
  }
};
// sonuçları çekmek için kullanılan fonksiyon
export const getResultsByStudent = async (studentId) => {
  try {
    const resultsRef = collection(db, "results");
    const q = query(resultsRef, where("studentId", "==", studentId));

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate()?.toISOString() ||
        new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Sonuçlar getirilemedi:", error);
    return [];
  }
};

// bütün sonuçları çekmek için kullanılan fonksiyon
export const getAllResults = async () => {
  try {
    const resultsRef = collection(db, "results");
    const querySnapshot = await getDocs(resultsRef);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
        createdAt:
          doc.data().createdAt?.toDate()?.toISOString() ||
          new Date().toISOString(),
      });
    });
    return results;
  } catch (error) {
    console.error("Sonuçlar getirilemedi:", error);
    throw error;
  }
};

// aktiviteler için kullanılan fonksiyon
export const getRecentActivities = async (userId) => {
  if (!userId) {
    console.warn("getRecentActivities: userId boş!");
    return [];
  }

  try {
    const resultsRef = collection(db, "results");
    
    // createdAt alanı için composite index gerekiyor
    const q = query(
      resultsRef,
      where("studentId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    const snapshot = await getDocs(q);

    if (!snapshot || snapshot.empty) {
      return [];
    }

    // Firestore timestamp'i düzgün işle
    const activities = snapshot.docs.map(doc => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate?.() || new Date();
      return {
        id: doc.id,
        ...data,
        createdAt
      };
    });
    return activities.sort((a, b) => b.createdAt - a.createdAt); // En yeniden eskiye sırala

  } catch (error) {
    console.error("getRecentActivities hatası:", {
      error,
      message: error.message,
      code: error.code,
      userId
    });
    return [];
  }
};
