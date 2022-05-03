import { User } from "firebase/auth";
import { collection, doc, DocumentData, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db, categoriesRef, quizzesRef } from "../firebase-config";

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

const getCategories = async () => {
  let res = await getDocs(categoriesRef);
  const categories: DocumentData | undefined = res.docs.map(ele => {
    return { ...ele.data(), id: ele.id };
  });
  return categories;
};

const getQuizzes = async () => {
  let res = await getDocs(quizzesRef);
  const quizzes: DocumentData | undefined = res.docs.map(ele => {
    return { ...ele.data(), id: ele.id };
  });
  return quizzes;
};

const getQuiz = async (quizId: string) => {
  const quizRef = collection(db, `quizzes/${quizId}/questions`);
  const res = await getDocs(quizRef);
  const quiz: DocumentData | undefined = res.docs.map(ele => {
    return { ...ele.data(), id: ele.id };
  });
  return quiz;
};

export { createUserDocument, getUserDocument, getCategories, getQuizzes, getQuiz };
