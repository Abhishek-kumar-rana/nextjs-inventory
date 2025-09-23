import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  Sprout,
  Menu,
} from "lucide-react";
import ModeToggle from "./ModeToggle";
import { stackServerApp } from "@/stack/server";
import { getUserDetails } from "@/actions/user.action";
import { UserButton } from "@stackframe/stack";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

async function Navbar() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl stalinist-one-regular tracking-wider"
            >
              PlantVentry
            </Link>
          </div>

          {/* Greeting */}
          {userProfile?.name && (
            <span className="hidden sm:inline text-[14px] text-gray-600 dark:text-gray-300 mr-4">
              {`Hello, ${userProfile?.name.split(" ")[0]}`}
            </span>
          )}

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/plants">
                <Sprout className="h-4 w-4" />
                <span className="hidden lg:inline">Plants</span>
              </Link>
            </Button>

            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <HomeIcon className="h-4 w-4" />
                <span className="hidden lg:inline">Home</span>
              </Link>
            </Button>

            <ModeToggle />

            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOutIcon className="h-4 w-4" />
                    <span className="hidden lg:inline">Sign Out</span>
                  </Link>
                </Button>
                <UserButton />
              </>
            ) : (
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                asChild
              >
                <Link href={app.signIn}>
                  <LogInIcon className="h-4 w-4" />
                  <span className="hidden lg:inline">Sign In</span>
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile nav */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-4 space-y-4">
                <div>
                    {userProfile?.name && (
                        <span className=" sm:inline text-[14px] text-gray-600 dark:text-gray-300 mr-4">
                        {`Hello, ${userProfile?.name.split(" ")[0]}`}
                        </span>
                    )}
                    {userProfile?.name && (
                       <div className=" h-[1px] bg-black/40 dark:bg-white/40 w-full "></div>
                    )}
                    
                </div>
                {user ? (
                    <>
                      <UserButton />
                      <Link
                        href={app.signOut}
                        className="flex items-center gap-2"
                      >
                        <LogOutIcon className="h-4 w-4" />
                        <span>Sign Out</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href={app.signIn}
                      className="flex items-center gap-2"
                    >
                      <LogInIcon className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                  )}
                
                <div className="flex flex-col space-y-3">
                  <Link href="/plants" className="flex items-center gap-2">
                    <Sprout className="h-4 w-4" />
                    <span>Plants</span>
                  </Link>

                  <Link href="/" className="flex items-center gap-2">
                    <HomeIcon className="h-4 w-4" />
                    <span>Home</span>
                  </Link>

                  <ModeToggle />

                  
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
