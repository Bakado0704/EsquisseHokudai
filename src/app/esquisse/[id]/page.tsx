"use client";

import Image from "next/image";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  esquisseSubmit,
  getAllEsquisses,
  getAllPosts,
  getUser,
} from "@/helpers/api-util";
import { IndicateEsquisse, IndicatePost } from "@/store/post";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import { deleteEsquisse, deletePost } from "@/helpers/api-change";
import styled, { css } from "styled-components";
import NavFooter from "@/components/nav/NavFooter/NavFooter";
import tagImg from "@/assets/icon/tag.svg";
import personImg from "@/assets/icon/person.png";

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
  //@ts-ignore
  const index = posts.indexOf(selectedPost);
  const changePostHandler = () => {
    router.push(`/changePost/${postedId}`);
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

  const commentHandler = () => {
    //@ts-ignore
    const enteredText = document.getElementById("text").value;
    setComment(enteredText);
  };

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

  return (
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          {user && selectedPost.user.uid === user.uid && (
            <>
              <button onClick={changePostHandler}>変更</button>
              <span> | </span>
              <button onClick={deletePostHandler}>消去</button>
            </>
          )}
          <Ul $article={true}>
            {tags.map((data) => {
              if (data) {
                return (
                  <Li key={data[0]}>
                    <Link href={`/category/${data[0]}`}>
                      <Div $tag={true}>
                        <Image src={tagImg} alt="tag" width={17} height={20} />
                        <P $tag={true}>{data[1]}</P>
                      </Div>
                    </Link>
                  </Li>
                );
              }
            })}
          </Ul>
          <P $title={true}>{selectedPost.title}</P>
          <P>{selectedPost.user.displayName}</P>
          <P>{selectedPost.createdAt}</P>
          <Div $photo={true}>
            <Div $photoinner={true}>
              <Image
                src={selectedPost.imageSource}
                alt=""
                layout={"fill"}
                objectFit={"cover"}
              />
            </Div>
          </Div>
          <P $description={true}>{selectedPost.description}</P>
          <ul>
            {selectedEsquisses.map((esquisse) => {
              const esquisseIndex = selectedEsquisses.indexOf(esquisse);

              const changeEsquisseHandler = () => {
                router.push(`/changeEsquisse/${esquisse.key}`);
              };
              const deleteEsquisseHandler = () => {
                deleteEsquisse(esquisseIndex);
                router.push(`/esquisse/${esquisse.id}`);
              };

              return (
                <Li $esquisse={true} key={esquisse.key}>
                  <Div $person={true}>
                    <Div $circle={true}>
                      <Image
                        src={personImg}
                        alt="tag"
                        width={100}
                        height={100}
                      />
                    </Div>
                    <P $name={true}>{esquisse.user.displayName}</P>
                  </Div>
                  <Div $esquisse={true}>
                    {user && esquisse.user.uid === user.uid && (
                      <Div $change={true}>
                        <button onClick={changeEsquisseHandler}>変更</button>
                        <span> | </span>
                        <button onClick={deleteEsquisseHandler}>消去</button>
                      </Div>
                    )}
                    <P $esquisse={true}>{esquisse.description}</P>
                  </Div>
                </Li>
              );
            })}
          </ul>
          <Form onSubmit={submitFormHandler}>
            <Div $form={true}>
              <Label htmlFor="text">コメントを追加する。</Label>
              <Textarea
                id="text"
                value={comment}
                rows={5}
                onChange={commentHandler}
              />
            </Div>
            <Button>メッセージを投稿する</Button>
          </Form>
        </WrapperInner>
      </Wrapper>
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

const Ul = styled.ul<{ $article?: boolean }>`
  ${(props) =>
    props.$article &&
    css`
      margin-top: 10px;
      display: flex;
      align-items: center;
    `}
`;

const Li = styled.li<{
  $tag?: boolean;
  $article?: boolean;
  $esquisse?: boolean;
}>`
  display: flex;

  ${(props) =>
    props.$esquisse &&
    css`
      margin-top: 32px;
      align-items: center;
    `}

  ${(props) =>
    props.$article &&
    css`
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid white;
    `}

  ${(props) =>
    props.$tag &&
    css`
      margin-right: 10px;
    `}
`;

const P = styled.p<{
  $title?: boolean;
  $tag?: boolean;
  $home?: boolean;
  $description?: boolean;
  $esquisse?: boolean;
  $name?: boolean;
}>`
  --border-color: #9fa0a0;
  --background-color: #434141;

  margin-top: 10px;
  font-size: 16px;

  ${(props) =>
    props.$description &&
    css`
      display: block;
      padding: 6px;
      font-size: 16px;
    `}

  ${(props) =>
    props.$esquisse &&
    css`
      display: block;
      padding: 16px;
      font-size: 16px;
      background-color: var(--background-color);
      border: solid 3px var(--border-color);
      border-radius: 8px;
    `}
  

  ${(props) =>
    props.$name &&
    css`
      text-align: center;
    `}

  ${(props) =>
    props.$home &&
    css`
      margin-top: 0;
      font-size: 32px;
      padding-top: 32px;
      text-decoration: underline;
      text-align: center;
    `}

  ${(props) =>
    props.$tag &&
    css`
      margin-right: 10px;
      margin-left: 5px;
      margin-top: 0;
    `}

    ${(props) =>
    props.$title &&
    css`
      margin-top: 8px;
      font-size: 24px;
      text-decoration: underline;
      text-align: left;
    `}
`;

const Div = styled.div<{
  $change?: boolean;
  $person?: boolean;
  $circle?: boolean;
  $form?: boolean;
  $tag?: boolean;
  $esquisse?: boolean;
  $photo?: boolean;
  $photoinner?: boolean;
}>`
  --color-background: #c9caca;

  ${(props) =>
    props.$esquisse &&
    css`
      position: relative;
    `}

  ${(props) =>
    props.$person &&
    css`
      margin-right: 24px;
    `}

  ${(props) =>
    props.$change &&
    css`
      position: absolute;
      right: 0;
      top: -16px;
    `}

  ${(props) =>
    props.$form &&
    css`
      margin-top: 24px;
    `}

  ${(props) =>
    props.$circle &&
    css`
      border-radius: 50%;
      overflow: hidden;
    `}

  ${(props) =>
    props.$tag &&
    css`
      display: flex;
      align-items: center;
    `}

  ${(props) =>
    props.$photo &&
    css`
      width: 100%;
      height: 600px;
      padding-right: 80px;
      padding-left: 80px;
      margin-top: 8px;
      background-color: var(--color-background);
    `}

    ${(props) =>
    props.$photoinner &&
    css`
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

const Form = styled.form`
  border-top: 1px solid white;
  margin-top: 24px;
`;

const Label = styled.label`
  align: top;
`;

const Textarea = styled.textarea`
  --border-color: #9fa0a0;
  --background-color: #434141;

  display: block;
  width: 100%;
  padding: 6px;
  font-size: 14px;
  margin-top: 8px;
  background-color: var(--background-color);
  border: solid 3px var(--border-color);
  border-radius: 8px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Button = styled.button`
  --border-color: #c9caca;
  --text-color: #323131;

  display: block;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 32px;
  padding-left: 32px;
  background-color: white;
  color: var(--text-color);
  border: solid 2px var(--border-color);
  border-radius: 10px;
  margin: 32px auto 0;
`;
