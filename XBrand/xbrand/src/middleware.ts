import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./helper/jose";

export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
      const cookie = request.cookies.get("Authorization");

      if (!cookie) {
        return NextResponse.json(
          {
            message: "Authentication faileds",
          },
          {
            status: 401,
          }
        );
      }

      const rawToken = cookie?.value.split(" ");
      if (rawToken[0] === "Bearer") {
        throw new Error("invalid token");
      }

      const token = await verifyToken<{ _id: string }>(rawToken[1]);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", token.payload._id);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
