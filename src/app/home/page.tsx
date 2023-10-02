"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IndicatePost } from "@/store/post";
import { RootState } from "@/store/store";
import { getAllPosts, getUser } from "@/helpers/api-util";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { HomeContent } from "@/components/home/HomeContent";

export default function Page() {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  useEffect(() => {
    getAllPosts().then((result) => {
      dispatch(IndicatePost(result));
    });
  }, [dispatch]);

  if (!posts) {
    <p>Loading...</p>;
  }

  getUser();

  return (
    <>
      <NavHeader />
      <HomeContent />
      <NavFooter />
    </>
  );
}