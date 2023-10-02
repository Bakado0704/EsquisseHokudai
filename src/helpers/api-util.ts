import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getDownloadURL, ref } from "firebase/storage";
import storage from "./firebase";
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
  url: "https://esquisse-chat.vercel.app/",
  handleCodeInApp: true,
};

//ユーザー情報取得
export const getUser = () => {
  const user = getAuth().currentUser;
  return user;
};

//サインイン
export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
};

//サインアウト
export const signout = async () => {
  const auth = getAuth();
  await signOut(auth);
};

//メール登録
export const emailRegister = async (email: string, password: string) => {
  const auth = getAuth();

  console.log()
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("usercreate"+user);
    })
    .catch((error) => {
      console.log(error);
      console.log("usercreateError");
    });

  if (auth.currentUser) {
    console.log("AuthcurrentError");

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

//エスキスをsubmit
export const esquisseSubmit = async (id: string, description: string) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    await fetch(
      "https://react-getting-started-2a850-default-rtdb.firebaseio.com/esquisses.json",
      {
        method: "POST",
        body: JSON.stringify({
          id: id,
          key: new Date().getTime().toString(),
          description: description,
          createdAt: new Date().toDateString(),
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
export async function getAllPosts() {
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
    "https://react-getting-started-2a850-default-rtdb.firebaseio.com/esquisses.json"
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

export const getImage = async (image: string) => {
  const res = await getDownloadURL(ref(storage, "image/" + image));

  return res;
};
