import {
  addWishlist,
  delWishlist,
  getWishlist,
  wishListModel,
} from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ResponseInterface } from "../users/route";
import { verifyToken } from "@/helper/jose";

export const POST = async (request: NextRequest): Promise<Response> => {
  const cookie = request.cookies.get("Authorization");

  const rawToken = cookie?.value.split(" ");
  if (!rawToken) {
    return NextResponse.json<ResponseInterface<string>>(
      {
        statusCode: 401,
        message: "invalid token",
        error: "invalid token",
      },
      { status: 401 }
    );
  }
  if (rawToken[0] !== "Bearer") {
    return NextResponse.json<ResponseInterface<string>>(
      {
        statusCode: 401,
        message: "invalid token",
        error: "invalid token",
      },
      { status: 401 }
    );
  }

  const token = await verifyToken<{ _id: string }>(rawToken[1]);

  const userId = token.payload._id;

  if (!userId) {
    return NextResponse.json<ResponseInterface<string>>(
      {
        statusCode: 403,
        message: "Unauthorize",
        error: "Unauthorize",
      },
      { status: 403 }
    );
  }
  const body = (await request.json()) as {
    productId: ObjectId;
  };

  const result = await addWishlist(body.productId, userId);

  return NextResponse.json<ResponseInterface<string | { error: unknown }>>(
    {
      statusCode: 200,
      message: "success GET",
    },
    { status: 200 }
  );
};

export const GET = async (request: NextRequest): Promise<Response> => {
  const cookie = request.cookies.get("Authorization");

  const rawToken = cookie?.value.split(" ");
  if (!rawToken) {
    return NextResponse.json<ResponseInterface<string>>(
      {
        statusCode: 401,
        message: "invalid token",
      },
      { status: 401 }
    );
  }
  if (rawToken[0] !== "Bearer") {
    return NextResponse.json<ResponseInterface<string>>(
      {
        statusCode: 401,
        message: "invalid token",
        error: "invalid token",
      },
      { status: 401 }
    );
  }

  const token = await verifyToken<{ _id: string }>(rawToken[1]);

  const userId = token.payload._id;

  const data = await getWishlist(userId);

  return NextResponse.json<ResponseInterface<wishListModel[]>>(
    {
      statusCode: 200,
      message: "success GET",
      data: data,
    },
    { status: 200 }
  );
};

export const DELETE = async (request: NextRequest) => {
  const body = (await request.json()) as {
    wishlistId: ObjectId;
  };

  const response = await delWishlist(body.wishlistId);

  return NextResponse.json<ResponseInterface<string>>(
    {
      statusCode: 200,
      message: "success DELETE",
      data: response,
    },
    { status: 200 }
  );
};
