import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "./storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  updatePassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const actionCodeSettings = {
  url: "https://esquisse-chat.vercel.app",
  handleCodeInApp: true,
};




//メール登録
export const emailRegister = async (
  email: string,
  password: string,
  displayName: string
) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: displayName,
        }).catch(() => {
          alert("もう一度入力ください");
        });
      }
    })
    .catch(() => {
      alert("すでにこのメールアドレスは使われています");
    });

  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser, actionCodeSettings);
  }
};

//アカウント作成
export const createAccount = async (displayName: string, password: string) => {
  const auth = getAuth();

  if (auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        console.log("ニックネーム登録できた");
      })
      .catch(() => {
        console.log("ニックネーム登録できない");
      });

    await updatePassword(auth.currentUser, password)
      .then(() => {
        console.log("パスワード登録できた");
      })
      .catch(() => {
        console.log("パスワード登録できない");
      });
  }
};

//投稿をsubmit
export const postSubmit = async (
  title: string,
  category: {
    projectType: (ProjectType | BuildingType | ToolType)[];
    buildingType: (ProjectType | BuildingType | ToolType)[];
    toolType: (ProjectType | BuildingType | ToolType)[];
  },
  image: string,
  description: string
) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    await fetch(
      "https://react-getting-started-2a850-default-rtdb.firebaseio.com/posts.json",
      {
        method: "POST",
        body: JSON.stringify({
          id: new Date().getTime().toString(),
          key: new Date().getTime().toString(),
          createdAt: new Date().toDateString(),
          title: title,
          category: category,
          image: image,
          description: description,
          user: {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => response.json());
  }
};

//firebase上のpostsを取得
export const getAllPosts = async () => {
  const response = await fetch(
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com/posts.json"
  );
  const data = await response.json();

  const posts = [];

  for (const key in data) {
    posts.push({
      id: key,
      imageSource: (await getImage(data[key].image)).toString(),
      ...data[key],
    });
  }

  return posts;
};

export const getImage = async (image: string) => {
  const res = await getDownloadURL(ref(storage, "image/" + image));

  return res;
};
