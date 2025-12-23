import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signInAnonymously, signOut as firebaseSignOut, RecaptchaVerifier, signInWithPhoneNumber, Auth, ConfirmationResult } from 'firebase/auth';
import { auth } from './firebase';
const googleProvider = new GoogleAuthProvider();
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};
export const loginWithEmail = async (email: string, pass: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (error) {
    throw error;
  }
};
export const loginAsGuest = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    throw error;
  }
};
export const logout = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

// Phone auth setup helper
export const setupRecaptcha = (elementId: string) => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible'
    });
  }
  return window.recaptchaVerifier;
};
export const loginWithPhone = async (phoneNumber: string, appVerifier: any) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    throw error;
  }
};

// Add types to window object
declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}