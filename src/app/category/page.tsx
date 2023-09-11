import { buildingCategory } from "@/dummy-data/dummy-data";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>カテゴリ</h1>
      <ul>
        {buildingCategory.map((category) => {
          return (
            <li key={category.id[0]}>
              <Link href={`/category/${category.id[0]}`}>
                {category.image && (
                  <Image src={category.image} alt="" width={300} height={200} />
                )}
                <p>{category.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
