import { NextRequest, NextResponse } from "next/server";
import { ResponseInterface } from "../users/route";
import { register } from "@/db/models/users";

export const POST = async (request: NextRequest): Promise<Response> => {
  const body = await request.json();
  const response = await register(body);

  if (typeof response === "object") {
    return NextResponse.json<ResponseInterface<any>>(
      {
        statusCode: 400,
        message: "invalid input",
        error: response.error,
      },
      { status: 400 }
    );
  }

  return NextResponse.json<ResponseInterface<string>>(
    {
      statusCode: 201,
      message: "success POST",
      data: response,
    },
    { status: 201 }
  );
};
