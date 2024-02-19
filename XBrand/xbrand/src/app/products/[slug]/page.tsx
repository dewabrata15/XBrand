import { ResponseAction } from "@/app/login/page";
import BtnAddWishlist from "@/components/btnAddWishlist";
import { ProductModels } from "@/db/models/product";
import { cookies } from "next/headers";
import Image from "next/image";
import { route } from "../../../../router/routes";

export default async function DetailProducts({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const response = await fetch(`${route}api/products/${params.slug}`, {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  const result = (await response.json()) as ResponseAction<ProductModels>;
  if (!result.data) throw new Error("data not founds");

  return (
    <section className="w-full h-screen pt-20 pb-3 px-10">
      <div className="w-full h-full flex border-2 border-gray-100 rounded-md">
        <div className="w-1/2 h-full shadow-lg p-5 flex flex-col justify-center items-center rounded-s-md">
          {/* corasel */}
          <div className="carousel w-[90%] h-[93%]">
            {result.data?.images.map((el, index) => {
              return (
                <div
                  key={index + 1}
                  id={`item${index + 1}`}
                  className="carousel-item w-full rounded-md overflow-hidden"
                >
                  <Image src={el} width={500} height={500} alt="product" />
                </div>
              );
            })}
          </div>
          <div className="flex justify-center w-full py-2 gap-2">
            {result.data?.images.map((el, index) => {
              return (
                <a
                  key={index + 1}
                  href={`#item${index + 1}`}
                  className="btn btn-xs bg-slate-800 text-white duration-300 ease-in-out transition-all hover:bg-slate-600 border-none"
                >
                  {index + 1}
                </a>
              );
            })}
          </div>
        </div>
        <div className="w-1/2 h-full bg-gray-200 flex justify-around items-start flex-col p-5 text-black rounded-e-md">
          {/* title */}
          <div className="flex flex-col">
            <h1 className="text-[30px] font-bold">{result.data?.name}</h1>
            <p className="text-[20px] mt-2">{result.data?.excerpt}</p>
            <div className="mt-3 flex w-full justify-start flex-wrap">
              {result.data?.tags.map((el, index) => {
                return (
                  <h1
                    key={index + 1}
                    className="border-2 border-gray-500 px-6 py-1 rounded-full m-2"
                  >
                    {el}
                  </h1>
                );
              })}
            </div>
          </div>
          {/* des & price */}
          <p className="text-[15px] flex flex-col">
            description:
            <span>{result.data?.description}</span>
          </p>
          <p className="text-[20px]">
            price: Rp.
            <span className="font-bold">{result.data?.price}.000</span>
          </p>

          <BtnAddWishlist productId={result.data?._id} />
        </div>
      </div>
    </section>
  );
}
