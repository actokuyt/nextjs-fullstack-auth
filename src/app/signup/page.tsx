"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { lusitana } from "@/app/fonts";
import LanguageIcon from "@mui/icons-material/Language";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState("SignUp");

  const onSignup = async () => {
    try {
      setLoading("Processing");
      const response = await axios.post("/api/users/signup", user);
      toast.success("Account Created Successfully");
      router.push("/verifyemail");
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading("SignUp");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
        <h1 className="text-xl">Create an Account to Continue </h1>
      </div>

      <div className="flex flex-col items-left justify-left p-2 w-3/4">
        <label htmlFor="username">Username</label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter Username"
        />
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
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter Password"
        />
        <button
          onClick={onSignup}
          className="flex p-2 bg-slate-700 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:bg-slate-500/25 "
          disabled={buttonDisabled}
        >
          {loading} <TextSnippetIcon className="ml-auto h-5 w-5 text-gray-50" />
        </button>
      </div>

      <span>Already have an account?</span>
      <Link href="/login">Visit login page</Link>
      <Toaster />
    </div>
  );
}
