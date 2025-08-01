import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../lib/fireBase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const registerUser = async (userName, password, email, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // Önce profil güncelle
    await updateProfile(user, {
      displayName: userName
    })

    // Kullanıcı verilerini hazırla
    const userData = {
      userId: user.uid,
      email: user.email,
      displayName: userName,
      role: role,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: true
    }

    // Role göre koleksiyona kaydet
    let collectionRef
    switch(role) {
      case "admin":
        collectionRef = doc(db, "admins", user.uid)
        await setDoc(collectionRef, {
          ...userData,
          permissions: ["all"],
          adminSince: new Date().toISOString()
        })
        break
      
      case "teacher":
        collectionRef = doc(db, "teachers", user.uid)
        await setDoc(collectionRef, {
          ...userData,
          collectionList: []
        })
        break
      
      case "student":
        collectionRef = doc(db, "students", user.uid)
        await setDoc(collectionRef, userData)
        break

      default:
        throw new Error("Geçersiz rol")
    }

    return {
      success: true,
      message: "Kayıt başarılı!",
      userData: {
        ...userData,
        uid: user.uid
      }
    }

  } catch (error) {
    console.error("Kayıt hatası:", error)
    throw error
  }
}

export const loginUser = async (email, password, role) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    
    // Kullanıcı verilerini al
    const collectionName = role + "s" // admins, teachers, students
    const userDoc = await getDoc(doc(db, collectionName, userCredential.user.uid))
    
    if (!userDoc.exists()) {
      throw new Error("Kullanıcı bulunamadı")
    }

    const userData = userDoc.data()

    // Son giriş zamanını güncelle
    await setDoc(doc(db, collectionName, userCredential.user.uid), {
      ...userData,
      lastLogin: new Date().toISOString()
    }, { merge: true })

    return {
      success: true,
      user: {
        ...userData,
        uid: userCredential.user.uid
      }
    }

  } catch (error) {
    console.error("Giriş hatası:", error)
    throw error
  }
}

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
