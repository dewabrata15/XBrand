import { Db, ObjectId } from "mongodb";
import { client } from "../config";

const DATABASE_NAME = process.env.DATABASE_NAME;
const db: Db = client.db(DATABASE_NAME);

export interface ProductModels {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export type MessageAction = string;

export const getProduct = async (
  searching: string,
  start: number,
  limit: number
) => {
  const regex = new RegExp(searching, "i");
  const products = await db
    .collection("products")
    // serach
    .find<ProductModels>({
      $or: [{ name: regex }],
    })
    .skip(start)
    .limit(limit)
    .toArray();
  return products;
};

export const getProductById = async (slug: string) => {
  const product = await db
    .collection("products")
    .findOne<ProductModels>({ slug: slug });

  return product;
};
