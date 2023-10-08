import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, child, update, get, set } from "firebase/database";
import { StaticImageData } from "next/image";

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
  const dbRef = ref(getDatabase());
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
        updates[`/posts/${Object.keys(snapshot.val())[index]}` ] = postData;
        update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const deletePost =  async (index: number) => {
  const dbRef = ref(getDatabase());
  const db = getDatabase();

  get(child(dbRef, `posts`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        set(ref(db, `/posts/${Object.keys(snapshot.val())[index]}`), null);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const changeEsquisse = async (
  id: string,
  key: string,
  index: number,
  description: string
) => {
  const dbRef = ref(getDatabase());
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

        const updates : any = {};
        updates[`/esquisses/${Object.keys(snapshot.val())[index]}`] = postData;
        update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const deleteEsquisse = async (index: number) => {
  const dbRef = ref(getDatabase());
  const db = getDatabase();

  get(child(dbRef, `esquisses`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        set(ref(db, `/esquisses/${Object.keys(snapshot.val())[index]}`), null);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

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
