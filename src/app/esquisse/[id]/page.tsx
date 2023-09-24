"use client";

import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  esquisseSubmit,
  getAllEsquisses,
  getAllPosts,
  getUser,
} from "@/helpers/api-util";
import { IndicateEsquisse, IndicatePost } from "@/store/post";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { deletePost } from "@/helpers/api-change";
import styled from "styled-components";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import ChangePost from "@/components/change/ChangePost";
import { ChangePostButton } from "@/components/button/ChangePostButton";
import { TagList } from "@/components/list/TagList";
import { SubmitButton } from "@/components/button/SubmitButton";
import { EsquisseContent } from "@/components/esquisse/EsquisseContent";
import { EsquisseForm } from "@/components/esquisse/EsquisseForm";
import { PhotoContainer } from "@/components/photo/PhotoContianer";

type Props = {
  params: Params;
};

function Esquisse(props: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const postedId = props.params.id;
  const posts = useSelector((state: RootState) => state.post.posts);
  const esquisses = useSelector((state: RootState) => state.post.esquisses);
  const selectedPost = posts.find((post) => post.id === postedId);
  const selectedEsquisses = esquisses.filter(
    (esquisse) => esquisse.id === postedId
  );
  const user = getUser();
  const [esquisseModal, setEsquisseModal] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<boolean>(false);
  //@ts-ignore
  const index = posts.indexOf(selectedPost);
  const changePostHandler = () => {
    setPostModal(true);
  };
  const deletePostHandler = async () => {
    await deletePost(index).then(() => {
      getAllPosts().then(function (result) {
        dispatch(IndicatePost(result));
        router.push("/home");
      });
    });
  };

  useEffect(() => {
    getAllPosts().then(function (result) {
      dispatch(IndicatePost(result));
    });
    getAllEsquisses().then(function (result) {
      dispatch(IndicateEsquisse(result));
    });
  }, [dispatch, esquisses]);

  if (!selectedPost) {
    return <p>Loading...</p>;
  }

  let tags: (ProjectType | BuildingType | ToolType)[] = [];

  //集合配列tagについて
  selectedPost.category.projectType?.map((data) => {
    tags.push(data);
  });
  selectedPost.category.buildingType?.map((data) => {
    tags.push(data);
  });
  selectedPost.category.toolType?.map((data) => {
    tags.push(data);
  });

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await esquisseSubmit(
      props.params.id,
      //@ts-ignore
      comment
    ).then(() => {
      getAllEsquisses().then(function (result) {
        dispatch(IndicateEsquisse(result));
        setComment("");
      });
    });
  }

  const postModalClose = () => {
    setPostModal(false);
  };

  const esquisseModalClose = () => {
    setEsquisseModal(false);
  };

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          {user && selectedPost.user.uid === user.uid && (
            <ChangePostButton
              onChange={changePostHandler}
              onDelete={deletePostHandler}
            />
          )}
          <TagList tags={tags} />
          <Title>{selectedPost.title}</Title>
          <Description>{selectedPost.user.displayName}</Description>
          <Description>{selectedPost.createdAt}</Description>
          <PhotoContainer selectedPost={selectedPost}/>
          <Description>{selectedPost.description}</Description>

          <EsquisseContent
            selectedEsquisses={selectedEsquisses}
            setEsquisseModal={setEsquisseModal}
            esquisseModal={esquisseModal}
            esquisseModalClose={esquisseModalClose}
          />

          <Form onSubmit={submitFormHandler}>
            <EsquisseForm comment={comment} setComment={setComment} />
            <SubmitButton>メッセージを投稿する</SubmitButton>
          </Form>
        </WrapperInner>
      </Wrapper>
      {postModal && <ChangePost id={postedId} modalClose={postModalClose} />}
      <NavFooter />
    </>
  );
}

export default Esquisse;

const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  max-width: 1440px;
  margin: 0 auto;

  padding-right: 40px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
`;

const WrapperInner = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.p`
  --border-color: #9fa0a0;
  --background-color: #434141;

  margin-top: 8px;
  font-size: 24px;
  text-decoration: underline;
  text-align: left;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 16px;
`;

const Form = styled.form`
  border-top: 1px solid white;
  margin-top: 24px;
`;
