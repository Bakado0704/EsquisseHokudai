import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "./firebase";
import { StaticImageData } from "next/image";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  updatePassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const actionCodeSettings = {
  url: "http://localhost:3000/register/email-send/email-verified",
  handleCodeInApp: true,
};

//ユーザー情報取得
export const getUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    console.log({ displayName, email, emailVerified, uid });
  }
};

//サインイン
export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
};

//メール登録
export const emailRegister = async (email: string, password: string) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
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

//firebase上のpostsを取得
export async function getAllEvents() {
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
}

//firebase上のesquissesを取得
export async function getAllEsquisses() {
  const response = await fetch(
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com/esquisse.json"
  );
  const data = await response.json();

  const esquisses = [];

  for (const key in data) {
    esquisses.push({
      id: key,
      ...data[key],
    });
  }

  return esquisses;
}

export const getImage = async (image: StaticImageData) => {
  const res = await getDownloadURL(ref(storage, "image/" + image));
  return res;
};

//抽出されたpostを返す
export async function getFeaturedEvents() {
  const allPosts = await getAllEvents();
  return allPosts.filter((post) => post.isFeatured);
}

//合致したpostを返す
export async function getEventById(id: string) {
  const allPosts = await getAllEvents();

  return allPosts.find((post) => post.id === id);
}

//カテゴリに合うpostsを返す
export async function getFilteredEvents(
  dataFilter: ProjectType | BuildingType | ToolType
) {
  const allPosts = await getAllEvents();

  let filteredPosts = allPosts.filter((post) => {
    return (
      post.ProjectType === dataFilter[0] ||
      post.BuildingType === dataFilter[0] ||
      post.ToolType === dataFilter[0]
    );
  });

  return filteredPosts;
}
