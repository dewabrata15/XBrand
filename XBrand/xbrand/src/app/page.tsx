import CardHome from "@/components/cardHome";
import FooterHome from "@/components/footer";
import Link from "next/link";
import { route } from "../../router/routes";
import { cookies } from "next/headers";

export default async function Home() {
  const response = await fetch(route + "api/products", {
    method: "GET",
    headers: {
      Cookie: cookies().toString(),
    },
  });
  const result = await response.json();

  if (!result.data) throw new Error("internal server error");
  const fewData = result.data.slice(0, 5);

  return (
    <>
      {/* banner */}
      <section className="w-full h-screen pt-16">
        <div className="banner w-full h-full"></div>
      </section>

      {/* des */}
      <section className="w-full h-[300px]">
        <div className="w-full h-full flex justify-center items-center bg-black text-white">
          <div className="w-1/2 h-full p-10 text-center flex justify-center items-center backdrop-blur-md">
            <h1>
              Welcome to XBrand, the haven for fashion enthusiasts seeking more
              than just ordinary attire. With heart-captivating collections
              ranging from classic garments to the latest styles, XBrand
              delivers an unforgettable shopping experience. Each piece is
              meticulously chosen to offer striking style and unparalleled
              quality
            </h1>
          </div>
          <div className="w-1/2 h-full p-10 text-center flex justify-center items-center">
            <h1>
              From the latest trends to timeless designs, we are here to cater
              to your fashion needs and help you express yourself with a unique
              flair. Discover new inspirations and radiate confidence through
              quality attire from XBrand
            </h1>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="w-fullbg-red-200 flex justify-center p-20 flex-col items-center">
        <h1 className="text-[40px] font-bold m-10">
          Special Offers <span className="text-red-600">!</span>
        </h1>
        {/* card */}
        <div className="w-full flex flex-wrap justify-center">
          {fewData &&
            fewData.map((el: any) => {
              return <CardHome key={el._id.toString()} product={el} />;
            })}
        </div>

        <Link
          href="/products"
          className="mt-5 duration-300 ease-in-out transition-all hover:text-slate-800 hover:underline"
        >
          see more
        </Link>
      </section>

      <FooterHome />
    </>
  );
}
