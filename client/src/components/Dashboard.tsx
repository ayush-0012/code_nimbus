import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  console.log(user.primaryEmailAddress?.emailAddress);
  return (
    <>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <div className="text-white">dashboard</div>
    </>
  );
};

export default Dashboard;
