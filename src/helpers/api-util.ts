import { BuildingType, ProjectType, ToolType } from "@/types/category";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  child,
  update,
  get,
  set,
} from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { StaticImageData } from "next/image";
import storage from "./storage";

//投稿を変更する
export const changePost = async (
  id: string,
  index: number,
  title: string,
  category: {
    projectType: (ProjectType | BuildingType | ToolType)[];
    buildingType: (ProjectType | BuildingType | ToolType)[];
    toolType: (ProjectType | BuildingType | ToolType)[];
  },
  image: string | StaticImageData,
  description: string
) => {
  const dbRef = databaseRef(getDatabase());
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

  get(child(dbRef, `posts`))
    .then((snapshot) => {
      if (snapshot.exists() && user) {
        const postData = {
          id: id,
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
        };

        const updates: any = {};
        updates[`/posts/${Object.keys(snapshot.val())[index]}`] = postData;
        update(databaseRef(db), updates);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

//
export const deletePost = async (index: number) => {
  const dbRef = databaseRef(getDatabase());
  const db = getDatabase();

  get(child(dbRef, `posts`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        set(
          databaseRef(db, `/posts/${Object.keys(snapshot.val())[index]}`),
          null
        );
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const changeEsquisse = async (
  id: string,
  key: string,
  index: number,
  description: string
) => {
  const dbRef = databaseRef(getDatabase());
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

  get(child(dbRef, `esquisses`))
    .then((snapshot) => {
      if (snapshot.exists() && user) {
        const postData = {
          id: id,
          key: key,
          createdAt: new Date().toDateString(),
          description: description,
          user: {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
          },
        };

        const updates: any = {};
        updates[`/esquisses/${Object.keys(snapshot.val())[index]}`] = postData;
        update(databaseRef(db), updates);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteEsquisse = async (index: number) => {
  const dbRef = databaseRef(getDatabase());
  const db = getDatabase();

  get(child(dbRef, `esquisses`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        set(
          databaseRef(db, `/esquisses/${Object.keys(snapshot.val())[index]}`),
          null
        );
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
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

//firebase上のesquissesを取得
export const getAllEsquisses = async () => {
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
};

//ユーザー情報取得
export const getUser = () => {
  const user = getAuth().currentUser;
  return user;
};

//サインイン
const auth = getAuth();
export const signIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch(() => {
      alert("メールアドレスまたはパスワードが違います");
    });
};

//サインアウト
export const signout = async () => {
  const auth = getAuth();
  await signOut(auth);
};

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
  const res = await getDownloadURL(storageRef(storage, "image/" + image));

  return res;
};

//storageに画像をup
export const upImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files![0];
  const stRef = storageRef(storage, "image/" + file.name);
  await uploadBytes(stRef, file);
};

//storageからurlを取得
export const importImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files![0];
  const stRef = storageRef(storage, "image/" + file.name);
  const url = getDownloadURL(stRef);

  return url;
};

//アップロードの管理
export const imageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files![0];
  const stRef = storageRef(storage, "image/" + file.name);
  const upload = uploadBytesResumable(stRef, file);

  return upload;
}

//アカウント作成
// export const createAccount = async (displayName: string, password: string) => {
//   const auth = getAuth();

//   if (auth.currentUser) {
//     await updateProfile(auth.currentUser, {
//       displayName: displayName,
//     })
//       .then(() => {
//         console.log("ニックネーム登録できた");
//       })
//       .catch(() => {
//         console.log("ニックネーム登録できない");
//       });

//     await updatePassword(auth.currentUser, password)
//       .then(() => {
//         console.log("パスワード登録できた");
//       })
//       .catch(() => {
//         console.log("パスワード登録できない");
//       });
//   }
// };
