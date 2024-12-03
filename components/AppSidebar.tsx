'use client'

import { ConciergeBellIcon, Globe2Icon, HeartIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

// Menu items.
const routes = [
  {
    title: 'Discover',
    url: '',
    icon: Globe2Icon,
  },
  {
    title: 'Recipes',
    url: 'recipes',
    icon: ConciergeBellIcon,
  },
  {
    title: 'Favorites',
    url: 'favorites',
    icon: HeartIcon,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const activeRoute =
    routes.find(
      (route) => route.url.length > 0 && pathname.includes(route.url)
    ) || routes[0]

  const { open } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <Logo fontSize="text-xl" iconSize={16} iconOnly={!open} />
      </SidebarHeader>
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {routes.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === activeRoute.url}
                    className="hover:bg-secondary hover:text-secondary-foreground"
                  >
                    <Link href={`/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
