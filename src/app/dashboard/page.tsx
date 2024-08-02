import { BarChartComponent } from "@/components/charts/bar-chart";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
} from "lucide-react";
import { DatePickerWithRange } from "./components/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  return (
    <>
      <div className="flex-1 space-y-4 px-4 md:px-8 pt-6">
        <div className="flex flex-wrap items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2 justify-between w-full md:w-auto">
            <DatePickerWithRange />
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
      <Tabs
        defaultValue="overview"
        className="space-y-4 px-4 md:px-8 py-4 md:py-8"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <main className="flex flex-1 flex-col gap-4 md:gap-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
              <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Subscriptions
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12,234</div>
                  <p className="text-xs text-muted-foreground">
                    +19% from last month
                  </p>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Now
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-muted-foreground">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <BarChartComponent />
              </div>
              <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Olivia Martin
                      </p>
                      <p className="text-sm text-muted-foreground">
                        olivia.martin@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      {/* <AvatarImage src="/avatars/02.png" alt="Avatar" /> */}
                      <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Jackson Lee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        jackson.lee@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      {/* <AvatarImage src="/avatars/03.png" alt="Avatar" /> */}
                      <AvatarFallback>IN</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Isabella Nguyen
                      </p>
                      <p className="text-sm text-muted-foreground">
                        isabella.nguyen@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$299.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      {/* <AvatarImage src="/avatars/04.png" alt="Avatar" /> */}
                      <AvatarFallback>WK</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        William Kim
                      </p>
                      <p className="text-sm text-muted-foreground">
                        will@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$99.00</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      {/* <AvatarImage src="/avatars/05.png" alt="Avatar" /> */}
                      <AvatarFallback>SD</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        Sofia Davis
                      </p>
                      <p className="text-sm text-muted-foreground">
                        sofia.davis@email.com
                      </p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </TabsContent>
      </Tabs>
    </>
  );
}
