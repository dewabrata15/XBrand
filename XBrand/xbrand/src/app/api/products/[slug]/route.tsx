import { NextRequest, NextResponse } from "next/server";
import { ResponseInterface } from "../../users/route";
import { ProductModels, getProductById } from "@/db/models/product";

export const GET = async (
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
): Promise<Response> => {
  const products = await getProductById(slug);

  if (!products) {
    return NextResponse.json<ResponseInterface<string>>(
      {
        statusCode: 500,
        message: "data not found",
        error: "internal server error",
      },
      { status: 500 }
    );
  }
  return NextResponse.json<ResponseInterface<ProductModels>>(
    {
      statusCode: 200,
      message: "success GET",
      data: products,
    },
    { status: 200 }
  );
};
