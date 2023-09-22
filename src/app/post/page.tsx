"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/categoryData/categoryData";
import NavFooter from "@/components/nav/NavFooter/NavFooter";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import { postSubmit } from "@/helpers/api-util";
import storage from "@/helpers/firebase";
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
import styled, { css } from "styled-components";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageSource, setImageSource] = useState<string | StaticImport>();
  const [imageName, setImageName] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let projectCategoryChecked = [];
    let buildingCategoryChecked = [];
    let toolCategoryChecked = [];

    for (let i = 0; i < projectCategory.length; i++) {
      const checkedItem = document.getElementsByName(
        `${projectCategory[i].id[0]}`
      );
      if (checkedItem.item(0).checked) {
        projectCategoryChecked.push(projectCategory[i].id);
      }
    }

    for (let i = 0; i < buildingCategory.length; i++) {
      const checkedItem = document.getElementsByName(
        `${buildingCategory[i].id[0]}`
      );
      if (checkedItem.item(0).checked) {
        buildingCategoryChecked.push(buildingCategory[i].id);
      }
    }

    for (let i = 0; i < toolCategory.length; i++) {
      const checkedItem = document.getElementsByName(
        `${toolCategory[i].id[0]}`
      );
      if (checkedItem.item(0).checked) {
        toolCategoryChecked.push(toolCategory[i].id);
      }
    }

    await postSubmit(
      //@ts-ignore
      title,
      { projectCategoryChecked, buildingCategoryChecked, toolCategoryChecked },
      imageName,
      description
    ).then((data) => router.push("/home"));
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
          <P $home={true}>投稿</P>
          <form onSubmit={submitFormHandler}>
            <Div $wrapper={true}>
              <Label $left={true} htmlFor="title">
                タイトル
              </Label>
              <Textarea
                id="text"
                value={title}
                rows={1}
                onChange={titleHandler}
              />
            </Div>
            <Div $wrapper={true}>
              <P $left={true}>カテゴリ</P>
              <Div>
                <Ul>
                  {projectCategory.map((category) => {
                    return (
                      <li key={category.id[0]}>
                        <label htmlFor="title">
                          <Input
                            type="checkbox"
                            id={category.id[0]}
                            name={category.id[0]}
                            value={category.id[0]}
                          />
                          {category.title}
                        </label>
                      </li>
                    );
                  })}
                </Ul>
                <Ul>
                  {buildingCategory.map((category) => {
                    return (
                      <li key={category.id[0]}>
                        <label htmlFor="title">
                          <Input
                            type="checkbox"
                            id={category.id[0]}
                            name={category.id[0]}
                            value={category.id[0]}
                          />
                          {category.title}
                        </label>
                      </li>
                    );
                  })}
                </Ul>
                <Ul>
                  {toolCategory.map((category) => {
                    return (
                      <li key={category.id[0]}>
                        <label htmlFor="title">
                          <Input
                            type="checkbox"
                            id={category.id[0]}
                            name={category.id[0]}
                            value={category.id[0]}
                          />
                          {category.title}
                        </label>
                      </li>
                    );
                  })}
                </Ul>
              </Div>
            </Div>

            <Div $wrapper={true}>
              <Label $left={true} htmlFor="image">
                写真
              </Label>
              <Div $right={true}>
                <input
                  className="imageUploadInput"
                  multiple
                  name="imageURL"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={onFileUploadToFirebase}
                />
                <Div $photo={true}>
                  <Div $photoinner={true}>
                    {loading ? (
                      <h2>アップロード中・・・</h2>
                    ) : (
                      <>
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
                  </Div>
                </Div>
              </Div>
            </Div>
            <Div $wrapper={true}>
              <Label $left={true} htmlFor="description">
                内容
              </Label>
              <Textarea
                id="description"
                value={description}
                rows={5}
                onChange={descriptionHandler}
              />
            </Div>
            <Button>投稿する</Button>
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

const Ul = styled.ul<{ $article?: boolean }>`
  display: flex;
  align-items: center;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const Input = styled.input`
  --border-color: #9fa0a0;
  --background-color: #434141;

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

const Div = styled.div<{
  $photo?: boolean;
  $photoinner?: boolean;
  $wrapper?: boolean;
  $right?: boolean;
}>`
  --color-background: #c9caca;

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

    ${(props) =>
    props.$right &&
    css`
      width: 90%;
    `}
`;

const Label = styled.label<{
  $left?: boolean;
}>`
  ${(props) =>
    props.$left &&
    css`
      width: 10%;
      text-align: center;
    `}
`;

const P = styled.p<{
  $title?: boolean;
  $tag?: boolean;
  $home?: boolean;
  $description?: boolean;
  $esquisse?: boolean;
  $name?: boolean;
  $left?: boolean;
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
      font-size: 24px;
      text-decoration: underline;
      text-align: left;
    `}

    ${(props) =>
    props.$left &&
    css`
      width: 10%;
      text-align: center;
    `}
`;

const Textarea = styled.textarea`
  --border-color: #9fa0a0;
  --background-color: #434141;

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
