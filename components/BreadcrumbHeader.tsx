'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

function BreadcrumbHeader() {
  const pathname = usePathname()
  const paths = pathname === '/' ? [''] : pathname.split('/')

  const showedPaths = paths.length > 2 ? paths.slice(0, 2) : paths

  return (
    <div className="flex items-center flex-start">
      <Breadcrumb>
        <BreadcrumbList>
          {showedPaths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path === '' ? 'home' : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== showedPaths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default BreadcrumbHeader
