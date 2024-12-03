import { AppSidebar } from '@/components/AppSidebar'
import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex h-screen">
      <AppSidebar />
      <main className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center px-6 py-4 h-[50px] container justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator className="shrink-0 bg-border w-[1px] mr-2 h-4" />
            <BreadcrumbHeader />
          </div>
          <div className="flex gap-2">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <ScrollArea className="h-full">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </ScrollArea>
      </main>
    </SidebarProvider>
  )
}

export default layout
