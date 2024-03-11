"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { lusitana } from "@/app/fonts";

export default function VerifyEmailPage() {
  const router = useRouter()
  const [text, setText] = useState(
    "Please click the link in the email we sent to you to verify your email. "
  );
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setText(response.data.email);
      setVerified(true);
      router.push("/login")
    } catch (error: any) {
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail()]);

  return (
    <div>
      {!verified && (
        <div
          className={`${lusitana.className} min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto`}
        >
          <h1 className="text-2xl text-center ">Email Verification</h1>
          <p className="p-2">{text}</p>
        </div>
      )}
      {verified && (
        <div
          className={`${lusitana.className} min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto`}
        >
          <h1 className="text-2xl text-center ">Email Verification</h1>
          <p className="p-2">{text} verified.</p>
          <Link href="/login" className="block w-1/5 mx-auto">
            Login?
          </Link>
        </div>
      )}
      {error && (
        <div
          className={`${lusitana.className} min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto`}
        >
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </div>
  );
}
