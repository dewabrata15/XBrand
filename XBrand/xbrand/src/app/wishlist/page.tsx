"use client";
import { ResponseAction } from "@/app/login/page";
import { wishListModel } from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { route } from "../../../router/routes";

export default function WishList() {
  const [data, setData] = useState<wishListModel[]>([]);
  const [wishlistId, setWishlistId] = useState<ObjectId>();

  const getData = async () => {
    try {
      const response = await fetch(route + "api/wishlist/", {
        method: "GET",
      });

      const result = (await response.json()) as ResponseAction<wishListModel[]>;

      if (!result.data) throw new Error("internal server error");

      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const removeWishlist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(route + "api/wishlist/", {
        method: "DELETE",
        body: JSON.stringify({
          wishlistId,
        }),
      });

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full py-20 px-10 flex items-start flex-col">
      <h1 className="mb-5 text-[20px]">your wishlist:</h1>
      <div className="relative overflow-x-auto w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                no.
              </th>
              <th scope="col" className="px-6 py-3">
                thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                excerpt
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((el, index) => {
              return (
                <tr
                  key={index + 1}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  {el.userWishlist.map((products, idx) => {
                    return (
                      <>
                        <td className="px-6 py-4">
                          <Image
                            src={products.thumbnail}
                            width={500}
                            height={500}
                            alt="product"
                            className="w-[60px]"
                          />
                        </td>
                        <td className="px-6 py-4">{products.name}</td>
                        <td className="px-6 py-4">{products.excerpt}</td>
                        <td className="px-6 py-4">Rp. {products.price}.000</td>
                      </>
                    );
                  })}

                  <td className="">
                    <button
                      className="px-6 py-2 bg-red-500 rounded-md text-white"
                      onClick={(e) => {
                        // console.log("click");
                        setWishlistId(el._id);
                        removeWishlist(e);
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
