"use client";

import { buildingCategory, projectCategory, toolCategory } from "@/categoryData/categoryData";
import { SubmitButton } from "@/components/button/SubmitButton";
import { PostCategoryForm } from "@/components/form/postform/PostCategoryForm";
import { PostDescriptionForm } from "@/components/form/postform/PostDescriptionForm"; 
import { PostPhotoForm } from "@/components/form/postform/PostPhotoForm"; 
import { PostTitleForm } from "@/components/form/postform/PostTitleForm"; 
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { getAllPosts, postSubmit } from "@/helpers/api-util";
import { IndicatePost } from "@/store/post";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import storage from "@/helpers/firebase";
import styled from "styled-components";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageSource, setImageSource] = useState<string | StaticImport>();
  const [imageName, setImageName] = useState<string>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string>();

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

    await postSubmit(
      //@ts-ignore
      title,
      { projectType, buildingType, toolType },
      imageName,
      description
    ).then(() => {
      getAllPosts().then(function (result) {
        dispatch(IndicatePost(result));
        setTitle("");
        setDescription("");
        router.push("/home");
      });
    });
  }

  const onFileUploadToFirebase = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);

    setImageName(file.name);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .then(() => {
        getDownloadURL(ref(storage, "image/" + file.name)).then((url) => {
          setImageSource(url);
        });
      });

    const uploadImage = uploadBytesResumable(storageRef, file);

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
    <>
      <NavHeader />
      <Wrapper>
        <WrapperInner>
          <Title>投稿</Title>
          <form onSubmit={submitFormHandler}>
            <PostTitleForm title={title} titleHandler={titleHandler} />
            <PostCategoryForm
              projectCategory={projectCategory}
              buildingCategory={buildingCategory}
              toolCategory={toolCategory}
            />
            <PostPhotoForm
              onFileUploadToFirebase={onFileUploadToFirebase}
              isUploaded={isUploaded}
              loading={loading}
              imageSource={imageSource}
            />
            <PostDescriptionForm
              description={description}
              descriptionHandler={descriptionHandler}
            />
            <SubmitButton>投稿する</SubmitButton>
          </form>
        </WrapperInner>
      </Wrapper>
      <NavFooter />
    </>
  );
}

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

  &::-webkit-scrollbar {
    display: none;
  }
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
  margin-top: 0;
  font-size: 32px;
  text-decoration: underline;
  text-align: center;
`;
