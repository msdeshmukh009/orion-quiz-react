import { User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const createUserDocument = async (
  user: User,
  additionalData: { firstName: string; lastName: string }
) => {
  if (!user) return;

  const userRef = doc(db, `users/${user.uid}`);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email } = user;
    const { firstName, lastName } = additionalData;

    try {
      setDoc(userRef, { email, firstName, lastName, createdAt: new Date() }).then(res =>
        console.log(res)
      );
    } catch (err) {
      console.log(err);
    }
  }
};

const getUserDocument = async (uid: string) => {
  if (!uid) return;

  try {
    const userRef = doc(db, `users/${uid}`);

    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }
  } catch (err) {
    console.log(err);
  }
};
export { createUserDocument, getUserDocument };
