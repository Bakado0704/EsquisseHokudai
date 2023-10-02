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
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Bg } from "../bg/Background";
import { CloseButton } from "../button/CloseButton";
import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getAllPosts } from "@/helpers/api-util";
import { ChangePostTitleForm } from "../form/changeform/ChangePostTitleForm";
import { ChangePostCategoryForm } from "../form/changeform/ChangePostCategoryForm";
import { ChangePostPhotoForm } from "../form/changeform/ChangePostPhotoForm";
import { ChangePostDescriptionForm } from "../form/changeform/ChangePostDescriptionForm";
import { Uploading } from "../bg/Uploading";
import { FormButton } from "../button/FormButton";

type Props = {
  id: string;
  modalClose: () => void;
};

export const ChangePostModal = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageName, setImageName] = useState<string>();
  const [uploading, setUploading] = useState(false);
  const postedId = props.id;
  const posts = useSelector((state: RootState) => state.post.posts);
  const selectedPost = posts.find((post) => post.id === postedId);

  const index = posts.indexOf(selectedPost!);
  const [title, setTitle] = useState<string>(selectedPost!.title);
  const [description, setDescription] = useState<string>(
    selectedPost!.description
  );
  const [imageSource, setImageSource] = useState<string | StaticImport>(
    selectedPost!.imageSource
  );

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let projectType: (ProjectType | BuildingType | ToolType)[] = [];
    let buildingType: (ProjectType | BuildingType | ToolType)[] = [];
    let toolType: (ProjectType | BuildingType | ToolType)[] = [];

    setUploading(true);

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

    await changePost(
      postedId,
      index,
      title,
      { projectType, buildingType, toolType },
      imageName!,
      description
    ).then(() => {
      getAllPosts().then(() => {
        setUploading(false);
        router.push("/home");
      });
    });
  }

  const onFileUploadToFirebase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

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
    const enteredTitle = (document.getElementById("title") as HTMLInputElement)
      .value;
    setTitle(enteredTitle);
  };

  const descriptionHandler = () => {
    const enteredDescription = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    setDescription(enteredDescription);
  };

  return (
    <Wrapper>
      <Bg modalClose={props.modalClose} />
      {uploading && <Uploading text="アップロード中..." />}
      <WrapperInner>
        <Content>
          <CloseButton modalClose={props.modalClose} />
          <Title>投稿修正</Title>
          <form onSubmit={submitFormHandler}>
            <ChangePostTitleForm title={title} titleHandler={titleHandler} />
            <ChangePostCategoryForm
              projectCategory={projectCategory}
              buildingCategory={buildingCategory}
              toolCategory={toolCategory}
            />
            <ChangePostPhotoForm
              onFileUploadToFirebase={onFileUploadToFirebase}
              selectedPost={selectedPost}
              isUploaded={isUploaded}
              loading={loading}
              imageSource={imageSource}
            />
            <ChangePostDescriptionForm
              description={description}
              descriptionHandler={descriptionHandler}
            />
            <FormButton>投稿する</FormButton>
          </form>
        </Content>
      </WrapperInner>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  --text-color: #3e3a39;

  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-height: 80%;
  background-color: var(--background-color);
  border-radius: 20px;
  position: relative;
  padding: 40px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div``;

const Title = styled.p`
  margin-top: 0;
  font-size: 32px;
  text-decoration: underline;
  text-align: center;
`;
