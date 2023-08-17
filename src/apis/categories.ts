import { collection, getDocs } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
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
