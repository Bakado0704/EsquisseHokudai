import { category } from "@/dummy-data/dummy-data";
import Image from "next/image";
import Link from "next/link";

// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div>
      <h1>カテゴリ</h1>
      <ul>
        {category.map((category) => (
          <li key={category.id[0]}>
            <Link href={`/category/${category.id}`}>
              <Image src={category.image} alt="" width={300} height={200} />
              <p>{category.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
