import data from "@/app/dashboard/data.json"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { DataTable } from "@/components/data-table"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />

        <div className="flex flex-1 flex-col">
          <SiteHeader />

          <main className="flex-1 space-y-6 p-6">
            <SectionCards />
            <ChartAreaInteractive />
            <DataTable data={data} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default Dashboard
