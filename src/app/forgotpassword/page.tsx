"use client";

import LanguageIcon from "@mui/icons-material/Language";
import { lusitana } from "@/app/fonts";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

export default function forgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("Change Password");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [token, setToken] = useState("");
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [error, setError] = useState(false);

  let payload = {
    email: email,
    token: token,
    password: password,
  };

  const onSubmitEmail = async () => {
    try {
      setLoading("Processing");
      const response = await axios.post("/api/users/forgotpassword", payload);
      toast.success("password reset link has been sent to your email");
      setEmail("");
    } catch (error: any) {
      setError(true)
      toast.error(error.response.data.error);
    } finally {
      setLoading("Change Password");
    }
  };

  const onChangePassword = async () => {
    try {
      setLoading("Processing");
      const response = await axios.post("/api/users/forgotpassword", payload);
      toast.success("Password Reset Successful");
      setPassword("");
      router.push("/login");
    } catch (error: any) {
      setError(true)
      toast.error(error.response.data.error);
    } finally {
      setLoading("Change Password");
    }
  };

  useEffect(() => {
    if (email.length > 0 || password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  });

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setIsPasswordChanged(true);
    }
  }, [token]);

  return (
    <div
      className={`${lusitana.className} flex flex-col items-center justify-center min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto`}
    >
      <div className="flex flex-row items-center leading-none text-white py-2 m-2">
        <LanguageIcon className="h-12 w-12 rotate-[15deg]" />
        <p className="text-[44px]">Infobyte Auth</p>
      </div>

      {!isPasswordChanged && (
        <div>
          <div className="flex flex-col items-center justify-center py-2 m-2">
            <h1 className="text-xl">Can't remember your password?</h1>
            <p className="text-center">
              That's very silly of you, but luckily I can help you if you can
              atleast provide your email.
            </p>
          </div>

          <div className="w-4/5 mx-auto">
            <div className="flex flex-col items-left justify-left">
              <label htmlFor="email">Email</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(email + e.target.value);
                }}
                placeholder="example@email.com"
              />
            </div>

            <button
              onClick={onSubmitEmail}
              className="flex p-2 bg-slate-700 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:bg-slate-500/25 "
              disabled={buttonDisabled}
            >
              {loading}
            </button>
          </div>
        </div>
      )}

      {isPasswordChanged && (
        <div>
          <div className="flex flex-col items-center justify-center py-2 m-2">
            <h1 className="text-xl">A Clean Slate</h1>
            <p className="text-center">
              You've been offered a new opportunity to set your password,
              please remember to use a simple password you can remember.
            </p>
          </div>

          <div className="w-4/5 mx-auto">
            <div className="flex flex-col items-left justify-left">
              <label htmlFor="email">New Password</label>
              <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(email + e.target.value);
                }}
                placeholder="New Password"
              />
            </div>

            <button
              onClick={onChangePassword}
              className="flex p-2 bg-slate-700 border rounded-lg mb-4 focus:outline-none focus:border-gray-600 disabled:bg-slate-500/25 "
              disabled={buttonDisabled}
            >
              {loading}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          className={`${lusitana.className} min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto`}
        >
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}

      <Toaster />
    </div>
  );
}