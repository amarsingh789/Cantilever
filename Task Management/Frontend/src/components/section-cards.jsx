import { TrendingDownIcon, TrendingUpIcon, ListTodoIcon, CheckCircleIcon, ClockIcon, CalendarIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4 lg:px-6">
      
      {/* Total Tasks */}
      <Card>
        <CardHeader className="relative">
          <CardDescription>Total Tasks</CardDescription>
          <CardTitle className="text-2xl font-semibold">120</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 text-xs">
              <ListTodoIcon className="size-3" />
              All
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          All tasks created in system
        </CardFooter>
      </Card>

      {/* Pending Tasks */}
      <Card>
        <CardHeader className="relative">
          <CardDescription>Pending Tasks</CardDescription>
          <CardTitle className="text-2xl font-semibold">34</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 text-xs">
              <ClockIcon className="size-3" />
              Pending
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex gap-1 text-sm text-muted-foreground">
          Needs attention
          <TrendingDownIcon className="size-4" />
        </CardFooter>
      </Card>

      {/* Completed Tasks */}
      <Card>
        <CardHeader className="relative">
          <CardDescription>Completed Tasks</CardDescription>
          <CardTitle className="text-2xl font-semibold">86</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 text-xs">
              <CheckCircleIcon className="size-3" />
              Done
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex gap-1 text-sm text-muted-foreground">
          Good progress
          <TrendingUpIcon className="size-4" />
        </CardFooter>
      </Card>

      {/* Today Tasks */}
      <Card>
        <CardHeader className="relative">
          <CardDescription>Today’s Tasks</CardDescription>
          <CardTitle className="text-2xl font-semibold">8</CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 text-xs">
              <CalendarIcon className="size-3" />
              Today
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Tasks scheduled for today
        </CardFooter>
      </Card>

    </div>
  )
}
