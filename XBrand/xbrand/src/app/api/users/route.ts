import { AccessToken, getUser, loginUser, UserModel } from "@/db/models/users";
import { NextRequest, NextResponse } from "next/server";

export interface ResponseInterface<T> {
  statusCode: number;
  message?: string;
  error?: any;
  data?: T;
}

// GET
export const GET = async (): Promise<Response> => {
  const dataUsers = await getUser();

  return NextResponse.json<ResponseInterface<UserModel[]>>(
    {
      statusCode: 200,
      message: "success GET",
      data: dataUsers,
    },
    { status: 200 }
  );
};

// POST
export const POST = async (request: NextRequest): Promise<Response> => {
  const body = (await request.json()) as {
    email: string;
    password: string;
  };
  const response = await loginUser(body.email, body.password);

  if (response.error) {
    return NextResponse.json<ResponseInterface<AccessToken>>(
      {
        statusCode: 400,
        message: "invalid input",
        error: response.error,
      },
      { status: 400 }
    );
  } else {
    const token = response.access_Token;
    if (!token) throw new Error("invalid token");
    return NextResponse.json<ResponseInterface<AccessToken>>(
      {
        statusCode: 401,
        message: "invalid token",
        data: { access_Token: token },
      },
      { status: 401 }
    );
  }
};
