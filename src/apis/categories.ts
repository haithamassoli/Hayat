import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useQuery, useMutation } from "@tanstack/react-query";
import { db } from "@src/firebase.config";

type Comment = {
  name: string;
  comment: string;
  createdAt: Date;
};

export type Video = {
  title: string;
  doctor: string;
  url: string;
  duration: string;
  comments: Comment[];
};

type Categories = {
  id: string;
  title: string;
  route: string;
  videos: Video[];
};

export const fetchCategoriesQuery = () => {
  return useQuery(["categories"], fetchCategories);
};

const fetchCategories = async () => {
  const categoriesRef = collection(db, "categories");
  const querySnapshot = await getDocs(categoriesRef);
  const categories: Categories[] = [];
  querySnapshot.forEach((doc) => {
    categories.push({
      id: doc.id,
      title: doc.data().title,
      route: doc.data().route,
      videos: doc.data().videos,
    });
  });
  return categories;
};

export const addCommentMutation = () =>
  useMutation(
    (
      data: Comment & {
        videoTitle: string;
        categoryId: string;
      }
    ) => addComment(data)
  );

const addComment = async (
  data: Comment & {
    videoTitle: string;
    categoryId: string;
  }
) => {
  const categoriesRef = doc(db, "categories", data.categoryId);
  const categoriesSnapshot = await getDoc(categoriesRef);
  const categoriesData = categoriesSnapshot.data();
  const videos = categoriesData?.videos;
  const videoIndex = videos.findIndex(
    (video: Video) => video.title === data.videoTitle
  );
  videos[videoIndex].comments.push({
    name: data.name,
    comment: data.comment,
    createdAt: new Date(),
  });
  await updateDoc(categoriesRef, {
    videos: videos,
  });
  return null;
};
