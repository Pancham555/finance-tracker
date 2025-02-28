import Image from "next/image";

import { Command } from "lucide-react";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex items-center  justify-center">
      <div className="lg:hidden h-full min-h-screen block absolute inset-0 bottom-0">
        <Image
          src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden w-full h-full"
        />
        <Image
          src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block w-full h-full"
        />
      </div>
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col  bg-transparent p-10 text-white dark:border-r lg:flex">
          <div
            className="absolute inset-0 top-0 bottom-0 left-0 right-0 bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1590069261209-f8e9b8642343?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1376&q=80)",
            }}
          />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Command className="mr-2 h-6 w-6" /> Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before. Highly recommended!&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="w-full">
          <div className="flex justify-end  mt-4 mb-4 md:mt-8">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "mr-0 md:mr-8 hidden md:block"
              )}
            >
              Sign up
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mr-0 md:mr-8 md:hidden block"
              )}
            >
              Sign up
            </Link>
          </div>
          <div className="lg:p-8 w-full h-full flex items-center">
            <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6">
              <SignIn />
              {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
