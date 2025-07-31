import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/fireBase";

export const getAllUsers = async () => {
  const studentSnap = await getDocs(collection(db, "students"));
  const teacherSnap = await getDocs(collection(db, "teachers"));
  const adminSnap = await getDocs(collection(db, "admins"));

  const students = studentSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const teachers = teacherSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  const admins = adminSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return [...students, ...teachers, ...admins];
};
