import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, categoriesRef, quizzesRef } from "../firebase-config";
import { QuestionType } from "../types";
import { getErrorMessage } from "./catchError";

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
      setDoc(userRef, {
        email,
        firstName,
        lastName,
        createdAt: new Date(),
        totalAttemptedQuiz: 0,
        totalScore: 0,
      }).then(res => console.log(res));
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
  try {
    let res = await getDocs(categoriesRef);
    const categories: DocumentData | undefined = res.docs.map(ele => {
      return { ...ele.data(), id: ele.id };
    });
    return categories;
  } catch (err) {
    console.log(err);
    throw Error("something went wrong");
  }
};

const getQuizzes = async () => {
  try {
    let res = await getDocs(quizzesRef);
    const quizzes: DocumentData | undefined = res.docs.map(ele => {
      return { ...ele.data(), id: ele.id };
    });
    return quizzes;
  } catch (err) {
    console.log(err);
    throw Error("something went wrong");
  }
};

const getQuiz = async (quizId: string) => {
  try {
    const quizRef = collection(db, `quizzes/${quizId}/questions`);
    const res = await getDocs(quizRef);
    const quiz: DocumentData | undefined = res.docs.map(ele => {
      return { ...ele.data(), id: ele.id };
    });
    return quiz;
  } catch (err) {
    console.log(err);
    throw Error("something went wrong");
  }
};

const updateUserDocument = async (uid: string, currentScore: number) => {
  try {
    const userRef = doc(db, `users/${uid}`);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const { totalAttemptedQuiz, totalScore } = userSnapshot.data();

      await updateDoc(userRef, {
        totalAttemptedQuiz: totalAttemptedQuiz + 1,
        totalScore: totalScore + currentScore,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const addQuiz = async (quizData: {
  quizName: string;
  quizDescription: string;
  quizCategory: string;
  quizImage: string;
}) => {
  try {
    const quizRef = collection(db, "quizzes");
    const res = await addDoc(quizRef, { ...quizData, quizStatus: "available" });
    return res.id;
  } catch (err) {
    return "something went wrong";
  }
};

const addQuestion = async ({
  quizId,
  questionData,
}: {
  quizId: string;
  questionData: QuestionType;
}) => {
  try {
    const quizRef = collection(db, `quizzes/${quizId}/questions`);
    const res = await addDoc(quizRef, questionData);
    return res;
  } catch (err) {
    return getErrorMessage(err);
  }
};

export {
  createUserDocument,
  getUserDocument,
  getCategories,
  getQuizzes,
  getQuiz,
  updateUserDocument,
  addQuiz,
  addQuestion,
};
