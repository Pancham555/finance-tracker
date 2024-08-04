"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface UserDataProps {
  name: string;
  email: string;
}

export default function Settings() {
  const { user } = useUser();
  const [userData, setUserData] = useState<UserDataProps>({
    name: "",
    email: "",
  });
  const getInitialData = async () => {
    try {
      const data = await axios.get(`/api/settings?id=${user?.id}`);
      setUserData(data.data.data);
    } catch (error) {
      toast(`${error}`);
    }
  };

  const SaveData = async () => {
    try {
      await axios.post(`/api/settings`, {
        id: user?.id,
        name: userData.name,
        email: userData.email,
      });
      toast("Data has been updated 🎉");
      getInitialData();
    } catch (error) {
      toast(`${error}`);
    }
  };

  const DeleteUser = async () => {
    toast("Sorry to see you go 😢");
    try {
      await axios.delete(`/api/settings?id=${user?.id}`);
    } catch (error) {
      toast(`${error}`);
    }
  };
  useEffect(() => {
    if (user) {
      getInitialData();
    }
  }, [user]);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Your Name</CardTitle>
              <CardDescription>Update your name here.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input
                  placeholder="Your Name"
                  value={userData.name ?? ""}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={() => SaveData()}>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Your Email</CardTitle>
              <CardDescription>Update your email here</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <Input
                  placeholder="Your Email"
                  type="email"
                  value={userData.email ?? ""}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button onClick={() => SaveData()}>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
              <CardDescription>
                Permanently remove your Account and all of its contents from
                this platform. This action is not reversible, so please continue
                with caution..
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="font-semibold text-red-400">
                Delete Your Account Permanently!
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Continue</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 hover:bg-red-400"
                      onClick={() => DeleteUser()}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              {/* <Button variant="destructive">Continue</Button> */}
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
