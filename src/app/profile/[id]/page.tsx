"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

type UserData = {
  username?: string;
  email?: string;
  isAdmin?: boolean;
  isVerified?: boolean;
  _id?: string;
};

export default function UserProfile({ params }: any) {
  const [userData, setUserData] = useState<UserData>({});
  const { username, email, isAdmin, isVerified, _id } = userData ?? {};

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await axios.get("/api/users/user");
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchId();
  }, []);

  console.log(userData);
  console.log(isVerified);

  return (
    <div className="min-h-screen py-2  md:w-2/3 mx-auto lg:w-2/5 mx-auto">
      <h1 className="text-2xl text-center ">Profile</h1>
      {userData && (
        <div className="p-2">
          <ul>
            <li>
              <span>User Name:</span>
              <span>{username}</span>
            </li>
            <li>
              <span>Email:</span>
              <span>{email}</span>
            </li>
            <li>
              <span>Admin Status:</span>
              {!isAdmin && <span>Not an Admin.</span>}
              {isAdmin && <span>Admin.</span>}
            </li>
            <li>
              <span>Verification Status:</span>
              {!isVerified && <span>Not Yet Verified.</span>}
              {isVerified && <span>Verified.</span>}
            </li>
            <li>
              <span>User Id:</span>
              <span>{_id}</span>
            </li>
          </ul>
        </div>
      )}
      <Link
        className="text-center block w-2/5 mx-auto bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/welcome"
      >
        Dashboard
      </Link>
    </div>
  );
}
