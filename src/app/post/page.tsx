"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/categoryData/categoryData";
import { PostCategoryForm } from "@/components/form/postform/PostCategoryForm";
import { PostDescriptionForm } from "@/components/form/postform/PostDescriptionForm";
import { PostPhotoForm } from "@/components/form/postform/PostPhotoForm";
import { PostTitleForm } from "@/components/form/postform/PostTitleForm";
import { NavFooter } from "@/components/nav/NavFooter/NavFooter";
import { NavHeader } from "@/components/nav/NavHeader/NavHeader";
import { IndicatePost } from "@/store/post";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { FormButton } from "@/components/button/FormButton";
import { Uploading } from "@/components/bg/Uploading";
import {
  getAllPosts,
  imageUpload,
  importImage,
  postSubmit,
  upImage,
} from "@/helpers/api-util";
import styled from "styled-components";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageSource, setImageSource] = useState<string | StaticImport>();
  const [imageName, setImageName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);

    let projectType: (ProjectType | BuildingType | ToolType)[] = [];
    let buildingType: (ProjectType | BuildingType | ToolType)[] = [];
    let toolType: (ProjectType | BuildingType | ToolType)[] = [];

    for (let i = 0; i < projectCategory.length; i++) {
      const checkedItem = document.getElementById(
        `${projectCategory[i].id[0]}`
      );
      if ((checkedItem as HTMLInputElement).checked) {
        projectType.push(projectCategory[i].id);
      }
    }

    for (let i = 0; i < buildingCategory.length; i++) {
      const checkedItem = document.getElementById(
        `${buildingCategory[i].id[0]}`
      );
      if ((checkedItem as HTMLInputElement).checked) {
        buildingType.push(buildingCategory[i].id);
      }
    }

    for (let i = 0; i < toolCategory.length; i++) {
      const checkedItem = document.getElementById(`${toolCategory[i].id[0]}`);
      if ((checkedItem as HTMLInputElement).checked) {
        toolType.push(toolCategory[i].id);
      }
    }

    await postSubmit(
      title,
      { projectType, buildingType, toolType },
      imageName,
      description!
    ).then(async () => {
      await getAllPosts().then((result) => {
        dispatch(IndicatePost(result));
        setTitle("");
        setDescription("");
        setUploading(false);
        router.push("/");
      });
    });
  };

  const onFileUploadToFirebase = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageName(e.target.files![0].name);

    await upImage(e).then(async () => {
      await importImage(e).then((url) => {
        setImageSource(url);
      });
    });

    imageUpload(e).on(
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

  return (
    <>
      <NavHeader />
      <Wrapper>
        {uploading && <Uploading text="アップロード中..." />}
        <WrapperInner>
          <Title>投稿</Title>
          <form onSubmit={submitFormHandler}>
            <PostTitleForm title={title} setTitle={setTitle} />
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
              setDescription={setDescription}
            />
            <FormButton>投稿する</FormButton>
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
