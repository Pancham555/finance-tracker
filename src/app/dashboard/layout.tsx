"use client";
import Link from "next/link";
import { Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/theme-button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const dashboardRoutes = [
    {
      link: "/dashboard",
      name: "Dashboard",
    },
    {
      link: "/dashboard/income",
      name: "Income",
    },
    {
      link: "/dashboard/expenses",
      name: "Expenses",
    },
    {
      link: "/dashboard/analytics",
      name: "Analytics",
    },
    {
      link: "/dashboard/settings",
      name: "Settings",
    },
  ];
  const { isLoaded } = useUser();
  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <header className="z-50 sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {dashboardRoutes.map((data, i) => {
              return (
                <Link
                  href={data.link}
                  key={i}
                  className={`${
                    pathname === data.link
                      ? "text-foreground"
                      : "text-muted-foreground"
                  } transition-colors hover:text-foreground`}
                >
                  {data.name}
                </Link>
              );
            })}
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                {dashboardRoutes.map((data, i) => {
                  return (
                    <Link
                      key={i}
                      href={data.link}
                      className={`hover:text-foreground ${
                        data.link === pathname
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {data.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <ModeToggle />
            {!isLoaded ? (
              <Skeleton className="w-10 h-10 rounded-full" />
            ) : (
              <UserButton
                appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }}
              />
            )}
          </div>
        </header>
        {children}
      </div>
    </>
  );
}
