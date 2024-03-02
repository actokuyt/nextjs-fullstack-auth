"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function WelcomePage() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get("/api/users/user");
        setUserId(response.data.data._id);
      } catch (error) {
        console.error(error);
      }
    };
    fetchId();
  }, []);

  return (
    <div className=" min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto">
      <h1 className="text-2xl text-center ">Welcome!</h1>
      <p className="p-2">
        If you're seeing this screen you're among the choosen ones
      </p>
      <Link
        className="text-center block w-2/5 mx-auto bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href={`/profile/${userId}`}
      >
        Profile
      </Link>
      <button
        onClick={logout}
        className="block w-2/5 mx-auto bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <Toaster />
    </div>
  );
}
