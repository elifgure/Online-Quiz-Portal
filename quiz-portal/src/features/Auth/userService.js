import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../lib/fireBase";

export const getAllUsers = async () => {
  const studentSnap = await getDocs(query(collection(db, "students"), orderBy("createdAt", "desc")));
  const teacherSnap = await getDocs(query(collection(db, "teachers"), orderBy("createdAt", "desc")));
  const adminSnap = await getDocs(query(collection(db, "admins"), orderBy("createdAt", "desc")));

  const students = studentSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const teachers = teacherSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const admins = adminSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return [...students, ...teachers, ...admins];
};

export const deleteById = async (userId, collectionName) => {
  const userRef = doc(db, collectionName, userId);
  await deleteDoc(userRef);
};
