import Link from "next/link";
// import {
//   NavigationMenuItem,
//   NavigationMenuTrigger,
//   NavigationMenuContent,
//   NavigationMenuLink,
//   NavigationMenu,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import React from "react";
import { ModeToggle } from "./theme-button";
import { BotMessageSquare } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="container h-16 items-center flex justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">Acme Inc</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex justify-center">
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
              prefetch={false}
            >
              About
            </Link>
            {/* <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Documentation
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] p-2">
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Getting Started
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn how to set up and use our product.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          API Reference
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Explore our API documentation.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link
                        href="#"
                        className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        prefetch={false}
                      >
                        <div className="text-sm font-medium leading-none group-hover:underline">
                          Guides
                        </div>
                        <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn best practices and how-to guides.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
            <Link
              href={`mailto:${process.env.MAIL}`}
              className="text-sm font-medium hover:text-primary transition-colors"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="hidden lg:inline-flex gap-5 justify-end">
          <ModeToggle />
          <Button>Get Started</Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex h-16 items-center justify-between px-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <MountainIcon className="h-6 w-6" />
                <span className="text-lg font-semibold">Acme Inc</span>
              </Link>
              <ModeToggle />
            </div>
            <nav className="grid gap-4 px-4 py-6">
              {/* <Link
                href="#"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/playground"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                prefetch={false}
              >
                <BotMessageSquare className="h-5 w-5" />
                Playground
              </Link>
              <div className="grid gap-4">
                <div className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                  <InfoIcon className="h-5 w-5" />
                  Documentation
                </div>
                <div className="grid gap-2 pl-6">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Getting Started
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    API Reference
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    prefetch={false}
                  >
                    Guides
                  </Link>
                </div>
              </div> */}
              <Link
                href="/about"
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                prefetch={false}
              >
                <InfoIcon className="h-5 w-5" />
                About
              </Link>
              <Link
                href={`mailto:${process.env.MAIL}`}
                className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                prefetch={false}
              >
                <ContactIcon className="h-5 w-5" />
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function ContactIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  );
}

function HomeIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InfoIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function MenuIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ServerIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

function XIcon(props: React.SVGAttributes<SVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
