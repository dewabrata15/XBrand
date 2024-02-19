"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { route } from "../../../router/routes";

export default function Register() {
  const navigate = useRouter();
  const [errInput, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const inputUser = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const submitUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(route + "api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (result.error) {
        setError(result.error);
        navigate.push("/register");
      } else {
        navigate.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full h-screen flex pt-14 justify-center items-center relative">
      {errInput ? (
        <div className="absolute top-16 left-0 bg-red-500 px-10 py-2 flex items-center text-white">
          <i className="fas fa-exclamation-triangle me-3" />
          <h1>{errInput}</h1>
        </div>
      ) : (
        " "
      )}

      <div className="w-[40%] h-[85%] flex rounded-lg overflow-hidden shadow-xl border-2 border-slate-800">
        <div className="w-full h-full  p-10 flex justify-center items-center flex-col ">
          {/* <!-- title --> */}
          <div className="w-full h-12 mb-3 border-b-2 border-b-slate-800">
            <h1 className="text-[20px]">Register</h1>
          </div>
          {/* <!-- form --> */}
          <form
            action=""
            className="h-[90%] w-full flex flex-col justify-between"
          >
            <div className="">
              {/* <!-- name --> */}
              <div className="flex flex-col mb-2">
                <label htmlFor="name" className="text-[17px] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="name..."
                  className="px-3 h-10 rounded-md border-2 border-slate-700"
                  onChange={(e) => {
                    inputUser(e);
                  }}
                />
              </div>
              {/* <!-- username --> */}
              <div className="flex flex-col mb-2">
                <label htmlFor="username" className="text-[17px] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username..."
                  className="px-3 h-10 rounded-md border-2 border-slate-700"
                  onChange={(e) => {
                    inputUser(e);
                  }}
                />
              </div>
              {/* <!-- email --> */}
              <div className="flex flex-col mb-2">
                <label htmlFor="email" className="text-[17px] mb-1">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="email..."
                  className="px-3 h-10 rounded-md border-2 border-slate-700"
                  onChange={(e) => {
                    inputUser(e);
                  }}
                />
              </div>
              {/* <!-- password --> */}
              <div className="flex flex-col mb-2">
                <label htmlFor="password" className="text-[17px] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password..."
                  className="px-3 h-10 rounded-md border-2 border-slate-700"
                  onChange={(e) => {
                    inputUser(e);
                  }}
                />
              </div>
            </div>
            <button
              className="h-10 w-[40%] mt-3 bg-slate-800 rounded-md mx-auto text-white duration-300 ease-in-out transition-all hover:bg-slate-600"
              onClick={(e) => {
                submitUser(e);
              }}
            >
              submit
            </button>
          </form>
          {/* <!-- register --> */}
          <p className="mt-2">
            dont have account?{" "}
            <Link
              href={"/login"}
              className="text-blue-800 cursor-pointer duration-300 ease-in-out transition-all hover:font-bold"
            >
              sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
