import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../lib/fireBase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
      createdAt: new Date().toISOString(),
      cardTemplates: [],
    };

    if (role === "teacher") {
      await setDoc(doc(db, "teachers", user.uid), {
        ...userData,
        collectionList: [],
      });
    } else if (role === "student") {
      await setDoc(doc(db, "students", user.uid), {
        userId: user.uid,
        email: user.email,
        displayName: userName,
        role: role,
        createdAt: new Date().toISOString(),
        cardTemplates: [],
      });
    }

    return {
      success: true,
      message: "Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.",
    };
  } catch (error) {
    throw new Error("hata oluştu: " + error.message);
  }
};
export const loginUser = async (email, password, role) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    let userSnapshot;
    if (role === "teacher") {
      userSnapshot = await getDoc(doc(db, "teachers", userCredential.user.uid));
    } else if (role === "student") {
      userSnapshot = await getDoc(doc(db, "students", userCredential.user.uid));
    }
    if (!userSnapshot.exists()) {
      throw new Error("Kullanıcı Bulunamadı");
    }
    const userData = userSnapshot.data();
    return {
      userName: userCredential.user.displayName,
      ...userData
    };
  } catch (error) {
    throw new Error("Giriş başarısız: " + error.message);
    //  let errorMessage;
    //   switch (error.code) {
    //     case 'auth/user-not-found':
    //       errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
    //       break;
    //     case 'auth/wrong-password':
    //       errorMessage = 'Hatalı şifre girdiniz.';
    //       break;
    //     case 'auth/invalid-email':
    //       errorMessage = 'Geçersiz e-posta adresi.';
    //       break;
    //     case 'auth/too-many-requests':
    //       errorMessage = 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
    //       break;
    //     default:
    //       errorMessage = 'Giriş yapılırken bir hata oluştu.';
    //   }
    //   return {
    //     success: false,
    //     error: errorMessage,
    //     code: error.code
    //   };
  }
};

export const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  } catch (error) {
    throw new Error("Google ile giriş başarısız: " + error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Çıkış yaparken hata oluştu: " + error.message);
    return { success: false, error }; // hatayı yakalayıp anlamlı biçimde geri dön
  }
};
export const onStateChanged = (callback) => {
  return onAuthStateChanged(auth, callback);
};
