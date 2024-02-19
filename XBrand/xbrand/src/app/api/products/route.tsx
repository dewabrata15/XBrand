import { NextRequest, NextResponse } from "next/server";
import { ResponseInterface } from "../users/route";
import { ProductModels, getProduct } from "@/db/models/product";

export const GET = async (request: NextRequest): Promise<Response> => {
  const { searchParams } = new URL(request.url);
  let searching = searchParams.get("search");
  let start = searchParams.get("start");
  let limit = searchParams.get("limit");
  if (!searching) {
    searching = "";
  }

  const products = await getProduct(searching, Number(start), Number(limit));

  return NextResponse.json<ResponseInterface<ProductModels[]>>(
    {
      statusCode: 200,
      message: "success GET",
      data: products,
    },
    { status: 200 }
  );
};
