import { collection, addDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

type Messages = {
  _id: string;
  text: string;
  user: string;
  room: string;
  createdAt: Date;
};

export const addMessageMutation = () =>
  useMutation((message: Messages) => addMessage(message));

const addMessage = async (message: Messages) => {
  try {
    const messagesRef = collection(db, "messages");
    const newMessage = await addDoc(messagesRef, message);
    return newMessage;
  } catch (err) {
    console.log(err);
  }
};
