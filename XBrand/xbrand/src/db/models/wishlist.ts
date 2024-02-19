import { Db, ObjectId } from "mongodb";
import { client } from "../config";
import { ProductModels } from "./product";

const DATABASE_NAME = process.env.DATABASE_NAME;
const db: Db = client.db(DATABASE_NAME);

export interface wishListModel {
  _id: ObjectId;
  productId: ObjectId;
  userId: ObjectId;
  createdAt: string;
  updatedAt: string;
  userWishlist: ProductModels[];
}

export const addWishlist = async (productId: ObjectId, userId: string) => {
  try {
    // required
    if (!productId) throw "productId is required";
    if (!userId) throw "userId is required";

    const newUserId = new ObjectId(userId);
    const newProductId = new ObjectId(productId);
    const dateNow = Date.now().toString();
    // console.log(newUserId, newProductId, dateNow, ">>>>>>>>");

    await db.collection("wishlist").insertOne({
      productId: newProductId,
      userId: newUserId,
      createdAt: dateNow,
      updatedAt: dateNow,
    });

    return "success add to wishList";
  } catch (error) {
    return { error: error };
  }
};

export const getWishlist = async (userId: string): Promise<wishListModel[]> => {
  const data = await db
    .collection("wishlist")
    .aggregate<wishListModel>([
      {
        $match: { userId: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "userWishlist",
        },
      },
    ])
    .toArray();

  return data;
};

export const delWishlist = async (wishlistId: ObjectId): Promise<any> => {
  try {
    const data = await db
      .collection("wishlist")
      .findOne({ _id: new ObjectId(wishlistId) });

    if (!data) throw "data not founds";
    await db
      .collection("wishlist")
      .deleteOne({ _id: new ObjectId(wishlistId) });

    return "success delete wishlist";
  } catch (error) {
    console.log(error);
    return error;
  }
};
