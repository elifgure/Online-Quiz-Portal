import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../lib/fireBase";
import { doc, setDoc } from "firebase/firestore";

export const registerUser = async (userName, password, email, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await sendEmailVerification(user);
    await updateProfile(user, { displayName: userName });

    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: userName,
      role: role,
      createdAt: new Date(),
      cardTemplates: [],
    };

    if (role === "teacher") {
      await setDoc(doc(db, "teachers", user.uid), {
        ...userData,
        collectionList: [],
      });
    } else if (role === "student") {
      await setDoc(doc(db, "students", user.uid), userData);
    }

    return {
      success: true,
      message: "Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
