import { db } from "../../lib/fireBase";
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const saveQuiz = async (quizData) => {
  function removeUndefinedFields(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined)
    );
  }
  try {
    const cleanData = removeUndefinedFields(quizData);

    const docRef = collection(db, "quizzes");
    const docSnapShot = await addDoc(docRef, cleanData);
    // Başarıyla kaydedildiğinde success:true dön
    return { success: true, id: docSnapShot.id };
  } catch (error) {
    console.error("Quiz kaydedilemedi:", error);
    return { success: false, error: error.message };
  }
};

export const getQuizzesByUser = async (userId) => {
  const q = query(collection(db, "quizzes"), where("createdBy", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deleteQuizById = async (quizId) => {
  try {
    await deleteDoc(doc(collection(db, "quizzes"), quizId));
    return { success: true };
  } catch (error) {
    console.error("Quiz silinemedi:", error);
    return { success: false, error: error.message };
  }
};

export const updateQuiz = async (quizId, quizData) => {
  try {
    const quizRef = doc(db, "quizzes", quizId);
    await updateDoc(quizRef, {
      ...quizData,
      updatedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
