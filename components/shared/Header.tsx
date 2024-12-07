import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ClerkLoaded, SignedIn, SignedOut } from "@clerk/nextjs";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold">
            Meetroomly
          </Link>
        </div>
        <div className="space-x-4">
          <ClerkLoaded>
            <SignedOut>
              <Link href="/sign-in" className="hover:underline">
                Sign In
              </Link>
              <Button asChild variant="secondary">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <UserMenu />
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
