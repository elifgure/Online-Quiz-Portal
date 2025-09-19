import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  getAuth,
  sendPasswordResetEmail,
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

export const checkEmailExists = async (email) =>{
  try {
    const auth = getAuth();
    const signInMethods = await fetchSignInMethodsForEmail(auth, email)
    return signInMethods.length > 0
  } catch (error) {
    console.error("E-posta kontrol hatası:", error)
    
  }
}

export const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Kullanıcının hangi koleksiyonda olduğunu kontrol et
    const collections = ['students', 'teachers', 'admins'];
    let userData = null;
    let userRole = null;

    for (const collection of collections) {
      const userDoc = await getDoc(doc(db, collection, user.uid));
      if (userDoc.exists()) {
        userData = userDoc.data();
        userRole = userData.role;
        break;
      }
    }

    // Eğer kullanıcı bulunamazsa, girişi reddet ve hesabı çıkış yap
    if (!userData) {
      await signOut(auth); // Firebase'den çıkış yap
      throw new Error("Bu Google hesabı sistemde kayıtlı değil. Lütfen önce normal kayıt işlemi yapın.");
    }

    // Varolan kullanıcı için son giriş zamanını güncelle
    const collectionName = userRole + "s";
    await setDoc(doc(db, collectionName, user.uid), {
      ...userData,
      lastLogin: new Date().toISOString(),
      photoURL: user.photoURL
    }, { merge: true });

    return {
      success: true,
      user: {
        ...userData,
        uid: user.uid
      }
    };

  } catch (error) {
    console.error("Google ile giriş hatası:", error);
    throw error; // Orijinal hata mesajını koru
  }
};
export const sendResetEmail = async (email) =>{
  try {
    await sendPasswordResetEmail(auth, email) 
    return { success: true, message: "Şifre sıfırlama e-postası gönderildi." };
  } catch (error) {
    console.error("Şifre sıfırlama e-postası gönderilirken hata oluştu:", error);
    return { success: false, error };
  }
}
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
