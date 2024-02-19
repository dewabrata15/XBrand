import { ProductModels } from "@/db/models/product";
import Image from "next/image";
import Link from "next/link";

export default function CardHome({ product }: { product: ProductModels }) {
  return (
    <>
      <Link
        href={`/products/${product.slug}`}
        className="card w-80 h-[450px] bg-base-100 shadow-xl m-5 relative overflow-hidden group"
      >
        <div className="card h-full bg-base-100 shadow-xl">
          <figure>
            <Image src={product.images[0]} alt="product"  width={500} height={500} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{product.name}</h2>
          </div>
        </div>
      </Link>
    </>
  );
}
