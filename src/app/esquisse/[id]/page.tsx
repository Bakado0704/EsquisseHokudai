import { Fragment } from "react";
import Post from "@/models/post";
import Image from "next/image";
import { dummyData } from "@/dummy-data/dummy-data";

function ProductDetailPage({props.params.id}) {
  const productId = props.params.pid;

  const selectedPost = dummyData.find((post) => post.id === productId);

  console.log(props);

  if (!selectedPost) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Image src={selectedPost.image} alt="" width={300} height={200} />
      <div>
        {selectedPost.category.projectType}
        {selectedPost.category.buildingType}
        {selectedPost.category.toolType}
      </div>
      <p>{selectedPost.title}</p>
      <p>{selectedPost.user.username}</p>
      <p>{selectedPost.createdAt}</p>
    </div>
  );
}

// async function getData() {
//   const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
//   const jsonData = await fs.readFile(filePath);
//   const data = JSON.parse(jsonData);

//   return data;
// }

// export async function getStaticProps(context) {
//   const { params } = context;

//   const productId = params.pid;

//   const data = await getData();

//   const product = data.products.find((product) => product.id === productId);

//   if (!product) {
//     return { notFound: true };
//   }

//   return {
//     props: {
//       loadedProduct: product,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const data = await getData();

//   const ids = data.products.map((product) => product.id);

//   const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

//   return {
//     paths: pathWithParams,
//     fallback: true,
//   };
// }

export default ProductDetailPage;
