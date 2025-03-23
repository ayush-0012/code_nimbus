import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./ui/app-sidebar";

interface userObj {
  userId: string;
  userName: string | null;
  email: string | undefined;
  profilePic: string;
}

function Dashboard() {
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
      <div className="flex justify-between  h-10 border-2">
        <div className="">
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="p-2rounded-lg transition" />
          </SidebarProvider>
        </div>

        <div className="">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <div className="flex-grow flex justify-center items-center">
        <h1 className="text-2xl font-semibold">Welcome to Your Dashboard</h1>
      </div>
    </>
  );
}

export default Dashboard;
