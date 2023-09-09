"use client";

import Link from "next/link";
import { dummyData } from "@/dummy-data/dummy-data";
import Image from "next/image";

export default function Page() {
  // console.log(dummyData);

  return (
    <div>
      <h1>ホーム</h1>
      <ul>
        {dummyData.map((dummyData) => (
          <li key={dummyData.id}>
            <Link href={`/esquisse/${dummyData.id}`}>
              <Image src={dummyData.image} alt="" width={300} height={200} />
              <div>
                {dummyData.category.projectType}
                {dummyData.category.buildingType}
                {dummyData.category.toolType}
              </div>
              <p>{dummyData.title}</p>
              <p>{dummyData.user.username}</p>
              <p>{dummyData.createdAt}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/post">投稿する</Link>
    </div>
  );
}
