import { BuildingType, ProjectType, ToolType } from "@/types/category";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, update, get, set } from "firebase/database";

export async function changePost(
  id: string,
  index: number,
  title: string,
  category: {
    ProjectType: ProjectType;
    buildingType: BuildingType;
    toolType: ToolType;
  },
  image: string,
  description: string
) {
  const dbRef = ref(getDatabase());
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(category);

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

        const updates = {};
        //@ts-ignore
        updates[`/posts/${Object.keys(snapshot.val())[index]}`] = postData;
        update(ref(db), updates);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function deletePost(index: number) {
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

export async function changeEsquisse(
  id: string,
  key: string,
  index: number,
  description: string
) {
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

        const updates = {};
        //@ts-ignore
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

export async function deleteEsquisse(index: number) {
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
