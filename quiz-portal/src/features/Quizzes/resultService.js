import {
  addDoc,
  collection,
  getDocs,
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
    return docRef.id; // Return the document ID for reference
  } catch (error) {
    console.error("Sonuç kaydedilirken hata oluştu:", error);
    throw error;
  }
};
// sonuçları çekmek için kullanılan fonksiyon
export const getResultsByStudent = async (studentId) => {
  try {
    const resultsRef = collection(db, "results");
    const q = query(
      resultsRef,
      where("studentId", "==", studentId),
     
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
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
    const results = []
    querySnapshot.forEach((doc) =>{
      results.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })
    })
    return results;
  } catch (error) {
    console.error("Sonuçlar getirilemedi:", error);
    throw error;
  }
}