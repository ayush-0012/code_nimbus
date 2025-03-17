import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";

interface userObj {
  userId: string;
  userName: string | null;
  email: string | undefined;
  profilePic: string;
}

const Dashboard = () => {
  const [CurrUser, setCurrUser] = useState<userObj>();

  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    console.log(user);

    if (isLoaded && isSignedIn && user) {
      setCurrUser({
        userId: user?.id,
        userName: user?.firstName,
        email: user?.primaryEmailAddress?.emailAddress,
        profilePic: user?.imageUrl,
      });
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    console.log(CurrUser);
    if (CurrUser) {
      storeUser();
    }
  }, [CurrUser]);

  async function storeUser() {
    const { userId, userName, email, profilePic } = CurrUser || {};

    try {
      const response = await axios.post(
        "http://localhost:7000/api/user/signIn",
        {
          userId,
          userName,
          email,
          profilePic,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error, "error signing in");
    }
  }

  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div className="">dashboard</div>
    </>
  );
};

export default Dashboard;
