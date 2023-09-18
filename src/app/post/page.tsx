"use client";

import {
  buildingCategory,
  projectCategory,
  toolCategory,
} from "@/categoryData/categoryData";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import { getImage, postSubmit } from "@/helpers/api-util";
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
import { FormEvent, useRef, useState } from "react";

export default function Page() {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageSource, setImageSource] = useState<string | StaticImport>();
  const [imageName, setImageName] = useState<string>();

  async function submitFormHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current?.value;
    const enteredDescription = descriptionInputRef.current?.value;

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
      enteredTitle,
      { projectCategoryChecked, buildingCategoryChecked, toolCategoryChecked },
      imageName,
      enteredDescription
    ).then((data) => router.push("/home"));
  }

  const onFileUploadToFirebase = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);

    setImageName(file.name);
    await uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    }).then(() => {
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

  return (
    <div>
      <NavHeader />
      <h1>投稿</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="title">タイトル</label>
          <input type="text" id="title" ref={titleInputRef} />
        </div>
        <ul>
          {projectCategory.map((category) => {
            return (
              <li key={category.id[0]}>
                <label htmlFor="title">
                  <input
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
        </ul>
        <ul>
          {buildingCategory.map((category) => {
            return (
              <li key={category.id[0]}>
                <label htmlFor="title">
                  <input
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
        </ul>
        <ul>
          {toolCategory.map((category) => {
            return (
              <li key={category.id[0]}>
                <label htmlFor="title">
                  <input
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
        </ul>
        <div>
          <label htmlFor="image">写真</label>
          <input
            className="imageUploadInput"
            multiple
            name="imageURL"
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={onFileUploadToFirebase}
          />
        </div>

        {loading ? (
          <h2>アップロード中・・・</h2>
        ) : (
          <>
            {isUploaded && (
              <>
                {imageSource && (
                  <Image
                    src={imageSource}
                    alt="chrch"
                    width={300}
                    height={200}
                  />
                )}
              </>
            )}
          </>
        )}
        <div>
          <label htmlFor="description">内容</label>
          <input type="text" id="description" ref={descriptionInputRef} />
        </div>
        <button>投稿する</button>
      </form>
    </div>
  );
}
