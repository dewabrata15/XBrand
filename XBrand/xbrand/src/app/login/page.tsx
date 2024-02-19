import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { route } from "../../../router/routes";

export type ResponseAction<T> = {
  data?: T;
  message?: string;
};

export default function Login(context: any) {
  const errorUser = context.searchParams;
  const errorArray = Object.keys(errorUser);

  async function LoginSubmit(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(route + "api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result = await response.json();

    if (result.error) {
      return redirect(`/login?${result.error}`);
    } else {
      cookies().set(`Authorization`, `Bearer ${result.data.access_Token}`);
      return redirect("/");
    }
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      {errorArray.length > 0 ? (
        <div className="absolute top-16 left-0 bg-red-500 px-10 py-2 flex items-center text-white">
          <i className="fas fa-exclamation-triangle me-3" />
          <h1>{errorArray}</h1>
        </div>
      ) : (
        ""
      )}
      <div className="w-[40%] h-[70%]  flex rounded-lg overflow-hidden shadow-xl border-2 border-slate-800">
        <div className="w-full h-full p-10 flex justify-center items-center flex-col">
          {/* <!-- title --> */}
          <div className="w-full h-12 mb-3 border-b-2 border-b-slate-800">
            <h1 className="text-[20px]">Login</h1>
          </div>
          {/* <!-- form --> */}
          <form
            action={LoginSubmit}
            className="h-[90%] w-full flex flex-col justify-between"
          >
            <div className="">
              {/* <!-- email --> */}
              <div className="flex flex-col mb-3">
                <label htmlFor="email" className="text-[30px] mb-3">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="email..."
                  className="px-3 h-12 rounded-md border-2 border-slate-700"
                />
              </div>
              {/* <!-- password --> */}
              <div className="flex flex-col">
                <label htmlFor="password" className="text-[30px] mb-3">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password..."
                  className="px-3 h-12 rounded-md border-2 border-slate-700"
                />
              </div>
            </div>
            <button
              type="submit"
              className="h-12 w-[50%] mt-5 bg-slate-800 rounded-md mx-auto text-white duration-300 ease-in-out transition-all hover:bg-slate-600"
            >
              submit
            </button>
          </form>

          {/* <!-- register --> */}
          <p className="mt-2">
            dont have account?
            <Link
              href={"/register"}
              className="text-blue-800 cursor-pointer duration-300 ease-in-out transition-all hover:font-bold"
            >
              {" "}
              sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
