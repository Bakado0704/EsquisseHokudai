import { buildingCategory } from "@/categoryData/categoryData";
import NavHeader from "@/components/nav/NavHeader/NavHeader";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <NavHeader />
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
