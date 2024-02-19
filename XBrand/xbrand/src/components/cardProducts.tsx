import { ProductModels } from "@/db/models/product";
import Image from "next/image";
import Link from "next/link";

export default function CardProducts({ data }: { data: ProductModels }) {
  return (
    <div className="card w-72 bg-base-100 shadow-sm m-2 duration-300 ease-in-out transition-all hover:scale-105">
      <div className="card h-full bg-base-100 shadow-xl">
        <figure>
          <Image src={data.images[0]} alt="product" width={500} height={500}/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data.name}</h2>
          <p>{data.excerpt}</p>
          <h1 className="my-2">
            Price: Rp. <span className="font-bold">{data.price}.000</span>
          </h1>
          <Link
            href={`/products/${data.slug}`}
            className="px-10 py-2 bg-slate-800 rounded-md flex justify-center items-center text-white duration-300 ease-in-out transition-all hover:bg-slate-600"
          >
            check now
          </Link>
        </div>
      </div>
    </div>
  );
}
