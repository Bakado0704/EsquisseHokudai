"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/categoryData/categoryData";
import { changePost } from "@/helpers/api-change";
import storage from "@/helpers/firebase";
import { RootState } from "@/store/store";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Bg } from "../bg/Background";
import { CloseButton } from "../button/CloseButton";
import { SubmitButton } from "../button/SubmitButton";

type Props = {
  id: string;
  modalClose: () => void;
};

export default function ChangePost(props: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageName, setImageName] = useState<string>();
  const postedId = props.id;
  const posts = useSelector((state: RootState) => state.post.posts);
  const selectedPost = posts.find((post) => post.id === postedId);

  const index = posts.indexOf(selectedPost);
  const [title, setTitle] = useState<string>(selectedPost?.title);
  const [description, setDescription] = useState<string>(
    selectedPost?.description
  );
  const [imageSource, setImageSource] = useState<string | StaticImport>(
    selectedPost?.imageSource
  );

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let projectType = [];
    let buildingType = [];
    let toolType = [];

    for (let i = 0; i < projectCategory.length; i++) {
      const checkedItem = document.getElementsByName(
        `${projectCategory[i].id[0]}`
      );
      if (checkedItem.item(0).checked) {
        projectType.push(projectCategory[i].id);
      }
    }

    for (let i = 0; i < buildingCategory.length; i++) {
      const checkedItem = document.getElementsByName(
        `${buildingCategory[i].id[0]}`
      );
      if (checkedItem.item(0).checked) {
        buildingType.push(buildingCategory[i].id);
      }
    }

    for (let i = 0; i < toolCategory.length; i++) {
      const checkedItem = document.getElementsByName(
        `${toolCategory[i].id[0]}`
      );
      if (checkedItem.item(0).checked) {
        toolType.push(toolCategory[i].id);
      }
    }

    await changePost(
      postedId,
      index,
      //@ts-ignore
      title,
      { projectType, buildingType, toolType },
      imageName,
      description
    ).then(() => {
      router.push("/home");
    });
  }

  const onFileUploadToFirebase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, "image/" + file.name);

    setImageName(file.name);

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    const uploadImage = uploadBytesResumable(storageRef, file);

    getDownloadURL(ref(storage, "image/" + file.name))
      .then((url) => {
        setImageSource(url);
      })
      .catch((error) => {});

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setIsUploaded(true);
      }
    );
  };

  const titleHandler = () => {
    //@ts-ignore
    const enteredTitle = document.getElementById("title").value;
    setTitle(enteredTitle);
  };

  const descriptionHandler = () => {
    //@ts-ignore
    const enteredDescription = document.getElementById("description").value;
    setDescription(enteredDescription);
  };

  return (
    <Wrapper>
      <Bg modalClose={props.modalClose} />
      <WrapperInner>
        <Content>
          <CloseButton modalClose={props.modalClose} />
          <P $title={true}>投稿修正</P>
          <form onSubmit={submitFormHandler}>
            <Container>
              <Label htmlFor="title">タイトル</Label>
              <Textarea
                id="title"
                value={title}
                rows={1}
                onChange={titleHandler}
              />
            </Container>

            <Container>
              <P $left={true}>カテゴリ</P>
              <RightContainer>
                <CategoryList>
                  {projectCategory.map((category) => {
                    return (
                      <CategoryItem key={category.id[0]}>
                        <label htmlFor="title">
                          <Input
                            type="checkbox"
                            id={category.id[0]}
                            name={category.id[0]}
                            value={category.id[0]}
                          />
                          {category.title}
                        </label>
                      </CategoryItem>
                    );
                  })}
                </CategoryList>
                <CategoryList>
                  {buildingCategory.map((category) => {
                    return (
                      <CategoryItem key={category.id[0]}>
                        <label htmlFor="title">
                          <Input
                            type="checkbox"
                            id={category.id[0]}
                            name={category.id[0]}
                            value={category.id[0]}
                          />
                          {category.title}
                        </label>
                      </CategoryItem>
                    );
                  })}
                </CategoryList>
                <CategoryList>
                  {toolCategory.map((category) => {
                    return (
                      <CategoryItem key={category.id[0]}>
                        <label htmlFor="title">
                          <Input
                            type="checkbox"
                            id={category.id[0]}
                            name={category.id[0]}
                            value={category.id[0]}
                          />
                          {category.title}
                        </label>
                      </CategoryItem>
                    );
                  })}
                </CategoryList>
              </RightContainer>
            </Container>

            <Container>
              <Label htmlFor="image">写真</Label>
              <Div $right={true}>
                <input
                  multiple
                  name="imageURL"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={onFileUploadToFirebase}
                />
                <PhotoContainer>
                  <PhotoInner>
                    {loading ? (
                      <h2>アップロード中・・・</h2>
                    ) : (
                      <>
                        <Image
                          src={selectedPost?.imageSource}
                          alt="church"
                          layout={"fill"}
                          objectFit={"cover"}
                        />
                        {isUploaded && (
                          <>
                            {imageSource && (
                              <Image
                                src={imageSource}
                                alt="church"
                                layout={"fill"}
                                objectFit={"cover"}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </PhotoInner>
                </PhotoContainer>
              </Div>
            </Container>
            <Container>
              <Label htmlFor="description">内容</Label>
              <Textarea
                id="description"
                value={description}
                rows={5}
                onChange={descriptionHandler}
              />
            </Container>
            <SubmitButton>投稿する</SubmitButton>
          </form>
        </Content>
      </WrapperInner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  --text-color: #3e3a39;

  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: hidden;
  position: absolute;
  color: var(--text-color);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WrapperInner = styled.div`
  --background-color: #efefef;

  width: 100%;
  max-width: 1200px;
  background-color: var(--background-color);
  border-radius: 20px;
  position: relative;
  padding: 40px;
`;

const Content = styled.div`
  height: calc(100% - 171px);
  overflow-y: scroll;
  border-bottom: 1px solid white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid white;
`;

const Div = styled.div<{
  $container?: boolean;
  $bg?: boolean;
  $wrapper?: boolean;
  $photo?: boolean;
  $photoinner?: boolean;
  $right?: boolean;
}>`
  --color-background: #dcdddd;

  ${(props) => props.$container && css``}

  ${(props) =>
    props.$bg &&
    css`
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: black;
      opacity: 60%;
      top: 0;
      left: 0;
    `}

    
  ${(props) =>
    props.$wrapper &&
    css`
      width: 100%;
      display: flex;
      align-items: center;
      padding-top: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid white;
    `}

    ${(props) =>
    props.$photo &&
    css`
      width: 100%;
      height: 400px;
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

    ${(props) =>
    props.$right &&
    css`
      width: 90%;
    `}
`;

const PhotoContainer = styled.div`
  --color-background: #dcdddd;

  width: 100%;
  height: 400px;
  padding-right: 80px;
  padding-left: 80px;
  margin-top: 8px;
  background-color: var(--color-background);
`;

const PhotoInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightContainer = styled.button``;

const Button = styled.button<{ $close?: boolean; $submit?: boolean }>`
  --border-color: #c9caca;
  --text-color: #323131;

  ${(props) =>
    props.$close &&
    css`
      display: block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 5px;
      right: 5px;
    `}

  ${(props) =>
    props.$submit &&
    css`
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
    `}
`;

const Span = styled.span`
  background-color: black;
  position: absolute;
  width: 24px;
  height: 2px;
  top: 50%;
  left: 50%;

  &:nth-child(1) {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:nth-child(2) {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

const P = styled.p<{
  $title?: boolean;
  $left?: boolean;
}>`
  margin-top: 10px;
  font-size: 16px;

  ${(props) =>
    props.$title &&
    css`
      margin-top: 0;
      font-size: 32px;
      text-decoration: underline;
      text-align: center;
    `}

  ${(props) =>
    props.$left &&
    css`
      width: 10%;
      text-align: center;
    `}
`;

const CategoryList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &:first-child {
    margin-top: 0;
  }
`;

const CategoryItem = styled.li`
  margin-top: 10px;
`;

const Input = styled.input`
  --border-color: #9fa0a0;
  --background-color: #dcdddd;

  cursor: pointer;
  padding-left: 30px;
  vertical-align: middle;
  position: relative;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
  }

  &::before {
    border-color: var(--border-color);
    background-color: var(--background-color);
    border: 3px solid #666464;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;
  }

  &::after {
    opacity: 0;
    width: 10px;
    height: 10px;
    background-color: var(--border-color);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 50%;
  }

  &:checked::after {
    opacity: 1;
  }
`;

const Label = styled.label`
  width: 10%;
  text-align: center;
`;

const Textarea = styled.textarea`
  --border-color: #9fa0a0;
  --background-color: #dcdddd;

  display: block;
  width: 90%;
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
