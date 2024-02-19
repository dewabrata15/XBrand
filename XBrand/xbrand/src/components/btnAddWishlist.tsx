"use client";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { route } from "../../router/routes";

export default function BtnAddWishlist({ productId }: { productId: ObjectId }) {
  const navigate = useRouter();

  const AddWishlist = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${route}api/wishlist/`, {
        method: "POST",
        body: JSON.stringify({
          productId,
        }),
      });

      navigate.push("/wishlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="px-20 py-3 rounded-md bg-slate-800 text-[30px] text-white duration-300 ease-in-out transition-all hover:bg-slate-600"
      onClick={(e) => {
        AddWishlist(e);
      }}
    >
      add wishtlist
    </button>
  );
}
