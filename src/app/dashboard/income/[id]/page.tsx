"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon, Ellipsis } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface detailProps {
  id: string;
  name: string;
  amount: number;
  type: "one_time" | "recurring";
  createdAt: Date;
  new_income: {
    id: string;
    amount: number;
    createdAt: Date;
  }[];
}

const formSchema = z.object({
  amount: z.coerce.number().min(2, {
    message: "Amount cannot be this less.",
  }),
  createdAt: z
    .date({
      required_error: "Please enter the date, you received the amount.",
    })
    .nullable(),
});

export default function Details() {
  const params = useParams<{ id: string }>();
  const [arr, setArr] = useState<detailProps>();

  const [dialogTrigger, setDialogTrigger] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const getInitialData = async () => {
    try {
      const data = await axios.get(`/api/income/details?id=${params.id}`);

      setArr(data.data.data);
    } catch (error) {
      toast(`${error}`);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDialogTrigger(false);
    try {
      await axios.post("/api/income/details", {
        id: arr?.id,
        ...values,
      });
      toast("New Income added successfully 🎉");
      getInitialData();
    } catch (error) {
      toast(`${error}`);
    }
    form.setValue("amount", 0);
    form.setValue("createdAt", null);
  }

  async function onUpdate(values: z.infer<typeof formSchema>) {
    setIsUpdate(false);
    setDialogTrigger(false);
    try {
      await axios.put("/api/income/details", {
        id: arr?.id,
        new_income_id: updateId,
        ...values,
      });
      toast("New Income has been updated successfully 🎉");
      getInitialData();
    } catch (error) {
      toast(`${error}`);
    }
    form.setValue("amount", 0);
    form.setValue("createdAt", null);
    setUpdateId("");
  }

  async function onDelete(id: string, new_income_id: string) {
    try {
      await axios.delete(
        `/api/income/details?id=${id}&new_income_id=${new_income_id}`
      );
      toast("Income has been deleted sucessfully 🎉");
      getInitialData();
    } catch (error) {
      toast(`${error}`);
    }
  }

  useEffect(() => {
    getInitialData();
  }, [params]);

  if (arr === undefined) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-56 w-full rounded-lg" />
      </main>
    );
  }

  return (
    <>
      <Dialog open={dialogTrigger} onOpenChange={setDialogTrigger}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your income details.</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(isUpdate ? onUpdate : onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="mt-0">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="40000..." {...field} type="number" />
                    </FormControl>
                    <FormDescription>
                      This is your public display amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Created at</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(`${field.value}`, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value !== null
                              ? field.value
                              : new Date(Date.now())
                          }
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to keep an account of the
                      amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{isUpdate ? "Update" : "Submit"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex justify-between gap-4 items-start">
          <div className="grid grid-cols-1 gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">{arr.name}</h1>
            <div className="flex items-center gap-2">
              <span className="font-medium">Income Type:</span>
              <span>{arr.type === "recurring" ? "Recurring" : "One Time"}</span>
            </div>
          </div>
          <div className="">
            <Button onClick={() => setDialogTrigger(true)}>
              Add your recent income
            </Button>
          </div>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[5%]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {arr.new_income.map((data, i) => {
                const date = new Date(
                  data.createdAt !== null ? data.createdAt : Date.now()
                );
                return (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      {date.toLocaleDateString("default", {
                        weekday: "short",
                      })}{" "}
                      {date.toLocaleDateString("default", {
                        day: "2-digit",
                      })}{" "}
                      {date.toLocaleDateString("default", {
                        month: "short",
                      })}{" "}
                      {date.toLocaleDateString("default", {
                        year: "2-digit",
                      })}
                    </TableCell>
                    <TableCell className="text-right">{data.amount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Ellipsis size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-14">
                          <DropdownMenuItem
                            onClick={() => {
                              setDialogTrigger(true);
                              setIsUpdate(true);
                              setUpdateId(data.id);
                              form.setValue("amount", data.amount);
                              form.setValue(
                                "createdAt",
                                new Date(data.createdAt)
                              );
                            }}
                          >
                            Update Income
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              onDelete(arr.id, data.id);
                            }}
                          >
                            Delete Income
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-white hover:bg-white dark:bg-slate-950 dark:hover:bg-slate-950">
                <TableCell colSpan={1}>Total</TableCell>
                <TableCell className="text-right">
                  ₹{arr.new_income.reduce((acc, item) => acc + item.amount, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </main>
    </>
  );
}
