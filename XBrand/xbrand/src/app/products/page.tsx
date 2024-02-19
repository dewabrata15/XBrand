"use client";
import { ResponseAction } from "@/app/login/page";
import CardProducts from "@/components/cardProducts";
import { ProductModels } from "@/db/models/product";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { route } from "../../../router/routes";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ProductsList() {
  const [product, setProduct] = useState<ProductModels[]>([]);
  const [search, setSearch] = useState("");

  const [hasMore, setHasMore] = useState(true);

  const getAllProduct = async (
    start = 0,
    limit = 10
  ): Promise<ProductModels[]> => {
    const response = await fetch(
      `${route}api/products?start=${start}&limit=${limit}`
    );
    const result = (await response.json()) as ResponseAction<ProductModels[]>;
    if (!result.data) throw new Error("internal server error");
    return result.data;
  };

  useEffect(() => {
    const asyncFn = async () => {
      const data = await getAllProduct();
      setProduct(data);
    };
    asyncFn();
  }, []);

  const fetchMoreData = async () => {
    const newData = await getAllProduct(product.length, 10);
    setProduct([...product, ...newData]);

    setHasMore(newData.length >= 10);
  };

  const inputUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const submitUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${route}api/products?search=${search}`);
      const result = (await response.json()) as ResponseAction<ProductModels[]>;

      if (!result.data) throw new Error("internal server error");

      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full py-20 px-14 flex justify-center items-center flex-col">
      {/* search */}
      <div className="w-[90%] h-12 flex shadow-md">
        <button
          className="flex justify-center items-center w-[10%] bg-slate-800 text-white rounded-s-md"
          onClick={(e) => {
            submitUser(e);
          }}
        >
          <i className="fas fa-search text-[30px]" />
        </button>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search product..."
          className="h-full w-[90%] px-5 text-[20px] outline-none
          border-none"
          onChange={(e) => {
            inputUser(e);
          }}
        />
      </div>

      {/* card */}
      <InfiniteScroll
        dataLength={product.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="w-full mt-4 flex flex-wrap justify-center overflow-hidden">
          {product.map((el) => {
            return <CardProducts key={el._id.toString()} data={el} />;
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
}
