// import { getDatabase, ref, child, push, update } from "firebase/database";

// export async function writeNewPost(uid, username, picture, title, body) {
//   const db = getDatabase();

//   // A post entry.
//   const postData = {
//     author: username,
//     uid: uid,
//     body: body,
//     title: title,
//     starCount: 0,
//     authorPic: picture,
//   };

//   // Get a key for a new Post.
//   const newPostKey = push(child(ref(db), "posts")).key;

//   // Write the new post's data simultaneously in the posts list and the user's post list.
//   const updates = {};
//   updates["/posts/" + newPostKey] = postData;
//   updates["/user-posts/" + uid + "/" + newPostKey] = postData;

//   return update(ref(db), updates);
// }

// import { getDatabase, ref, child, get } from "firebase/database";

// export async function changePost() {
//   const dbRef = ref(getDatabase());
//   get(child(dbRef, `posts`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
