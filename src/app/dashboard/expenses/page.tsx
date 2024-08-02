"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { CalendarIcon, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "name must be at least 2 characters.",
    })
    .max(25, {
      message: "please a shorter name.",
    }),

  amount: z.coerce.number().min(2, {
    message: "Amount cannot be this less.",
  }),
  type: z.enum(["one_time", "recurring", ""]),
  dateReceived: z
    .date({
      required_error: "Please enter the date, you received the amount.",
    })
    .nullable(),
});

export default function Expenses() {
  const [dialogTrigger, setDialogTrigger] = useState(false);
  const [arr, setArr] = useState<z.infer<typeof formSchema>[]>([
    {
      name: "Rent",
      amount: 50,
      type: "recurring",
      dateReceived: new Date(Date.now()),
    },
  ]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [itemId, setItemId] = useState<number>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  const optionArr = [
    { label: "One time", value: "one_time" },
    { label: "Recurring", value: "recurring" },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    setDialogTrigger(false);

    // @ts-ignore
    setArr(() => {
      // setTotal(arr.reduce((acc, item) => acc + item.amount, 0));
      return [...arr, values];
    });

    setTimeout(() => {
      form.setValue("amount", 0);
      form.setValue("dateReceived", null);
      form.setValue("name", "");
      form.setValue("type", "");
    }, 1000);

    // Do some function, then setValue for all to "" or undefined
  }

  function onUpdate(values: z.infer<typeof formSchema>) {
    setIsUpdate(false);
    if (itemId !== undefined) {
      let updatedArr = [...arr];
      updatedArr[itemId] = { ...updatedArr[itemId], ...values };

      setArr(() => {
        // setTotal(arr.reduce((acc, item) => acc + item.amount, 0));
        return updatedArr;
      });
    }
    setDialogTrigger(false);
  }

  return (
    <>
      <Dialog open={dialogTrigger} onOpenChange={setDialogTrigger}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your expense details.</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(!isUpdate ? onSubmit : onUpdate)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense</FormLabel>
                    <FormControl>
                      <Input placeholder="monthly rent..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display expense.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the type of your expense" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {optionArr.map((data, i) => {
                          return (
                            <SelectItem value={data.value} key={i}>
                              {data.label}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is your public display amount type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateReceived"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date received</FormLabel>
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
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{!isUpdate ? "Submit" : "Update"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <div className="flex justify-between items-center gap-4 w-full">
            <h1 className="text-lg font-semibold md:text-2xl">Expenses</h1>
            {arr.length !== 0 ? (
              <Button onClick={() => setDialogTrigger(true)}>
                Add an expense
              </Button>
            ) : null}
          </div>
        </div>
        {arr.length === 0 ? (
          <div
            className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no expenses added yet.
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start managing your finance as soon as you add your
                expenses.
              </p>
              <Button className="mt-4" onClick={() => setDialogTrigger(true)}>
                Add an Expense
              </Button>
            </div>
          </div>
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[5%]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {arr.map((data, i) => {
                  const date = new Date(
                    data.dateReceived !== null ? data.dateReceived : Date.now()
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
                      <TableCell>
                        {data.type === "recurring" ? "Recurring" : "One Time"}
                      </TableCell>
                      <TableCell>{data.name}</TableCell>
                      <TableCell className="text-right">
                        {data.amount}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Ellipsis size={20} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="mr-14">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Income</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setDialogTrigger(true);
                                setIsUpdate(true);
                                form.setValue("name", data.name);
                                form.setValue("amount", data.amount);
                                form.setValue("type", data.type);
                                form.setValue(
                                  "dateReceived",
                                  data.dateReceived
                                );
                                setItemId(i);
                              }}
                            >
                              Update Income
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setArr(
                                  arr.filter((val) => val.name !== data.name)
                                );
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
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">
                    ${arr.reduce((acc, item) => acc + item.amount, 0)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Card>
        )}
      </main>
    </>
  );
}
