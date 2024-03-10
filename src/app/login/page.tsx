"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LanguageIcon from "@mui/icons-material/Language";
import { lusitana } from "@/app/fonts";
import KeyIcon from "@mui/icons-material/Key";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState("Login");

  const onLogin = async () => {
    try {
      setLoading("Processing");
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/welcome");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading("Login");
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div
      className={`${lusitana.className} flex flex-col items-center justify-center min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto`}
    >
      <div className="flex flex-row items-center leading-none text-white py-2 m-2">
        <LanguageIcon className="h-12 w-12 rotate-[15deg]" />
        <p className="text-[44px]">Infobyte Auth</p>
      </div>

      <div className="py-2 m-2">
        <h1 className="text-xl">Please Login to Continue </h1>
      </div>

      <div className="flex flex-col items-left justify-left p-2 w-3/4">
        <label htmlFor="email">Email</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="example@email.com"
        />

        <label htmlFor="password">Password</label>
        <input
          className="p-2 border border-gray-300 rounded-lg  focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Password"
        />

        <Link href="/forgotpassword" className="mb-4 text-sm" >Forgot Password</Link>

        <button
          onClick={onLogin}
          className="flex p-2 bg-slate-700 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:bg-slate-500/25 "
          disabled={buttonDisabled}
        >
          {loading} <KeyIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
      </div>

      <span>Don't have an Account yet?</span>
      <Link href="/signup">Visit Signup Page</Link>
      <Toaster />
    </div>
  );
}
